<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class WorknoteReleasesController extends AppController {
    public function getReleases () {
        $this->checkLogin();
        $param = $this->request->data;
        $data = $this->WorknoteRelease->find('all', [
            'conditions' => [
                'worknote_id' => $param['worknoteId']
            ],
            'order' => [
                'file'
            ]
        ]);
        return $data;
    }

    public function save () {
        $this->checkLogin();
        $param = $this->request->data;
        $id = $param['worknoteId'];
        $file = $param['file'];
        $finished = (isset($param['finished']) && $param['finished'] == 'on') ? 1 : 0;
        if ($this->WorknoteRelease->find('count', array(
                'conditions' => array(
                    'worknote_id' => $id,
                    'file' => $file
                )
            )) > 0) {
            ErrorCode::throwExceptionCode(ErrorCode::ErrorCodeFileDuplicate);
        }
        $data = array(
            'worknote_id' => $id,
            'file' => $file,
            'finished' => $finished,
            'created_by' => $this->user_id,
            'modified_by' => $this->user_id
        );
        $this->WorknoteRelease->save($data);
    }

    public function setFinished () {
        $this->checkLogin();
        $params = $this->request->data;
        $id = $params['worknoteRelease_id'];
        $value = $params['value'];
        $this->WorknoteRelease->save(array(
            'id' => $id,
            'finished' => $value
        ));
    }

    public function delete () {
        $this->checkLogin();
        $this->WorknoteRelease->delete($this->request->data('id'));
    }

    public function update () {
        $this->checkLogin();
        if ($this->request->is('post')) {
            $data = $this->request->data;
            $data['modified_by'] = $this->user_id;
            $this->WorknoteRelease->save($data);
        }
    }
}