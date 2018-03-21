<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class WorknoteProjectsController extends AppController {

    public function getAllProjects () {
        $this->checkLogin();
        $data = $this->WorknoteProject->find('all', array(
            'fields' => [
                'id',
                'name'
            ],
            'conditions' => [
                'user_id' => $this->user_id
            ],
            'order' => [
                'name',
                'created',
            ]
        ));
        return $data;
    }

    public function create () {
        $this->checkLogin();
        $param = $this->request->data;
        $name = $param['name'];
        if ($this->WorknoteProject->find('count', array(
                'conditions' => array(
                    'name' => $name,
                    'user_id' => $this->user_id,
                )
            )) > 0) {
            ErrorCode::throwException(__('This item already exists.'), ErrorCode::ErrorCodeBadRequest);
        }
        $data = array(
            'name' => $name,
            'user_id' => $this->user_id,
            'created_by' => $this->user_id,
            'modified_by' => $this->user_id
        );
        $this->WorknoteProject->create();
        $this->WorknoteProject->save($data);
        return $this->WorknoteProject->getLastInsertID();
    }

    public function delete () {
        $this->checkLogin();
        $WorknoteModel = ClassRegistry::init('Worknote');
        $WorknoteModel->updateAll(
            array('worknote_project_id' => null),
            array('worknote_project_id =' => $this->request->data('id'))
        );
        $this->WorknoteProject->delete($this->request->data('id'));
    }

    public function update () {
        $this->checkLogin();
        if ($this->request->is('post')) {
            $data = $this->request->data;
            $data['modified_by'] = $this->user_id;
            $this->WorknoteProject->save($data);
        }
    }
}