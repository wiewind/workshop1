<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobapplicationsController extends AppController {
    public $uses = array(
        'JobapplicationsJob',
        'JobapplicationsAttachment',
        'JobapplicationsJobsAttachment',
        'JobapplicationsTrack',
        'JobapplicationsStatustype',
        'JobapplicationsMailsetting'
    );

    private function __getFileRoot () {
        return Configure::read('system.jobattachment.root');
    }

    private function __getFilePhysicRoot () {

        return realpath($_SERVER['DOCUMENT_ROOT'] . $this->__getFileRoot());
    }

    function showAttachmentFile ($att_id, $user_id = 0) {
        $this->autoRender = false;
        try {
            $this->checkLogin();
        } catch (Exception $e) {
            echo $e->getMessage();
            return;
        }

        if (!$user_id) $user_id = $this->user_id;

        $data = $this->JobapplicationsAttachment->find('first', [
            'conditions' => [
                'id' => $att_id,
                'user_id' => $user_id
            ]
        ]);

        if (!$data) {
            echo ErrorCode::getExceptionMessage(ErrorCode::ErrorCodeBadRequest);
            return;
        }

        $data = $data['JobapplicationsAttachment'];

        $physicFile = $this->__getFilePhysicRoot() . DS .  $user_id . DS . $data['file'];
        $urlFile = Configure::read('system.url') . $this->__getFileRoot() . '/' . $user_id . '/' . $data['file'];
        if (!file_exists($physicFile)) {
            echo __('This file does not exist.');
            return;
        }

        $suffix = GlbF::getFileSuffix($data['file']);

        $this->set('suffix', $suffix);
        $this->set('filename', $physicFile);
        $this->set('frameurl', $urlFile);
        $this->layout = 'viewer';
        switch ($suffix) {
            case 'pdf':
                $this->render('/Display/pdfshow');
                break;
            case 'bmp':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'png':
                $this->render('/Display/picshow');
                break;
            case 'xls':
            case 'doc':
            case 'xlsx':
            case 'docx':
            case 'ppt':
            case 'pptx':
                $this->render('/Display/msoshow');
                break;
            case 'txt':
            case 'js':
            case 'php':
            case 'html':
            case 'htm':
            case 'asp':
            case 'html':
                $this->set('frameurl', $physicFile);
                $this->render('/Display/txtshow');
                break;
            default:
                $this->render('/Display/noshow');
                break;
        }
    }

    function getJobList () {
        $this->checkLogin();
        $total = $this->JobapplicationsJob->find('count', array(
            'conditions' => array(
                'JobapplicationsJob.user_id' => $this->user_id
            )
        ));

        $data = $this->JobapplicationsJob->find('all', array(
            'conditions' => array(
                'JobapplicationsJob.user_id' => $this->user_id
            ),
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page'],
            'order' => 'JobapplicationsJob.created desc'
        ));

        if ($data) {
            for ($i=0; $i<count($data); $i++) {
                $states = $this->JobapplicationsTrack->find('first', array(
                    'conditions' => array(
                        'JobapplicationsTrack.job_id' => $data[$i]['JobapplicationsJob']['id']
                    ),
                    'order' => array('JobapplicationsTrack.date desc')
                ));
                if ($states) {
                    $data[$i]['JobapplicationsJob']['statustype_id'] = $states['JobapplicationsTrack']['statustype_id'];
                    $data[$i]['JobapplicationsJob']['status'] = GlbF::getJobStatus($states['JobapplicationsTrack']['statustype_id']);
                }
                $mailState = $this->JobapplicationsTrack->find('first', array(
                    'conditions' => array(
                        'JobapplicationsTrack.job_id' => $data[$i]['JobapplicationsJob']['id'],
                        'JobapplicationsTrack.statustype_id' => 2
                    )
                ));
                if ($mailState) {
                    $data[$i]['JobapplicationsJob']['email_applied'] = 1;
                } else {
                    $data[$i]['JobapplicationsJob']['email_applied'] = 0;
                }
            }
        }
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function getAttachments () {
        $this->checkLogin();
        $total = $this->JobapplicationsAttachment->find('count', array(
            'conditions' => array(
                'user_id' => $this->user_id,
                'deleted' => 0
            )
        ));

        $data = $this->JobapplicationsAttachment->find('all', array(
            'conditions' => array(
                'user_id' => $this->user_id,
                'deleted' => 0
            ),
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page'],
            'order' => 'name'
        ));

        if ($total === 0) {
            throw new Exception(__('Nothing found'));
        }

        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function loadAttachment () {
        $this->checkLogin();
        $id = $this->request->data['id'];

        $data =  $this->JobapplicationsAttachment->find('first', array(
            'conditions' => array(
                'id' => $id,
                'user_id' => $this->user_id,
                'deleted' => 0
            )
        ));

        if ($data) {
            $data = $data['JobapplicationsAttachment'];
        }
        return $data;
    }

    function saveAttachment () {
        $this->checkLogin();
        $data = $this->request->data;

        if ($data['id'] == 0 && !$_FILES['file']['name']) {
            ErrorCode::throwException(__('Please upload a file!'), ErrorCode::ErrorCodeBadRequest);
        }

        $attachment = array(
            'user_id' => $this->user_id,
            'name' => $data['name'],
            'modified_by' => $this->user_id,
            'default_send' => (isset($data['default_send']) && $data['default_send']) ? 1 : 0
        );

        if (strlen($_FILES['file']['name']) > 0) {
            $file = $_FILES['file'];
            $dir = $this->__getFilePhysicRoot() . DS . $this->user_id;
            GlbF::mkDir($dir);

            if ($data['id'] > 0) {
                $fdata = $this->JobapplicationsAttachment->findById($data['id']);
                $oldfilename = $fdata['JobapplicationsAttachment']['file'];
                unlink($dir.'/'.$oldfilename);
            }

            $tempname = $file['tmp_name'];

            // check duplicate
            $i = 1;
            $newfilename = $file['name'];
            while (is_file($dir.'/'.$newfilename)) {
                $newfilename = $file['name'].'_'.$i;
                $i++;
            }

//            $attachment['newfilename'] = $dir.'/'.$newfilename;

            //file upload
            if (!move_uploaded_file($tempname, $dir.'/'.$newfilename)) {
                throw new Exception(sprintf(__('Error by upload [%s].'), $file['name']));
            }

            $attachment['file'] = $newfilename;
        }

        //save in DB
        if ($data['id'] == 0) {
            $this->JobapplicationsAttachment->create();
            $attachment['created_by'] = $this->user_id;
        } else {
            $attachment['id'] = $data['id'];
        }
        $this->JobapplicationsAttachment->save($attachment);

        if ($data['id'] == 0) {
            $attachment['id'] = $this->JobapplicationsAttachment->getLastInsertID();
        }
        return $attachment;
    }

    function deleteAttachment () {
        $this->checkLogin();
        $id = $this->request->data['id'];
        $data =  $this->JobapplicationsAttachment->find('first', array(
            'conditions' => array(
                'id' => $id,
                'user_id' => $this->user_id
            )
        ));

        if (!$data) {
            ErrorCode::throwException(__('The attachment does not exist!'));
        }

        if ($data['JobapplicationsAttachment']['file']) {
            $filename = $data['JobapplicationsAttachment']['file'];
            $dir = $this->__getFilePhysicRoot() . DS . $this->user_id;
            $file = $dir . DS . $filename;
            if (file_exists($file)) unlink($file);
        }
        $this->JobapplicationsAttachment->delete($id);
    }

    function getJobAttachments () {
        $this->checkLogin();
        $this->JobapplicationsJobsAttachment->bindModel(array(
            'belongsTo' => array(
                'JobapplicationsAttachment' => array(
                    'className' => 'JobapplicationsAttachment',
                    'foreignKey' => 'attachment_id'
                )
            )
        ));

        $data = $this->JobapplicationsJobsAttachment->find('all', array(
            'conditions' => array(
                'job_id' => $this->request->data['job_id']
            ),
            'order' => 'JobapplicationsAttachment.name'
        ));

        $total = count($data);

        if ($total === 0) {
            throw new Exception(__('Nothing found'));
        }
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function loadJob () {
        $this->checkLogin();
        $data = $this->JobapplicationsJob->find('first', array(
            'conditions' => array(
                'JobapplicationsJob.id' => $this->request->data['id'],
                'JobapplicationsJob.user_id' => $this->user_id
            )
        ));

        if ($data) {
            $data = $data['JobapplicationsJob'];
        }
        return $data;
    }

    function getJobStatus () {
        $this->checkLogin();
        $job_id = $this->request->data['job_id'];
        $total = $this->JobapplicationsTrack->find('count', array(
            'conditions' => array(
                'job_id' => $job_id
            )
        ));

        if ($total === 0) {
            throw new Exception(__('Nothing found'));
        }

        $data = $this->JobapplicationsTrack->find('all', array(
            'conditions' => array(
                'job_id' => $job_id
            ),
            'order' => array('JobapplicationsTrack.date desc', 'JobapplicationsTrack.statustype_id desc')
        ));

        if ($data) {
            for ($i=0; $i<count($data); $i++) {
                $data[$i]['JobapplicationsTrack']['status_name'] = GlbF::getJobStatus($data[$i]['JobapplicationsTrack']['statustype_id']);
            }
        }
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function deleteJobStatus () {
        $this->checkLogin();
        $track_id = $this->request->data['track_id'];
        $this->JobapplicationsTrack->delete($track_id);
    }

    function  saveJobStatus () {
        $this->checkLogin();
        $data = $this->request->data;

        $saveData = [
            'job_id' => $data['job_id'],
            'statustype_id' => $data['status_id'],
            'date' => date('Y-m-d H:i:s'),
            'notice' => $data['notice']
        ];

        if (isset($data['id']) && $data['id'] > 0) {
            $saveData['id'] = $data['id'];
        } else {
            $this->JobapplicationsTrack->create();
        }

        $this->JobapplicationsTrack->save($saveData);
        return $saveData;
    }

    function getStatustypes () {
        $this->checkLogin();
        $data = $this->JobapplicationsStatustype->find('all', array(
            'conditions' => array(
                'id > ' => 1
            ),
            'order' => 'JobapplicationsStatustype.sortorder'
        ));

        $total = count($data);
        for ($i=0; $i<$total; $i++) {
            $data[$i]['JobapplicationsStatustype']['name'] = GlbF::getJobStatus($data[$i]['JobapplicationsStatustype']['id']);
        }
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function saveJob () {
        $this->checkLogin();
        // Job Info

        $data = $this->request->data;
        $data['user_id'] = $this->user_id;

        $date = date('Y-m-d H:i:s');

        $data['modified_by'] = $this->user_id;

        $isNew = false;
        if ($data['id'] == 0) {
            $this->JobapplicationsJob->create();
            $data['created_by'] = $this->user_id;
            $isNew = true;
            unset($data['id']);
        }
        $this->JobapplicationsJob->save($data);

        if (!$isNew) {
            return $data;
        }

        $data['id'] = $this->JobapplicationsJob->getLastInsertID();

        // Status
        $this->JobapplicationsTrack->create();
        $this->JobapplicationsTrack->save(array(
            'job_id' => $data['id'],
            'statustype_id' => 1,
            'date' => $date
        ));

        // Attachments
        if ($data['attc']) {
            foreach ($data['attc'] as $att) {
                $this->JobapplicationsJobsAttachment->create();
                $this->JobapplicationsJobsAttachment->save(array(
                    'job_id' => $data['id'],
                    'attachment_id' => $att
                ));
            }
        }

        // send email
        if ($data['email']) {
            list($mailsend, $message) = $this->_sendmail($data);

            $data['mailsend']['status'] = $mailsend;
            $data['mailsend']['message'] = $message;
        }

        return $data;
    }

    protected function _sendmail ($jobinfo) {
        $mailsetting = $this->JobapplicationsMailsetting->find('first', array(
            'conditions' => array(
                'user_id' => $this->user_id
            )
        ));

        if ($mailsetting) {
            $this->JobapplicationsJobsAttachment->bindModel(
                array(
                    'belongsTo' => array(
                        'JobapplicationsAttachment' => array(
                            'className' => 'JobapplicationsAttachment',
                            'foreignKey' => 'attachment_id'
                        )
                    )
                )
            );
            $jobAttachments = $this->JobapplicationsJobsAttachment->find('all', array(
                'conditions' => array(
                    'job_id' => $jobinfo['id']
                ),
                'order' => 'JobapplicationsAttachment.name'
            ));

            $Email = new CakeEmail();
            $Email->from($mailsetting['JobapplicationsMailsetting']['email']);
            $Email->to($jobinfo['email']);
            $Email->subject('Bewerbung: ' . $jobinfo['jobname']);
            $Email->emailFormat('html');

            if ($jobAttachments) {
                $attcs = array();
                foreach ($jobAttachments as $key => $attc) {
                    $file = $this->__getFilePhysicRoot() . DS . $this->JobapplicationsAttachment->getFilePath($attc);
                    $attcs[$attc['JobapplicationsAttachment']['file']] = array(
                        'file' => $file,
                        'mimetype' => mime_content_type($file),
                        'contentId' => $key+1
                    );
                }
                $Email->attachments($attcs);
            }

            $Email->send($mailsetting['JobapplicationsMailsetting']['message']);

            $this->JobapplicationsTrack->create();
            $this->JobapplicationsTrack->save(array(
                'job_id' => $jobinfo['id'],
                'statustype_id' => 2,
                'date' => date('Y-m-d H:i:s')
            ));

            $Email->reset();
            $Email->from(Configure::read('system.email.admin'));
            $Email->to(array($mailsetting['JobapplicationsMailsetting']['email']));
            $Email->subject('Du hast eine Bewerbung ausgeschickt: ' . $jobinfo['jobname']);
            $Email->emailFormat('html');
            $message =  __('Job').': <b>'.$jobinfo['jobname'].'</b><br />'.
                __('Company').': <b>'.$jobinfo['company'].'</b><br />'.
                __('Email').': <b>'.$jobinfo['email'].'</b><br />'.
                __('Date').': <b>'.date(GlbF::getDateFormat().' H:i').'</b><br />'.
                __('ID').': <b>'.$jobinfo['id'].'</b><br /><br />';
            if ($jobAttachments) {
                $attcs = array();
                foreach ($jobAttachments as $key => $attc) {
                    $attcs[] = $attc['JobapplicationsAttachment']['name'];
                }
                $message .= __('Attachment').': '.implode(', ', $attcs);
            }
            $Email->send($message);
        }
    }

    function sendMail () {
        $this->checkLogin();
        // Job Info
        $job_id = $this->request->data['job_id'];
        $data = $this->JobapplicationsJob->findById($job_id);
        // send email
        if ($data['JobapplicationsJob']['email']) {
            $this->_sendmail($data['JobapplicationsJob']);
        }
    }

    function deleteJob () {
        $this->checkLogin();
        $job_id = $this->request->data['job_id'];
        $this->JobapplicationsTrack->deleteAll(array('job_id' => $job_id));
        $this->JobapplicationsJobsAttachment->deleteAll(array('job_id' => $job_id));
        $this->JobapplicationsJob->delete($job_id);
    }

    function getMailsetting () {
        $this->checkLogin();
        $data = $this->JobapplicationsMailsetting->find('first', array(
            'conditions' => array(
                'user_id' => $this->user_id
            )
        ));
        if ($data) {
            $data = $data['JobapplicationsMailsetting'];
        }
        return $data;
    }

    function saveMailsetting () {
        $this->checkLogin();

        $data = $this->request->data;
        if ($data['id'] > 0) {
            $new_data['id'] = $data['id'];
        } else {
            $this->JobapplicationsMailsetting->create();
            $new_data['created_by'] = $this->user_id;
        }
        $new_data['user_id'] = $this->user_id;
        $new_data['email'] = $data['email'];
        $new_data['message'] = $data['message'];
        $new_data['modified_by'] = $this->user_id;
        $this->JobapplicationsMailsetting->save($new_data);

        if (!isset($data['id'])) {
            $new_data['id'] = $this->JobapplicationsMailsetting->getLastInsertID();
        }
        return $new_data;
    }
}