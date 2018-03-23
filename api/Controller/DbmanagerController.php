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

    function getTableInfo ($tablename) {
        $this->checkLogin();
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

    function getTableDaten ($tablename) {
        $this->checkLogin();

        $page = $this->request->query['page'];
        $limit = $this->request->query['limit'];

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

    public function getPrimaryKey ($tablename) {
        $this->checkLogin();

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

    public function update ($tablename) {
        $this->checkLogin();
        if ($this->request->is('post')) {
            $data = $this->request->data;
            if (isset($data['modified'])) $data['modified'] = date('Y-m-d H:i:s');
            if (isset($data['modified_by'])) $data['modified_by'] = $this->user_id;
        }
        $model = $this->_getClassModel($tablename);
        $keys = $this->getPrimaryKey($tablename);
        if (count($keys) === 1 && $keys[0] === 'id') {
            $model->save($data);
        } else {
            $setValue = '';
            foreach ($data as $feld => $value) {
                if ($setValue) $setValue .= ', ';
                $setValue .= $feld.' = "'.$value.'"';
            }
            $where = '';
            foreach ($keys as $key) {
                if ($where) $where .= ' and ';
                $where .= $key.' = '.$data[$key];
            }
            $sql = 'update '.$tablename.' set '.$setValue.' where '.$where;
            $model->query($sql);
        }
    }

    public function create ($tablename) {
        $this->checkLogin();
        if ($this->request->is('post')) {
            $data = $this->request->data;
            $data['created'] = date('Y-m-d H:i:s');
            $data['created_by'] = $this->user_id;
            $data['modified'] = date('Y-m-d H:i:s');
            $data['modified_by'] = $this->user_id;
        }
        $model = $this->_getClassModel($tablename);
        $model->create();
        $model->save($data);
        $data['id'] = $model->id;
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