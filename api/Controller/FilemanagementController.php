<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class FilemanagementController extends AppController {
    public $uses = array(
        'FilemanagementFolder',
        'FilemanagementFile',
        'FilemanagementWorklistitem'
    );

    private function __getFileRoot () {
        return Configure::read('system.filemanagement.root');
    }

    private function __getFilePhysicRoot () {
        return realpath($_SERVER['DOCUMENT_ROOT'] . Configure::read('system.filemanagement.root'));
    }

    public function getFilesTree () {
        $this->checkLogin();

        $nodeId = str_replace(Configure::read('system.prefix'), '', $this->request->data['node']);
        if ($nodeId === '') {
            $nodeId = 0;
        }
        $res = $this->_getNodes($nodeId);

        return $res;

    }

    /**
     * get Subfolders und Files of a Folder
     * @param int $folderId
     * @return Json
     */
    function getFolder () {
        $this->checkLogin();
        $params = $this->request->data;
        $folderId = $params['folderId'];

        $data = $this->_getNodes($folderId);
        return $data;
    }

    protected function _getNodes ($nodeId) {
        if ($nodeId > 0) {
            $this->getFolderData($nodeId);
        }
        $res = [];
        $groups = $this->FilemanagementFolder->find('all', array(
            'conditions' => array(
                'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                'FilemanagementFolder.parent_id' => $nodeId,
                'FilemanagementFolder.deleted' => 0
            ),
            'order' => array('FilemanagementFolder.customer_id', 'LOWER(FilemanagementFolder.name)')
        ));
        if ($groups) {
            usort($groups, function ($a, $b) {
                if ($a['FilemanagementFolder']['customer_id'] !== $b['FilemanagementFolder']['customer_id']) {
                    return $a['FilemanagementFolder']['customer_id'] > $b['FilemanagementFolder']['customer_id'];
                }
                return $a['FilemanagementFolder']['name'] > $b['FilemanagementFolder']['name'];
            });
            $res = array_merge($res, $groups);
        }
        if ($nodeId > 0) {
            $files = $this->FilemanagementFile->find('all', array(
                'conditions' => array(
                    'FilemanagementFile.folder_id' => $nodeId,
                    'FilemanagementFile.deleted' => 0
                ),
                'order' => array('LOWER(FilemanagementFile.name)')
            ));

            if ($files) {
                $temp = [];
                foreach ($files as $file) {
                    $filename = $this->__getFilePhysicRoot().'/'.$file['FilemanagementFolder']['path'].'/'.$file['FilemanagementFile']['name'];
                    $file['FilemanagementFile']['size'] = (is_file($filename)) ? filesize($filename) : 0;
                    $temp[] = $file;
                }
                usort($temp, function ($a, $b) {
                    return $a['FilemanagementFile']['name'] > $b['FilemanagementFile']['name'];
                });
                $res = array_merge($res, $temp);
            }

        }
        return $res;
    }

    /**
     * get Subfolders und Files of a Folder
     * @param int $folderId
     */
    function getFolderData ($folderId = -1) {
        $this->checkLogin();
        $data = [];
        if ($folderId < 0) {
            $folderId = $this->request->data['folderId'];
        }
        if ($folderId > 0) {
            $data = $this->FilemanagementFolder->find('first', [
                'conditions' => [
                    'FilemanagementFolder.id' => $folderId,
                    'FilemanagementFolder.deleted' => 0,
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                ]
            ]);
            if ($data) {
                $data = $data['FilemanagementFolder'];
            }
        }
        return $data;
    }

    /**
     * File Upload
     * params from request:
     *     folderId, path, documents
     * @throws Exception
     * @return json
     */
    public function filesUpload() {
        $this->checkLogin();
        try {
            $folderId = $this->request->data['folderId'];
            $folder = $this->FilemanagementFolder->find('first', array(
                'conditions' => array(
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                    'FilemanagementFolder.id' => $folderId,
                    'FilemanagementFolder.deleted' => 0
                )
            ));
            if (!$folder) {
                throw new Exception(__('Upload failed!'));
            }
            $path = $folder['FilemanagementFolder']['path'];
            $files = $this->request->params['form']['documents'];
            $dir = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$path;
            $dir = realpath($dir);
            GlbF::mkDir($dir);
            if ($files) {
                for ($i=0; $i<count($files['name']); $i++) {
                    $filename = $files['name'][$i];
                    $tempname = $files['tmp_name'][$i];


                    $result['temp'] = array(
                        'tempname' => $tempname,
                        'filename' => $dir.'/'.$filename
                    );

                    // check duplicate
                    $d = dir($dir);
                    while (false !== ($entry = $d->read())) {
                        if (!is_dir($dir.'/'.$entry) && $entry == $filename) {
                            $d->close();
                            ErrorCode::throwExceptionCode(ErrorCode::ErrorCodeFileDuplicate);
                        }
                    }
                    $d->close();
                    //file upload
                    if (!move_uploaded_file($tempname, $dir.'/'.$filename)) {
                        ErrorCode::throwException(sprintf(__('Error by upload [%s].'), $filename), ErrorCode::ErrorCodeServerInternal);
                    }

                    //save in DB
                    $pathArr = explode($path, '/');
                    $customer_id = ($pathArr[0] == '0') ? 0 : $this->customer_id;
                    $data = array(
                        'name' => $filename,
                        'folder_id' => $folderId,
                        'path' => $path,
                        'created_by' => $this->user_id,
                        'modified_by' => $this->user_id,
                        'customer_id' => $customer_id
                    );
                    $this->FilemanagementFile->create();
                    $this->FilemanagementFile->save($data);
                }
            }
        } catch (Exception $e) {
            // when not dulicate error, delete the files
            if ($e->getCode() != ErrorCode::ErrorCodeFileDuplicate) {
                if ($files) {
                    for ($i=0; $i<count($files['name']); $i++) {
                        $file = $dir.'/'.$files['name'][$i];
                        if (is_file($file)) {
                            @ unlink($file);
                        }
                    }
                }
            }
            throw $e;
        }
    }

    /**
     * Folder Input
     * params from request:
     *     isPublic, parent_id, parentPath, name(Foldername)
     * @throws Exception
     * @return json
     */
    public function folderCreate () {
        $this->checkLogin();
        try {
            $dir_parent = '';
            $name = $this->request->data['name'];
            if (!isset($this->request->data['parentId'])) {
                throw new Exception(__('Missing parent node'));
            }


            $parentId = $this->request->data['parentId'];
            if ($parentId > 0) {
                $parentFolder = $this->FilemanagementFolder->find('first', [
                    'conditions' => [
                        'FilemanagementFolder.id' => $parentId,
                        'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                        'FilemanagementFolder.deleted' => 0
                    ]
                ]);
                if (!$parentFolder) {
                    throw new Exception(__('Folder creation failed!'));
                }
                $customer_id = $parentFolder['FilemanagementFolder']['customer_id'];
                $parentPath = $parentFolder['FilemanagementFolder']['path'];
            } else {
                // root
                $customer_id = (isset($this->request->data['isPublic']) && $this->request->data['isPublic'] == 1) ? 0 : $this->customer_id;
                $parentPath = ($customer_id > 0) ? $this->customer_id : '0';
            }

            $path = $parentPath.'/'.$name;
            $dir_parent = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$parentPath;

            if (!is_dir($dir_parent)) {
                ErrorCode::throwException(sprintf(__('The parent folder [%s] is not exist.'), $parentFolder['FilemanagementFolder']['name']));
            }

            // check duplicate
            if (is_dir($dir_parent . '/' . $name)) {
                ErrorCode::throwExceptionCode(ErrorCode::ErrorCodeFolderDuplicate);
            }

            GlbF::mkDir($dir_parent.'/'.$name);

            $data = [
                'customer_id' => $customer_id,
                'name' => $name,
                'path' => $path,
                'parent_id' => $parentId,
                'created_by' => $this->user_id,
                'modified_by' => $this->user_id
            ];
            $this->FilemanagementFolder->create();
            $this->FilemanagementFolder->save($data);
            $data['id'] = $this->FilemanagementFolder->getLastInsertId();
            return $data;
        } catch (Exception $e) {
            // when not dulicate error, delete the folder
            if ($e->getCode() != ErrorCode::ErrorCodeFolderDuplicate && $dir_parent !== '' && is_dir($dir_parent.'/'.$name)) {
                try {
                    GlbF::moveDir($dir_parent.'/'.$name);
                } catch (Exception $ex) {}

            }
            throw $e;
        }
    }

    /**
     * File Delete
     * params from request:
     *     fileId
     * @throws Exception
     * @return json
     */
    function fileDelete () {
        $this->checkLogin();
        $fileId = $this->request->data['fileId'];
        $file = $this->FilemanagementFile->find('first', [
            'conditions' => [
                'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                'FilemanagementFile.id' => $fileId,
                'FilemanagementFile.deleted' => 0
            ]
        ]);
        if (!$file) {
            throw new Exception(__('Delete failed!'));
        }
        $path = $file['FilemanagementFolder']['path'];
        $filename = $file['FilemanagementFile']['name'];
        @ unlink($_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$path.'/'.$filename);
        $this->FilemanagementFile->delete($fileId);
    }

    /**
     * Folder Delete
     * params from request: folderId
     * @throws Exception
     * @return json
     */
    function folderDelete () {
        $this->checkLogin();
        $folderId = $this->request->data['folderId'];
        $folder = $this->FilemanagementFolder->find('first', [
            'conditions' => [
                'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                'FilemanagementFolder.id' => $folderId,
                'FilemanagementFolder.deleted' => 0
            ]
        ]);
        if (!$folder) {
            throw new Exception(__('Delete failed!'));
        }
        $path = $folder['FilemanagementFolder']['path'];

        $dir = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$path;

        GlbF::moveDir($dir);
        return $this->_clearForlderDB($folderId);
    }

    function mixDelete () {
        $this->checkLogin();
        $folderIds = [];
        $items = $this->request->data['items'];
        $items = json_decode($items);
        if ($items->folders) {
            $folders = $this->FilemanagementFolder->find('all', array(
                'conditions' => array(
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                    'FilemanagementFolder.id' => $items->folders,
                    'FilemanagementFolder.deleted' => 0
                )
            ));
            if ($folders) {
                foreach ($folders as $folder) {
                    $dir = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$folder['FilemanagementFolder']['path'];
                    GlbF::moveDir($dir);
                    $folderIds = array_merge($folderIds, $this->_clearForlderDB($folder['FilemanagementFolder']['id']));
                }
            }

        }
        if ($items->files) {
            $files = $this->FilemanagementFile->find('all', [
                'conditions' => [
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id),
                    'FilemanagementFile.id' => $items->files,
                    'FilemanagementFile.deleted' => 0
                ]
            ]);
            if ($files) {
                foreach ($files as $file) {
                    $fileId = $file['FilemanagementFile']['id'];
                    $filename = $file['FilemanagementFile']['name'];
                    $path = $file['FilemanagementFolder']['path'];
                    $file = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$path.'/'.$filename;
                    if (is_file($file)) {
                        @ unlink($file);
                    }
                    $this->FilemanagementFile->delete($fileId);
                }
            }
        }
        return $folderIds;
    }

    /**
     * delete Folder and its subfolders even their Files in DB
     * @param int $folderId
     * @return array the deleted FolderIds
     */
    private function _clearForlderDB ($folderId) {
        $ids = array();
        $folderDaten = $this->FilemanagementFolder->find('first', array(
            'conditions' => array(
                'FilemanagementFolder.id' => $folderId,
                'FilemanagementFolder.customer_id' => array(0, $this->customer_id)
            )
        ));
        if ($folderDaten) {
            $path = $folderDaten['FilemanagementFolder']['path'];
            $folders = $this->FilemanagementFolder->find('all', array(
                'conditions' => array(
                    'FilemanagementFolder.path like' => $path.'%',
                    'FilemanagementFolder.deleted' => 0,
                )
            ));
            $ids = Set::Extract('/FilemanagementFolder/id', $folders);

            $this->FilemanagementFile->deleteAll(array('FilemanagementFile.folder_id' => $ids));
            $this->FilemanagementFolder->deleteAll(array('FilemanagementFolder.id' => $ids));
        }
        return $ids;
    }

    function getFile ($fileId, $autodownload=0) {
        $this->autoRender = false;

        try {
            $extern = false;
            if (substr($fileId, 0, 2) === 'co') {
                $fileId = str_replace(base64_encode(Configure::read("system.filemanagement.chip")), '', base64_decode(substr($fileId, 2)));
                $extern = true;
                $fileId = explode(':', $fileId);
                if (count($fileId) < 2 || $fileId[1] < date('YmdHis')) {
                    throw new Exception(__('The link has already expired.'));
                }
                $fileId = $fileId[0];
            }

            $conditions = [
                'FilemanagementFile.id' => $fileId,
                'FilemanagementFile.deleted' => 0
            ];
            if (!$extern) {
                $conditions['FilemanagementFolder.customer_id'] = array($this->customer_id, 0);
            }
            $file = $this->FilemanagementFile->find('first', array(
                'conditions' => $conditions
            ));

            if ($file) {
                $savefile = $this->__getFileRoot().'/'.$file['FilemanagementFolder']['path'].'/'.$file['FilemanagementFile']['name'];
                $file_path = $_SERVER['DOCUMENT_ROOT'] . $savefile;
                if (!file_exists($file_path)) {
                    throw new Exception(__('This file does not exist.'));
                } else {
                    if ($autodownload) {
                        $this->__getFile($file);
                    } else {
                        $suffix = GlbF::getFileSuffix($file['FilemanagementFile']['name']);
                        $savefile = Configure::read('system.url') . $savefile;

                        $this->set('suffix', $suffix);
                        $this->set('filename', $file['FilemanagementFile']['name']);
                        $this->set('frameurl', $savefile);
                        $this->layout = 'viewer';
                        switch ($suffix) {
                            case 'pdf':
//                                $this->set('frameurl', $file_path);
                                $this->render('pdfshow');
                                break;
                            case 'bmp':
                            case 'jpg':
                            case 'jpeg':
                            case 'gif':
                            case 'png':
                                $this->render('picshow');
                                break;
                            case 'xls':
                            case 'doc':
                            case 'xlsx':
                            case 'docx':
                            case 'ppt':
                            case 'pptx':
                                $this->render('msoshow');
                                break;
                            case 'txt':
                            case 'js':
                            case 'php':
                            case 'html':
                            case 'htm':
                            case 'asp':
                            case 'html':
                                $this->set('frameurl', $file_path);
                                $this->render('txtshow');
                                break;
                            default:
                                $this->render('noshow');
                                break;
                        }
                    }
                }
            } else {
                throw new Exception(__('This file does not exist.'));
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            echo $message;
        }
    }

    private function __getFile ($fileData) {
        $file_path=$_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$fileData['FilemanagementFolder']['path'].'/'.$fileData['FilemanagementFile']['name'];
        list($name, $suffix) = GlbF::getFileNameAndSuffix($fileData['FilemanagementFile']['name']);
        $outName = '[WSFM]_'.str_replace(' ', '_', $name).'.'.$suffix;

        $file_size=filesize($file_path);
        header('Content-Description: File Transfer'); //描述页面返回的结果
        header('Cache-Control: private, must-revalidate,post-check=0, pre-check=0, max-age=1');
        //header("Content-type: application/octet-stream");
        header("Accept-Length:".$file_size);
        header("Content-Disposition: attachment; filename=".$outName);
        header('Content-Transfer-Encoding: binary');//内容编码方式，直接二进制，不要gzip压缩
        header('Expires: 0');//过期时间
        header('Cache-Control: must-revalidate');//缓存策略，强制页面不缓存，作用与no-cache相同，但更严格，强制意味更明显
        header('Pragma: public');
        readfile($file_path);
    }

    function search() {
        $this->checkLogin();
        $res_data = array();
        $text = strtolower(trim($this->request->data['text']));
        $folderId = $this->request->data['folderId'];
        $allFolderIds = [];
        $data = [];
        $page = $this->request->data['page'];
        $limit = $this->request->data['limit'];

        if ($folderId > 0) {
            $folderDaten = $this->FilemanagementFolder->find('first', array(
                'fields' => array('FilemanagementFolder.path'),
                'conditions' => array(
                    'FilemanagementFolder.id' => $folderId,
                    'FilemanagementFolder.customer_id' => array($this->customer_id, 0)
                )
            ));
            if ($folderDaten) {
                $folderPath = $folderDaten['FilemanagementFolder']['path'];
                $allFolderIds1 = $this->FilemanagementFolder->find('all', array(
                    'fields' => array('FilemanagementFolder.id'),
                    'conditions' => array('FilemanagementFolder.path like ' => $folderPath.'%')
                ));
                $allFolderIds = Set::Extract('/FilemanagementFolder/id', $allFolderIds1);
            }
        } else {
            $allFolderIds1 = $this->FilemanagementFolder->find('all', array(
                'fields' => array('FilemanagementFolder.id'),
                'conditions' => array('FilemanagementFolder.customer_id' => array(0, $this->customer_id))
            ));
            $allFolderIds = Set::Extract('/FilemanagementFolder/id', $allFolderIds1);
        }
        $folders = $this->FilemanagementFolder->find('all', array(
            'conditions' => array(
                'FilemanagementFolder.deleted' => 0,
                'FilemanagementFolder.name like ' => '%'.$text.'%',
                'FilemanagementFolder.id' => $allFolderIds
            ),
            'order' => array('FilemanagementFolder.name')
        ));
        if ($folders) {
            $data = array_merge($data, $folders);
        }

        $files = $this->FilemanagementFile->find('all', array(
            'conditions' => array(
                'FilemanagementFile.deleted' => 0,
                'FilemanagementFile.folder_id' => $allFolderIds,
                'or' => array(
                    'FilemanagementFile.name like ' => '%'.$text.'%',
                )
            ),
            'order' => array('FilemanagementFile.name')
        ));
        if ($files) {
            foreach ($files as $file) {
                $filename = $this->__getFilePhysicRoot().'/'.$file['FilemanagementFolder']['path'].'/'.$file['FilemanagementFile']['name'];
                $file['FilemanagementFile']['size'] = (is_file($filename)) ? filesize($filename) : 0;
                $data[] = $file;
            }
        }

        $total = count($data);
        $start_id = ($page-1) * $limit;
        $end_id = $limit * $page;
        if ($end_id >= $total) $end_id = $total;
        for ($i=$start_id; $i<$end_id; $i++) {
            $res_data[] = $data[$i];
        }

        return [
            'data' => $res_data,
            'total' => $total
        ];
    }

    function rename () {
        $this->checkLogin();
        if (intval($this->request->data['isFile']) === 1) {
            $fileId = $this->request->data['itemId'];
            $fileData = $this->FilemanagementFile->find('first', array(
                'conditions' => array(
                    'FilemanagementFile.id' => $fileId,
                    'FilemanagementFolder.customer_id' => array($this->customer_id, 0),
                    'FilemanagementFile.deleted' => 0
                )
            ));
            if (!$fileData) {
                throw new Exception(__('Rename failed!'));
            }
            $newname = $this->request->data['newname'];
            $oldname = $fileData['FilemanagementFile']['name'];
            $path = $fileData['FilemanagementFolder']['path'];


            $oldSuffix = GlbF::getFileSuffix($newname);
            $newSuffix = GlbF::getFileSuffix($oldname);
            if ($oldSuffix != $newSuffix) {
                $newname .= '.'.$oldSuffix;
            }
            $fileroot = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot();
            if (!@ rename($fileroot.'/'.$path.'/'.$oldname, $fileroot.'/'.$path.'/'.$newname)) {
                ErrorCode::throwException(__('The file can not be renamed!'), ErrorCode::ErrorCodeBadRequest);
            }
            $this->FilemanagementFile->save(array(
                'id' => $fileId,
                'name' => $newname,
                'modified_by' => $this->user_id
            ));

            $res = $this->FilemanagementFile->findById($fileId);
            return $res['FilemanagementFile'];
        } else {
            $folderId = $this->request->data['itemId'];
            $folderData = $this->FilemanagementFolder->find('first', array(
                'conditions' => array(
                    'FilemanagementFolder.id' => $folderId,
                    'FilemanagementFolder.customer_id' => array($this->customer_id, 0),
                    'FilemanagementFolder.deleted' => 0
                )
            ));
            if (!$folderData) {
                throw new Exception(__('Rename failed!'));
            }
            $oldPath = $folderData['FilemanagementFolder']['path'];
            $oldname = $folderData['FilemanagementFolder']['name'];
            $newname = $this->request->data['newname'];
            $newPath = substr($oldPath, 0, strlen($oldPath)-strlen($oldname)).$newname;
            $fileroot = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot();
            if (!@ rename($fileroot.'/'.$oldPath, $fileroot.'/'.$newPath)) {
                throw new Exception(__('The folder can not be renamed!'));
            }

            $this->FilemanagementFolder->unbindModelAll();
            $this->FilemanagementFolder->save(array(
                'id' => $folderId,
                'name' => $newname,
                'modified_by' => $this->user_id
            ));
            $this->FilemanagementFolder->updateAll(
                array(
                    'path' => 'concat(\''.$newPath.'\', substr(path, char_length(\''.$oldPath.'\')+1))',
                    'modified_by' => $this->user_id
                ),
                array('path like' => $oldPath."%")
            );

            $res = $this->FilemanagementFolder->findById($folderId);
            return $res['FilemanagementFolder'];
        }
    }

    public function move () {
        $this->checkLogin();
        $draggedId = intval($this->request->data['draggedId']);
        $tagertId = intval($this->request->data['tagertId']);
        $isFile = intval($this->request->data['isFile']);

        $draggedData = ($isFile) ?
            $this->FilemanagementFile->find('first', array(
                'conditions' => array(
                    'FilemanagementFile.id' => $draggedId,
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id)
                )
            )) :
            $this->FilemanagementFolder->find('first', array(
                'conditions' => array(
                    'FilemanagementFolder.id' => $draggedId,
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id)
                )
            ));
        if (!$draggedData) {
            throw new Exception(__('Error by move!'));
        }
        if ($tagertId > 0) {
            $tagertData = $this->FilemanagementFolder->find('first', array(
                'conditions' => array(
                    'FilemanagementFolder.id' => $tagertId,
                    'FilemanagementFolder.customer_id' => array(0, $this->customer_id)
                )
            ));
            if (!$tagertData) {
                throw new Exception(__('Error by move!'));
            }
            $newPath = $tagertData['FilemanagementFolder']['path'];
        } else {
            $newPath = $this->customer_id;
        }


        if ($isFile && $tagertId === 0) {
            throw new Exception(__('The file can not be moved to the root!'));
        }

        if ($draggedData['FilemanagementFolder']['path'] === $newPath) {
            throw new Exception(__('Error by move!'));
        }

        if (!$isFile && strpos($newPath, $draggedData['FilemanagementFolder']['path'])===0) {
            throw new Exception(__('Error by move!'));
        }

        $oldPath = $draggedData['FilemanagementFolder']['path'];
        $isNewPublic = $this->_isPathPublic($newPath);

        if ($isFile) {
            // Move File
            $oldFile = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$oldPath.'/'.$draggedData['FilemanagementFile']['name'];
            $newFile = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$newPath.'/'.$draggedData['FilemanagementFile']['name'];
            @ rename($oldFile, $newFile);
            $this->FilemanagementFile->save(array(
                'id' => $draggedId,
                'folder_id' => $tagertId,
                'modified_by' => $this->user_id
            ));
        } else {
            // Move Folder
            $newPath .= '/' . $draggedData['FilemanagementFolder']['name'];
            $oldFolder = $this->__getFilePhysicRoot().'/'.$oldPath;
            $newFolder = $this->__getFilePhysicRoot().'/'.$newPath;
            @ rename($oldFolder, $newFolder);


            $new_customer_id = ($isNewPublic) ? 0 : $this->customer_id;
            $this->FilemanagementFolder->save(array(
                'id' => $draggedId,
                'customer_id' => $new_customer_id,
                'parent_id' => $tagertId,
                'modified_by' => $this->user_id
            ));

            $this->FilemanagementFolder->updateAll(
                array(
                    'customer_id' => $new_customer_id,
                    'path' =>'concat(\''.$newPath.'\', substr(path, char_length(\''.$oldPath.'\')+1))',
                    'modified_by' => $this->user_id
                ),
                array('path like' => $oldPath."%")
            );
        }
    }

    protected function _isPathPublic ($path) {
        $pos = strpos($path, '/');
        $uid = ($pos === false) ? $path : substr($path, 0, $pos);
        return (intval($uid) === $this->customer_id) ? false : true;
    }

    function sendFile () {
        $this->checkLogin();

        $this->loadModel('User');
        $udata = $this->User->findById($this->user_id);
        $mailto = $this->request->data['mailto'];
        $salutation = $this->request->data['salutation'];
        $language = $this->request->data['language'];

        if (!$language) $language = $udata['User']['language_id'];

        $timelimit = $this->request->data['limit'];
        $expiredate = ($timelimit > 0) ?
            (
            ($timelimit == 365) ?
                date('YmdHis', strtotime('+1 year')) :
                date('YmdHis', strtotime('+'.$timelimit . ' days'))
            ) :
            '99999999999999';

        $fileIds = explode(',', $this->data['fileIds']);

        $files = $this->FilemanagementFile->find('all', array(
            'conditions' => array(
                'FilemanagementFile.id' => $fileIds,
                'FilemanagementFile.deleted' => 0
            ),
            'order' => array('LOWER(FilemanagementFile.name)')
        ));
        $filesA = [];
        foreach ($files as $f) {
            $rd = rand(1, 9999999999);
            $link = Configure::read('system.projUrl') . '/' . Configure::read('system.api.dirname') .'/filemanagement/getFile/co'.base64_encode(base64_encode(Configure::read('system.filemanagement.chip')).$f['FilemanagementFile']['id'].':'.$expiredate.':'.$rd);
            $filename = $_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot().'/'.$f['FilemanagementFolder']['path'].'/'.$f['FilemanagementFile']['name'];
            $filesize = (is_file($filename)) ? filesize($filename) : 0;
            $filesize = GlbF::human_filesize($filesize, 2);

            $filesA[] = [
                'name' => $f['FilemanagementFile']['name'],
                'size' => $filesize,
                'link' => $link
            ];
        }

        $result['files'] = $filesA;

        $emailSubject =  $this->_translateTo('Files from wiewind.com', $language);

        $Email = new CakeEmail();
        $Email->from(Configure::read('system.email.admin'));
        $Email->to($mailto);
        $Email->subject($emailSubject);
        $Email->emailFormat('html');
        $Email->theme($language);
        $Email->template('fileshare', 'infomail');
        $Email->viewVars(array(
            'salutation' => $salutation,
            'user' =>$udata['User'],
            'timelimit' => $timelimit,
            'files' => $filesA
        ));
        $Email->send();
    }

    public function addToWorklist () {
        $this->checkLogin();
        $fileIds = json_decode($this->request->data['fileIds']);
        $res = [];
        if ($fileIds) {
            $ids = $this->FilemanagementWorklistitem->find('all', [
                'user_id' => $this->user_id
            ]);
            $ids = Set::Extract('/FilemanagementWorklistitem/file_id', $ids);
            foreach ($fileIds as $id) {
                if (!in_array($id, $ids)) {
                    $data = [
                        'file_id' => $id,
                        'user_id' => $this->user_id
                    ];
                    $this->FilemanagementWorklistitem->create();
                    $this->FilemanagementWorklistitem->save($data);
                    $res[] = $id;
                }
            }
        }
        return $res;
    }

    public function removeFromWorklist () {
        $this->checkLogin();
        $fileIds = json_decode($this->request->data['fileIds']);
        $res = [];
        if ($fileIds) {
            $this->FilemanagementWorklistitem->deleteAll([
                'file_id' => implode(',', $fileIds)
            ]);
        }
        return $fileIds;
    }

    public function getWorklist () {
        $this->checkLogin();
        $this->FilemanagementWorklistitem->bindModel([
            'belongsTo' => [
                'FilemanagementFile' => [
                    'className' => 'FilemanagementFile',
                    'foreignKey' => 'file_id',
                    'type' => 'INNER'
                ],
                'FilemanagementFolder' => [
                    'className' => 'FilemanagementFolder',
                    'foreignKey' => false,
                    'conditions' => [
                        'FilemanagementFile.folder_id = FilemanagementFolder.id'
                    ],
                    'type' => 'INNER'
                ],
                'FileUserCreated' => [
                    'className' => 'User',
                    'foreignKey' => false,
                    'conditions' => [
                        'FilemanagementFile.created_by = FileUserCreated.id'
                    ],
                    'fields' => [
                        'FileUserCreated.name',
                        'FileUserCreated.username',
                    ],
                    'type' => 'LEFT'
                ],
                'FileUserModified' => [
                    'className' => 'User',
                    'foreignKey' => false,
                    'conditions' => [
                        'FilemanagementFile.modified_by = FileUserModified.id'
                    ],
                    'fields' => [
                        'FileUserModified.name',
                        'FileUserModified.username',
                    ],
                    'type' => 'LEFT'
                ]
            ]
        ]);
        $worklist = $this->FilemanagementWorklistitem->find('all', [
            'conditions' => [
                'FilemanagementWorklistitem.user_id' => $this->user_id,
                'FilemanagementFolder.customer_id' => [0, $this->customer_id],
                'FilemanagementFile.deleted' => 0,
                'FilemanagementFolder.deleted' => 0
            ],
            'order' => ['FilemanagementFolder.path', 'FilemanagementFile.name']
        ]);
        $res = [];
        if ($worklist) {
            $temp = [];
            foreach ($worklist as $file) {
                $filename = $this->__getFilePhysicRoot().'/'.$file['FilemanagementFolder']['path'].'/'.$file['FilemanagementFile']['name'];
                $file['FilemanagementFile']['size'] = (is_file($filename)) ? filesize($filename) : 0;
                $temp[] = $file;
            }
            $res = $temp;
        }
        return $res;
    }
}