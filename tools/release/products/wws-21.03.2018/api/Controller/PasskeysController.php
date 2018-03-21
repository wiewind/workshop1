<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class PasskeysController extends AppController {
    public $components = array('Auth', 'MySession');

    public $uses = array(
        'PasskeyData',
        'PasskeyGroup'
    );

    public function getGroupData () {
        $this->checkLogin();
        $data = [];
        $group_id = $this->request->data['group_id'];
        if ($this->MySession->check('user.passkeyRoot') && $group_id == $this->MySession->read('user.passkeyRoot.id')) {
            $data = $this->MySession->read('user.passkeyRoot');
        } else {
            $rdata = $this->PasskeyGroup->findById($group_id);
            if ($rdata) {
                $data = [
                    'id' => $rdata['PasskeyGroup']['id'],
                    'name' => $rdata['PasskeyGroup']['name'],
                    'parent_id' => $rdata['PasskeyGroup']['parent_id'],
                    'path' => $this->_getGroupPath($group_id)
                ];
            }
        }
        return $data;
    }

    public function search () {
        $this->checkLogin();
        $options = array(
            'conditions' => array(
                'PasskeyGroup.customer_id' => $this->customer_id,
            )
        );

        if(!empty($this->request->data['searchtext'])) {
            $options['conditions']['or'] = array(
                'PasskeyData.title like' => '%'.$this->request->data['searchtext'].'%',
                'PasskeyData.username like' => '%'.$this->request->data['searchtext'].'%',
                'PasskeyData.url like' => '%'.$this->request->data['searchtext'].'%',
                'PasskeyData.notice like' => '%'.$this->request->data['searchtext'].'%',
                'PasskeyGroup.name like' => '%'.$this->request->data['searchtext'].'%'
            );
        } else {
            throw new Exception(__('Passkey can not be searched without searching text.'), 401);
        }

        $total = $this->PasskeyData->find('count', $options);

        $options['fields'] = array(
            'PasskeyData.*',
            'PasskeyGroup.*'
        );
        $options['order'] = 'LOWER(PasskeyData.title)';

        if(!empty($this->request->query['limit'])) {
            $limit = $this->request->query['limit'];
        } else {
            $limit = Configure::read("maxProSite");
        }
        if(!empty($this->request->query['page'])) {
            $page = $this->request->query['page'];
        } else {
            $page = 0;
        }
        $options['limit'] = $limit;
        $options['page'] = $page;
        $data = $this->PasskeyData->find('all', $options);
        if ($data) {
            for ($i=0; $i<count($data); $i++) {
                $data[$i]['PasskeyData']['password'] = $this->Auth->authcode(
                    $data[$i]['PasskeyData']['password'],
                    'DECODE',
                    Configure::read('auth.key'),
                    0
                );
                $data[$i]['PasskeyGroup']['path'] = $this->_getGroupPath($data[$i]['PasskeyData']['group_id']);
            }
        }
        return [
            'data' => $data,
            'total' => $total
        ];
    }

    protected function _getGroupPath ($group_id) {
        $group = $this->PasskeyGroup->findById($group_id);
        if ($group) {
            if ($group['PasskeyGroup']['parent_id'] > 0) {
                return $this->_getGroupPath($group['PasskeyGroup']['parent_id']) . '/' . $group['PasskeyGroup']['name'];
            }
            return __d('modules', "passkey");
        }
        return '';
    }

    function getGroupMembers () {
        $this->checkLogin();
        $group_id = $this->request->data['group_id'];
        return $this->_getNodes($group_id);
    }

    function getGroupTree () {
        $this->checkLogin();
        $nodeId = str_replace(Configure::read('system.prefix'), '', $this->request->data['node']);

        if ($nodeId == 0) {
            $nodeId = $this->MySession->read('user.passkeyRoot.id');
        }
        return $this->_getNodes($nodeId);
    }

    protected function _getNodes ($parentId = 0) {
        $tmp = $this->PasskeyGroup->find('first', array(
            'conditions' => array(
                'id' => $parentId,
                'customer_id' => $this->customer_id
            )
        ));
        if (!$tmp) {
            ErrorCode::throwExceptionCode(ErrorCode::ErrorCodeUserDenied);
        }
        $res = array();
        $parentPath = $this->_getGroupPath($parentId);
        $groups = $this->PasskeyGroup->find('all', array(
            'conditions' => array(
                'PasskeyGroup.customer_id' => $this->customer_id,
                'PasskeyGroup.parent_id' => $parentId
            ),
            'order' => array('LOWER(PasskeyGroup.name)')
        ));
        if ($groups) {
            foreach ($groups as $group) {
                $group['PasskeyGroup']['path'] = $parentPath . '/' . $group['PasskeyGroup']['name'];
                $res[] = $group;
            }
        }

        $keys = $this->PasskeyData->find('all', array(
            'conditions' => array(
                'PasskeyGroup.customer_id' => $this->customer_id,
                'PasskeyData.group_id' => $parentId
            ),
            'order' => array('LOWER(PasskeyData.title)')
        ));
        if ($keys) {
            foreach ($keys as $key) {
                $key['PasskeyGroup']['path'] = $parentPath;
                $key['PasskeyData']['password'] = $this->Auth->authcode(
                    $key['PasskeyData']['password'],
                    'DECODE',
                    Configure::read('auth.key'),
                    0
                );
                $res[] = $key;
            }
        }
        return $res;
    }

    function save () {
        $this->checkLogin();
        $data = array(
            'title' => $this->request->data['title'],
            'username' => $this->request->data['username']
        );
        if (isset($this->request->data['password2'])) {
            if ($this->request->data['password2'] !== $this->request->data['password']) {
                throw new Exception(__('Password and repeated password are not identical!'));
            }
        }

        $data['password'] = $this->Auth->authcode(
            $this->request->data['password'],
            'ENCODE',
            Configure::read('auth.key'),
            0
        );
        $data['url'] = $this->request->data['url'];
        $data['notice'] = $this->request->data['notice'];
        if ($this->request->data['id'] > 0) {
            $data['id'] = $this->request->data['id'];
        } else {
            $this->PasskeyData->create();
        }
        $data['group_id'] = $this->request->data['group_id'];

        $this->PasskeyData->save($data);
        if ($this->request->data['id'] === 0) {
            $data['id'] = $this->PasskeyData->getLastInsertID();
        }
    }

    function clonePasskey () {
        $this->checkLogin();
        $keys = json_decode($this->request->data['keys']);
        $datas = $this->PasskeyData->find('all', [
            'conditions' => [
                'PasskeyData.id' => $keys
            ]
        ]);
        if (!$datas) {
            throw new Exception(__('This passkey could not be cloned.'));
        }

        foreach ($datas as $data) {
            $this->PasskeyData->create();
            $this->PasskeyData->save(array(
                'title' => $data['PasskeyData']['title'] . '_cloned',
                'group_id' => $data['PasskeyData']['group_id'],
                'url' => $data['PasskeyData']['url'],
                'username' => $data['PasskeyData']['username'],
                'password' => $data['PasskeyData']['password'],
                'notice' => $data['PasskeyData']['notice'],
                'created' => $this->user_id,
                'modified' => $this->user_id
            ));
        }
    }

    function move () {
        $this->checkLogin();
        $draggedNodeId = $this->request->data['draggedNodeId'];
        $targetNodeId = $this->request->data['targetNodeId'];
        $draggedNodeType = $this->request->data['draggedNodeType'];
        if ($targetNodeId == 0) {
            $targetNodeId = null;
        }
        if ($draggedNodeType === 'key') {
            $this->PasskeyData->save([
                'id' => $draggedNodeId,
                'group_id' => $targetNodeId,
                'modified_by' => $this->user_id
            ]);
        } else {
            $this->PasskeyGroup->save([
                'id' => $draggedNodeId,
                'parent_id' => $targetNodeId,
                'modified_by' => $this->user_id
            ]);
        }
    }

    function saveGroup () {
        $this->checkLogin();
        $data['name'] = $this->request->data['name'];
        if (isset($this->request->data['oldname']) && $this->request->data['oldname'] === $data['name']) {
            throw new Exception(__('The new name is equal to the old.'));
        }
        $data['customer_id'] = $this->customer_id;
        if (isset($this->request->data['parent_id']) && $this->request->data['parent_id'] > 0) {
            $data['parent_id'] = $this->request->data['parent_id'];
        }
        if (isset($this->request->data['id']) && $this->request->data['id'] > 0) {
            $data['id'] = $this->request->data['id'];
        } else {
            $this->PasskeyGroup->create();
        }



        $this->PasskeyGroup->save($data);
    }

    function deleteGroup () {
        $this->checkLogin();
        $group_id = $this->request->data['group_id'];
        if ($group_id > 0) {
            $this->_deleteGroup($group_id);
        }
    }

    protected function _deleteGroup ($group_id) {
        $childrenGroups = $this->PasskeyGroup->find('all', array(
            'fields' => array('id'),
            'conditions' => array(
                'parent_id' => $group_id,
                'customer_id' => $this->customer_id
            )
        ));
        if ($childrenGroups) {
            foreach ($childrenGroups as $cg) {
                $this->_deleteGroup($cg['PasskeyGroup']['id']);
            }
        }
        $this->PasskeyData->deleteAll(array(
            'group_id' => $group_id
        ));
        $this->PasskeyGroup->delete($group_id);
    }

    function delete () {
        $this->checkLogin();
        $id = $this->request->data['id'];
        $this->PasskeyData->delete($id);
    }

    function mixDelete () {
        $this->checkLogin();

        $items = $this->request->data['items'];
        $items = json_decode($items);
        if ($items->groups) {
            $groups = $this->PasskeyGroup->find('all', [
                'fields' => ['PasskeyGroup.id'],
                'conditions' => [
                    'PasskeyGroup.customer_id' => array(0, $this->customer_id),
                    'PasskeyGroup.id' => $items->groups
                ]
            ]);
            if ($groups) {
                foreach ($groups as $group) {
                    $this->_deleteGroup($group['PasskeyGroup']['id']);
                }
            }
        }
        if ($items->keys) {
            $this->PasskeyData->deleteAll(array(
                'PasskeyData.id' => $items->keys
            ));
        }
    }
}