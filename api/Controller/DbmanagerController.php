<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class DbmanagerController extends AppController {
    public $components = array(
        'Backup'
    );
    function getTables () {
        $this->checkLogin();
        $db = ClassRegistry::init("User")->getDataSource();
        $tables = $db->listSources();
        if ($tables) {
            foreach($tables as $table) {
                $data[] = array('name' => $table);
            }
        }
        $total = count($tables);
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function getTableInfo () {
        $this->checkLogin();
        $tablename = $this->request->data['tablename'];
        $data = [];
        $db = ClassRegistry::init("User")->getDataSource();
        $tables = $db->listSources();
        if ($tables && in_array($tablename, $tables)) {
            $data = $db->describe($tablename);
        }
        return $data;
    }

    protected function _getClassModel ($tablename) {
        $model = ClassRegistry::init('Data');
        $model->useTable = $tablename;
        $model->tablePrefix = '';
        return $model;
    }

    function getTableDaten () {
        $this->checkLogin();
        
        $tablename = $this->request->data['tablename'];
        $page = $this->request->data['page'];
        $limit = $this->request->data['limit'];

        $model = $this->_getClassModel($tablename);

        $res = $model->find('all', array(
            'page' => $page,
            'limit' => $limit,
        ));
        $total = $model->find('count');

        $data = [];
        if ($res) {
            foreach ($res as $row) {
                $data[] = $row['Data'];
            }
        }
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    public function getPrimaryKey () {
        $this->checkLogin();

        $tablename = $this->request->data['tablename'];
        $keys = array();
        $db = ClassRegistry::init("User")->getDataSource();
        $tables = $db->listSources();
        if ($tables && in_array($tablename, $tables)) {
            $dbinfo = $db->describe($tablename);
            foreach ($dbinfo as $key => $value) {
                if (isset($value['key']) && $value['key'] === 'primary') {
                    $keys[] = $key;
                }
            }
        }
        return $keys;
    }

    public function save () {
        $this->checkLogin();
        $data = $this->request->data;

        $tablename = $data['tablename'];
        unset($data['tablename']);
        $model = $this->_getClassModel($tablename);
        $db = $model->getDataSource();
        $tables = $db->listSources();
        if ($tables && in_array($tablename, $tables)) {
            $tableInfo = $db->describe($tablename);
        } else {
            ErrorCode::throwException(__('DB error!'));
        }

        foreach ($tableInfo as $attrname=>$attr) {
            if ($attr['type'] == 'boolean' && array_key_exists($attrname, $data)) {
                // hire cann't switch be used, 'switch case' eq. '=='; 'false' == true!!!
                if (
                    $data[$attrname] === 1 ||
                    $data[$attrname] === '1' ||
                    $data[$attrname] === true ||
                    $data[$attrname] === 'true' ||
                    $data[$attrname] === 'on'
                ) {
                    $data[$attrname] = true;
                } else {
                    $data[$attrname] = false;
                }
            }
        }

        $conditions = $data['conditions'];
        unset($data['conditions']);
        $isNewRecord = isset($data['isNewRecord']) && ($data['isNewRecord'] === 'true');
        unset($data['isNewRecord']);

        if (array_key_exists('modified', $tableInfo)) $data['modified'] = date('Y-m-d H:i:s');
        if (array_key_exists('modified_by', $tableInfo)) $data['modified_by'] = $this->user_id;

        if ($isNewRecord) {
            if (array_key_exists('created', $tableInfo)) $data['created'] = date('Y-m-d H:i:s');
            if (array_key_exists('created_by', $tableInfo)) $data['created_by'] = $this->user_id;
            if (isset($data['id'])) unset($data['id']);
            $model->create();
            $model->save($data);
            $data['id'] = $model->id;
        } else if ($conditions) {
            $sql = 'update ' . $tablename . ' set ';

            foreach ($data as $key => $value) {
                $sql .= '`'.$key.'` = "' . str_replace('"', '\\"', $value) . '", ';
            }
            $sql = substr($sql, 0, strlen($sql)-2) . ' where ';

            foreach ($conditions as $key => $value) {
                $sql .= '`'.$key.'` = "' . $value . '" and ';
            }
            $sql = substr($sql, 0, strlen($sql)-4) . ';';

            $model->query($sql);
        }

        return $data;
    }

    public function delete () {
        $this->checkLogin();
        $params = $data = $this->request->data;
        $tablename = $params['tablename'];
        $model = $this->_getClassModel($tablename);
        if (isset($params['id'])) {
            $model->delete($params['id']);
        } else {
            $where = $params['where'];
            $sql = 'delete from '.$tablename.' where '.$where;
            $model->query($sql);
        }
    }
}