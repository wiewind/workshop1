<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 16.12.2016
 * Time: 10:50
 */

App::uses('Component', 'Controller');

Class BackupComponent extends Component {
    var $components = array('MySession', 'MyCookie', 'Auth');

    public function getFilePhysicPath () {
        $path = realpath($_SERVER['DOCUMENT_ROOT']) . DS . Configure::read('system.backup.path');
        if (!is_dir($path)) {
            GlbF::mkDir($path);
        }
        return realpath($path);
    }

    protected function _getProjectPath ($projectPath) {
        return realpath($_SERVER['DOCUMENT_ROOT'] .DS . $projectPath);
    }

    function doBackup ($project='all') {
        $allproject = Configure::read('system.backup.projects');
        $time = date(Configure::read('system.backup.folder_time_format'));
        if ($project === 'all') {
            foreach ($allproject as $proj => $info) {
                $this->_do($proj, $time, $info);
            }
            return;
        }

        if (is_string($project)) {
            $project = explode(',', $project);
        }

        if (is_array($project)) {
            $incorrect_proj = [];
            foreach ($project as $proj) {
                $proj = trim($proj);
                if (array_key_exists($proj, $allproject)) {
                    $this->_do($proj, $time, $allproject[$proj]);
                } else {
                    $incorrect_proj[] = $proj;
                }
            }
            if ($incorrect_proj) {
                throw new Exception(sprintf(__("The Backup of '%s' is failed!"), implode("', '", $incorrect_proj)));
            }
        }
    }

    protected function _do ($project, $time, $projectInfo) {
        if ($project === 'sql') {
            $this->_backupDB($time);
        }
        if ($projectInfo !== false) {
            $this->_backupFile($project, $time, $projectInfo);
        }
        $this->_deleteOldBackup();
    }

    protected function _backupDB ($time) {
        $dataSourceName = 'default';

        $path = $this->getFilePhysicPath() . DS . $time . DS;
        GlbF::mkDir($path);

        $fileSufix = '[db]_' . $time . '.sql';
        $file = $path . $fileSufix;
        if (!is_writable($path)) {
            trigger_error('The path "' . $path . '" isn\'t writable!', E_USER_ERROR);
        }

        $this->__log("Backing up to '".$fileSufix."'...");
        $File = new File($file);

        $db = ClassRegistry::init("User")->getDataSource();
        $tables = $db->listSources();

        if (!$this->MySession->checkConfig('version')) {
            $model = ClassRegistry::init('Version');
            $version = $model->find('first', [
                'order' => 'id desc'
            ]);
            $version['Version']['year'] = substr($version['Version']['date'], 0, 4);
            $this->MySession->writeConfig('version', $version['Version']);
        }

        $File->write("-- Wiewind Studio SQL Dump\n".
            "-- version ".$this->MySession->readConfig('version.number')."\n".
            "-- http://www.wiewind.com\n".
            "-- Database: `wiewind_com`\n".
            "-- Generation Time: ".date('Y-m-d H:i:s')."\n".
            "-- ------------------------------\n".
            "\nSET FOREIGN_KEY_CHECKS = 0;\n\n"
        );

        if ($tables) {
            foreach($tables as $table) {
                $this->_getTableCreateStatement($table, $db, $File);
                $this->_getTableDataStatement($table, $File);

                $File->write("\n");
            }
        }

        $File->write("\nSET FOREIGN_KEY_CHECKS = 1;\n\n");
        $File->close();

        $this->__log("File \"" . $file . "\" saved (" . filesize($file) . " bytes)");

        $this->__log('Zipping ' . $fileSufix . '.zip ...');
        $zip = new ZipArchive();
        $zip->open($file . '.zip', ZIPARCHIVE::CREATE);
        $zip->addFile($file, $fileSufix);
        $zip->close();
        $this->__log("Zip \"" . $fileSufix . ".zip\" Saved (" . filesize($file . '.zip') . " bytes)");
        if (file_exists($file . '.zip')) {
            unlink($file);
        }
    }

    protected function _getTableCreateStatement ($tablename, $dataSource, $File) {
        $str = "\n\n--\n".
            "-- Table structure for table `{$tablename}`\n".
            "--\n\n";
        $str .= "DROP TABLE IF EXISTS `" . $tablename . "`;\n";
        $str .= $dataSource->query('SHOW CREATE TABLE `' . $tablename . '`')[0][0]['Create Table'].';';

        $File->write($str);
    }

    protected function _getTableDataStatement ($tablename, $File) {
        $model = ClassRegistry::init(Inflector::classify($tablename));
        $model->useTable = $tablename;
        $model->tablePrefix = '';
        $count = $model->find('count');

        if ($count > 0) {
            $File->write("\n\n--\n".
                "-- Dumping data for table `{$tablename}`\n".
                "--\n");
            $this->__writeTableData($model, $File);
        }
    }

    private function __writeTableData ($model, $File, $page = 1) {
        $limit = Configure::read('system.backup.count_pro_insert');
        $data = $model->find('all', array(
            'page' => $page,
            'limit' => $limit,
        ));
        $modelName = Inflector::classify($model->useTable);
        if ($data) {
            $fields = [];
            foreach ($data[0][$modelName] as $key => $value) {
                $fields[] = "`{$key}`";
            }

            $out = "INSERT INTO `".$model->useTable."` (" . implode(', ', $fields) . ") VALUES\n";

            $records = [];
            foreach ($data as $i => $d) {
                $values = [];
                foreach ($d[$modelName] as $key => $value) {
                    $values[] = "'" . str_replace("'", "\\'", $value) . "'";
                }
                $records[] = "(" . implode(', ', $values) . ")";
            }
            $out .= implode(", \n", $records) . ";\n";

            $File->write($out);

            $this->__writeTableData($model, $File, ($page+1));
        }
    }

    protected function _deleteOldBackup() {
        $path = $this->getFilePhysicPath();
        $dir = scandir($path);
        $files = [];
        foreach ($dir as $f) {
            if ($f != "." && $f != "..") {
                $files[] = $f;
            }
        }
        reset($dir);

        $max = Configure::read('system.backup.max');
        $count = count($files);

        if ($count >= $max) {
            for ($i=0; $i<($count-$max); $i++) {
                GlbF::moveDir($path. '/' .$files[$i]);
            }
        }
    }

    private function __log ($log) {
        CakeLog::write('backup', $log);
    }

    protected function _backupFile ($project, $time, $projectInfo) {
        ini_set("memory_limit","512M");
        ini_set('max_execution_time', 600);

        $path = $this->getFilePhysicPath() . DS . $time . DS;
        GlbF::mkDir($path);

        $filename = $project . '_' . $time . '.zip';
        $file = $path . $filename;

        $this->__log('Zipping files ' . $filename . ' ...');
        $zip = new ZipArchive();
        $flag = $zip->open($file, ZipArchive::CREATE);
        if($flag!==true){
            echo "open error code: {$flag}\n";
            exit();
            ErrorCode::throwException(__('open error code: ') + $flag, ErrorCode::ErrorCodeServerInternal);
        }

        $this->_addFileToZip('', $zip, $projectInfo);
        $zip->close();
        $this->__log("Zip \"" . $filename . "\" Saved (" . filesize($file) . " bytes)");
    }

    protected function _addFileToZip($path, $zip, $projectInfo){
        $webPath = $this->_getProjectPath($projectInfo['path']);
        if (substr($webPath, strlen($webPath)-1,  1) != DS) {
            $webPath .= DS;
        }

        if (!isset($projectInfo['exception']) || !is_array($projectInfo['exception'])) {
            $projectInfo['exception'] = [];
        }


        $webPath = $webPath . $path;

        if (is_dir($webPath)) {
            $handler = opendir($webPath);
            if (substr($webPath, strlen($webPath)-1,  1) != DS) {
                $webPath .= DS;
            }
            while (($filename = readdir($handler)) !== false) {
                if ($filename === '.' || $filename === '..') continue;
                $relativeFilePath = ($path) ? $path . DS . $filename : $filename;
                if (in_array($relativeFilePath, $projectInfo['exception'])) {
                    $zip->addEmptyDir($relativeFilePath);
                } else {
                    $this->_addFileToZip($relativeFilePath, $zip, $projectInfo);
                }
            }
            @closedir($handler);
        } else if (file_exists($webPath)) {
            $zip->addFile($webPath, $path);
        }
    }
}