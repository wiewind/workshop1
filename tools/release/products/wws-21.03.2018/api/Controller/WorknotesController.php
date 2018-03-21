<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class WorknotesController extends AppController {

    private function __getConditions ($params) {
        $conditions = array (
            'Worknote.user_id' => $this->user_id
        );
        if (isset($params['method']) && $params['method'] == 'post') {
            $conditions['date >= '] = $params['start_date'];
            $conditions['date <= '] = $params['end_date'];
            if ($params['text']) {
                $conditions['OR']['Worknote.title like'] = '%'.$params['text'].'%';
                $conditions['OR']['WorknoteProject.name like'] = '%'.$params['text'].'%';
                $conditions['OR'][] = 'MATCH (Worknote.text) AGAINST ("'.$params['text'].'")';
            }
            if (isset($params['project']) && $params['project']) {
                $conditions['Worknote.worknote_project_id'] = explode(',', $params['project']);
            }
            if (isset($params['hasRelease']) && isset($params['hasRelease']) === 'on') {
                if ($params['releaseType'] === 'free') {
                    $conditions['WorknoteRelease.finished'] = 0;
                } else if ($params['releaseType'] === 'all') {
                    $conditions['WorknoteRelease.finished in'] = array(0, 1);
                }
            }
        }
        return $conditions;
    }

    public function getWorknotesList () {
        $this->checkLogin();

        $params = $this->request->data;

        $fields = [
            'Worknote.id',
            'Worknote.date',
            'Worknote.title',
            'WorknoteProject.name',
            'group_concat(WorknoteRelease.id) as wrid',
            'group_concat(WorknoteRelease.finished) as finished'
        ];

        $conditions = $this->__getConditions($params);

        $joins = [
            [
                'table' => Inflector::tableize('WspWorknoteProject'),
                'alias' => 'WorknoteProject',
                'conditions' => array(
                    'WorknoteProject.id = Worknote.worknote_project_id'
                ),
                'type' => 'left'
            ],
            [
                'table' => Inflector::tableize('WspWorknoteRelease'),
                'alias' => 'WorknoteRelease',
                'conditions' => array(
                    'WorknoteRelease.worknote_id = Worknote.id'
                ),
                'type' => 'left'
            ]
        ];
        $order = [
            'Worknote.date' => 'desc',
            'Worknote.created' => 'desc'
        ];

        $options = [
            'fields' => $fields,
            'conditions' => $conditions,
            'joins' => $joins,
            'group' => array('Worknote.id')
        ];
        $total = $this->Worknote->find('count', $options);

        $options = [
            'fields' => $fields,
            'conditions' => $conditions,
            'joins' => $joins,
            'group' => array('Worknote.id'),
            'limit' => $params['limit'],
            'order' => $order,
            'page' => $params['page']
        ];
        $data = $this->Worknote->find('all', $options);

        $temp = [];
        foreach ($data as $record) {
            $hasRelease = 0;
            $waitRelease = 0;
            if (strlen($record[0]['wrid']) > 0) {
                $hasRelease = 1;
                $status = explode(',', $record[0]['finished']);
                foreach ($status as $item) {
                    if (!$item) {
                        $waitRelease = 1;
                        break;
                    }
                }
            }
            $record['Worknote']['hasRelease'] = $hasRelease;
            $record['Worknote']['waitRelease'] = $waitRelease;


            $temp[] = [
                'Worknote' => $record['Worknote'],
                'WorknoteProject' => $record['WorknoteProject']
            ];
        }
        $data = $temp;

        return [
            'data' => $data,
            'total' => $total
        ];
    }

    function getNewNotes () {
        $this->checkLogin();
        $fields = [
            'Worknote.id',
            'Worknote.date',
            'Worknote.title',
//            'Worknote.text',
            'WorknoteProject.name'
        ];
        $conditions = [
            'Worknote.user_id' => $this->user_id
        ];
        $joins = [
            [
                'table' => Inflector::tableize('WspWorknoteProject'),
                'alias' => 'WorknoteProject',
                'conditions' => array(
                    'WorknoteProject.id = Worknote.worknote_project_id'
                ),
                'type' => 'left'
            ]
        ];
        $order = [
            'Worknote.date' => 'desc',
            'Worknote.created' => 'desc'
        ];

        return $this->Worknote->find('all', [
                'fields' => $fields,
                'conditions' => $conditions,
                'joins' => $joins,
                'order' => $order,
                'limit' => 15
        ]);
    }

    public function save () {
        $this->checkLogin();

        $data = $this->request->data;
        $data['modified_by'] = $this->user_id;
        if ($data['id'] == 0) {
            unset($data['id']);
            $data['user_id'] = $this->user_id;
            $data['created_by'] = $this->user_id;
            $this->Worknote->create();
        }
        $this->Worknote->save($data);
        if (!isset($data['id']) || $data['id'] == 0) $data['id'] = $this->Worknote->getLastInsertID();
        return $data['id'];
    }

    private function __getWorknoteDetai ($id) {
        $this->Worknote->bindModel(array(
            'belongsTo' => array(
                'WorknoteProject' => array(
                    'className' => 'WorknoteProject',
                    'foreignKey' => 'worknote_project_id',
                    'type' => 'LEFT'
                )
            ),
            'hasMany' => array(
                'WorknoteRelease' => array(
                    'className' => 'WorknoteRelease',
                    'foreignKey' => 'worknote_id',
                    'order' => 'file',
                    'type' => 'LEFT'
                )
            )
        ));
        $data = $this->Worknote->find('first', array(
            'fields' => array(
                'Worknote.*', 'WorknoteProject.name'
            ),
            'conditions' => array(
                'Worknote.id' => $id,
                'Worknote.user_id' => $this->user_id
            )
        ));
        return $data;
    }

    public function getWorknote () {
        $param = $this->request->data;
        $data = $this->__getWorknoteDetai($param['id']);
        if (count($data > 0)) {
            $data['Worknote']['worknote_project_name'] = (isset($data['WorknoteProject']['name'])) ?
                $data['WorknoteProject']['name'] : '';
            $data = $data['Worknote'];
        }
        return $data;
    }

    public function printView () {
        $this->set('seitetype', 'printview');
        $data = array();
        try {
            $this->checkLogin();
            $data = $this->__getWorknoteDetai($this->request->params['pass'][0]);
        } catch (Exception $e) {
            $this->set('error', $e->getMessage());
        }
        $this->set('worknote', $data);
        $this->set('title_for_layout', $data['Worknote']['title']);
        $this->layout = 'print';
    }

    public function showText () {
        $data = array();
        $text = '';
        try {
            $this->checkLogin();
            $data = $this->Worknote->find('first', array(
                'fields' => array(
                    'Worknote.text'
                ),
                'conditions' => array(
                    'Worknote.id' => $this->request->params['pass'][0],
                    'Worknote.user_id' => $this->user_id
                )
            ));
            if ($data) {
                $text = $data['Worknote']['text'];
            } else {
                $text = 'Not gefund';
            }

        } catch (Exception $e) {
            $text = $e->getMessage();
        }

        $this->set('text', $text);
        $this->layout = 'htmlpage';
    }

    public function delete () {
        $this->checkLogin();
        $worknote_id = $this->request->data('worknote_id');
        $dataModel = ClassRegistry::init('WorknoteRelease');
        $dataModel->deleteAll(array('worknote_id' => $worknote_id));
        $this->Worknote->delete($worknote_id);
     }
}