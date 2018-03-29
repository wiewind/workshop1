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

    function getBackups () {
        $this->checkLogin();
        $path =  $this->Backup->getFilePhysicPath();

        $dirs = scandir($path, 1);
        $data = [];
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
                    $data[] = [
                        'filename' => $dirname,
                        'content' => implode(',', $content)
                    ];
                }
            }
        }
        return $data;
    }

    function backup () {
        $this->checkLogin();
        set_time_limit(600);
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

    function deleteBackup () {
        $this->checkLogin();
        if ($this->request->data['backups']) {
            $path =  $this->Backup->getFilePhysicPath();
            $backups = explode(',', $this->request->data['backups']);
            foreach ($backups as $bp) {
                $dir = $path.DS.$bp;
                if ($bp && is_dir($dir)) {
                    GlbF::moveDir($dir);
                }
            }
        }
    }
}