<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 16.12.2016
 * Time: 16:40
 */

class AdminController extends AppController
{
    public $components = array(
        'Backup', 'Auth', 'Login'
    );

    function backup () {
        $this->autoRender = false;
        $message = '';
        $success = true;
        try {
            $hashaction = str_replace($this->request->params['controller'].'/'.$this->request->params['action'].'/', '', $this->request->url);
            if ($hashaction) {
                $hashaction = $this->Auth->decodeHashAction($hashaction);
                if ($hashaction && $hashaction['action'] !== 'backup') {
                    throw new Exception(__('This url is expired!'));
                }
                $project = 'all';
            } else {
                if (!isset($this->request->data['project']) || !$this->Login->checkModule('admin')) {
                    throw new Exception(__('This url is expired!'));
                }
                $project = $this->request->data['project'];
            }
            $this->Backup->doBackup($project);
        } catch (Exception $e) {
            $success = false;
            $message = $e->getMessage();
        }
        $result = array(
            'message' => $message,
            'success' => $success,
        );
        return json_encode($result);
    }

    protected function _allowBackup () {
        $hashaction = str_replace($this->request->params['controller'].'/'.$this->request->params['action'].'/', '', $this->request->url);
        if ($hashaction) {
            $hashaction = $this->Auth->decodeHashAction($hashaction);
            if ($hashaction && $hashaction['action'] === 'backup') {
                return true;
            }
            return false;
        }
        return $this->Login->checkModule('admin');
    }

    function getBackups () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'message' => '',
            'success' => true,
        );
        try {
            $path =  realpath(Configure::read('backup.path'));

            $dirs = scandir($path, 1);
            if ($dirs) {
                foreach ($dirs as $dirname) {
                    $dir = $path . DS . $dirname;
                    if ($dirname !== '.' && $dirname !== '..' && is_dir($dir)) {
                        $content = [];
                        $files = scandir($dir);
                        if ($files) {
                            foreach ($files as $filename) {
                                $file = $dir . DS . $filename;
                                if (is_file($file)) {
                                    $content[] = $filename . ':' . filesize($file);
                                }
                            }
                        }
                        $result['data'][] = [
                            'filename' => $dirname,
                            'content' => implode(',', $content)

                        ];
                    }
                }
            }

        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }
        return json_encode($result);
    }

    function deleteBackup () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'message' => '',
            'success' => true,
        );
        try {
            if ($this->request->data['backups']) {
                $path =  realpath(Configure::read('backup.path'));
                $backups = explode(',', $this->request->data['backups']);
                foreach ($backups as $bp) {
                    $dir = $path.DS.$bp;
                    if ($bp && is_dir($dir)) {
                        GlbF::moveDir($dir);
                    }
                }
            }
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }
        return json_encode($result);
    }
}