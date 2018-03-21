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
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        try{
            $db = ClassRegistry::init("User")->getDataSource();
            $tables = $db->listSources();
            if ($tables) {
                foreach($tables as $table) {
                    $data[] = array('name' => $table);
                }
                $total = count($tables);
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'data' => $data,
            'total' => $total,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function getTableInfo ($tablename) {
        $message = '';
        $success = true;
        $data = array();
        try{
            $db = ClassRegistry::init("User")->getDataSource();
            $tables = $db->listSources();
            if ($tables && in_array($tablename, $tables)) {
                $data = $db->describe($tablename);


            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    protected function _getClassModel ($tablename) {
        $model = ClassRegistry::init('Data');
        $model->useTable = $tablename;
        $model->tablePrefix = '';
        return $model;
    }

    function getTableDaten ($tablename) {
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        $page = $this->request->query['page'];
        $limit = $this->request->query['limit'];
        try{
            $model = $this->_getClassModel($tablename);

            $res = $model->find('all', array(
                'page' => $page,
                'limit' => $limit,
            ));
            $total = $model->find('count');
            if ($res) {
                foreach ($res as $row) {
                    $data[] = $row['Data'];
                }
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'data' => $data,
            'total' => $total,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    public function getPrimaryKey ($tablename) {
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
        $message = '';
        $success = true;
        try {
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
        } catch (Exception $e) {
            $success = false;
            $message = $e->getMessage();
        }
        $result = array(
            'message' => $message,
            'success' => $success,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    public function create ($tablename) {
        $message = '';
        $success = true;
        $newId = 0;
        try {
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
            $newId = $model->id;
        } catch (Exception $e) {
            $success = false;
            $message = $e->getMessage();
        }
        $result = array(
            'message' => $message,
            'success' => $success,
            'newId' => $newId,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    public function delete () {
        $message = '';
        $success = true;
        try {
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
        } catch (Exception $e) {
            $success = false;
            $message = $e->getMessage();
        }
        $result = array(
            'message' => $message,
            'success' => $success,
        );
        $this->autoRender = false;
        return json_encode($result);
    }
}