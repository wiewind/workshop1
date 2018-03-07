<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 05.02.2018
 * Time: 11:08
 */

class SearchPageController extends AppController {
    //insert into wsp_search_pages select id, title, text, sort, utime, 1, utime, 1 from search_seite;

    public $components = [
        'Login'
    ];

    public $uses = [
        'SearchPage',
        'Hotlink'
    ];

    public function getMenus () {
        $user_id = ($this->Login->checkLogin()) ? $this->MySession->read('user.id') : 0;

        $data = $this->SearchPage->find('all', [
            'fields' => 'id, title',
            'conditions' => [
                'or' => [
                    'publish' => 1,
                    'created_by' => $user_id
                ]
            ],
            'order' => ['sort']
        ]);
        if (!$data) return [];
        return $data;
    }

    public function getContent () {
        $user_id = ($this->Login->checkLogin()) ? $this->MySession->read('user.id') : 0;
        $id = $this->request->data['id'];
        if ($id > 0) {
            $data = $this->SearchPage->find('first', [
                'conditions' => [
                    'id' => $id,
                    'or' => [
                        'publish' => 1,
                        'created_by' => $user_id
                    ]
                ]
            ]);
            if ($data) {
                return $data['SearchPage'];
            }
        } else if ($id == -1) {
            $data = $this->Hotlink->find('all', [
                'order' => ['seite', 'sort']
            ]);
            if ($data) {
                $text = '';
                foreach ($data as $d) {
                    $text .= '<h3>' . $d['Hotlink']['title'] . '</h3><p>' . $d['Hotlink']['text'] . '</p>';
                }
                return [
                    'id' => $id,
                    'title' => __('Hotlinks'),
                    'text' => $text
                ];
            }
        }
        return [];
    }

    public function getHotlinks () {
        $data = $this->Hotlink->find('all', [
            'order' => ['seite', 'sort']
        ]);

        $res = [];
        if ($data) {
            foreach ($data as $d) {
                $res[$d['Hotlink']['seite']][] = $d['Hotlink'];
            }
        }

        return $res;
    }

    public function getHotlink () {
        $this->checkLogin();
        $data = $this->Hotlink->findById($this->request->data['id']);
        if ($data) {
            $data = $data['Hotlink'];
        }
        return $data;
    }

    public function savePage () {
        $this->checkLogin();
        $data = $this->request->data;
        $id = intval($data['id']);

        if ($id === 0) {
            $data['created_by'] = $this->MySession->read('user.id');
            unset($data['id']);
            $this->SearchPage->create();
        }
        $data['modified_by'] = $this->MySession->read('user.id');
        $this->SearchPage->save($data);
        if ($id === 0) {
            $data['id'] = $this->SearchPage->getLastInsertID();
        }
        return $data;
    }

    public function deletePage () {
        $this->checkLogin();
        $id = $this->request->data['id'];
        $this->SearchPage->delete($id);
        return $id;
    }

    public function saveHotlink () {
        $data = $this->request->data;
        $id = intval($data['id']);
        if ($id === 0) {
            $data['created_by'] = $this->MySession->read('user.id');
            unset($data['id']);
            $this->Hotlink->create();
        }
        $data['modified_by'] = $this->MySession->read('user.id');
        $this->Hotlink->save($data);
        if ($id === 0) {
            $data['id'] = $this->Hotlink->getLastInsertID();
        }
        return $this->getHotlinks();
    }
}