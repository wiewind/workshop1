<?php

/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 23.11.2016
 * Time: 15:35
 */
class UsersController extends AppController
{
    public $uses = array(
        'User',
        'Module',
        'ModulesUser'
    );
    public $components = array(
        'Auth'
    );

    private $__temp_psd = '1111';
    private $__temp_actcode_new_user = 'new_user';

    public function getCustomerUsers () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => ''
        );
        try {
            $conditions = array(
                'User.customer_id' =>  $this->request->query['customer_id']
            );

            if (isset($this->request->query['active']) && $this->request->query['active'] !== 'all') {
                $conditions['User.active'] = $this->request->query['active'];
            }

            $result['total'] = $this->User->find('count', array(
                'conditions' => $conditions
            ));

            $data = $this->User->find('all', array(
                'conditions' => $conditions,
                'order' => 'LOWER(User.name)',
                'limit' => $this->request->query['limit'],
                'page' => $this->request->query['page']
            ));
            if ($data) {
                for ($i=0; $i<count($data); $i++) {
                    $modules = $this->Module->getUserModules($data[$i]['User']['id'], false);
                    $data[$i]['User']['module_ids'] = implode(';', Hash::extract($modules, '{n}.id'));
                    $data[$i]['User']['module_names'] = implode(';', Hash::extract($modules, '{n}.name'));
                    unset($data[$i]['User']['password']);
                }
                $result['data'] = $data;
            }
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    public function save () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $modules = [];
            foreach ($this->request->data['modules'] as $module_id => $validate) {
                if ($validate) {
                    $modules[] = $module_id;
                }
            }
            if (!$modules) {
                throw new Exception(__('The user has no modules!'));
            }

            $udata = $this->request->data['User'];
            if (!$udata['name'] || ($udata['id'] == 0 && !$udata['username']) || !$udata['email']) {
                throw new Exception(__('The information of user was not complete!'));
            }

            $dataSource = $this->User->getDataSource();
            $dataSource->begin();
            try {
                if ($udata['id'] == 0) {
                    unset($udata['id']);
                    $udata['created_by'] = $this->user_id;
                    $udata['password'] = $this->__temp_psd;
                    $udata['actioncode'] = $this->__temp_actcode_new_user;
                    $this->User->create();
                }
                $udata['modified_by'] = $this->user_id;
                $this->User->save($udata);
                $user_id = $this->User->id;

                // save module
                $this->ModulesUser->deleteAll(array(
                    'user_id' => $user_id
                ));
                foreach ($modules as $module_id) {
                    $this->ModulesUser->create();
                    $this->ModulesUser->save(array(
                        'user_id' => $user_id,
                        'module_id' => $module_id,
                        'active' => 1
                    ));
                }
                $dataSource->commit();
            } catch (Exception $e) {
                $dataSource->rollback();
                throw $e;
            }
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    public function deleteUser () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $udata = $this->User->findById($this->request->data['id']);
            if ($udata['User']['active']) {
                throw new Exception(__('An active user can not be deleted, please block the user first!'));
            }
            $this->User->deleteUsers($this->request->data['id']);
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    public function setActive () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $id = $this->request->data['id'];
            $active = $this->request->data['active'];

            $udata = $this->User->findById($id);
            if (!$udata) {
                throw new Exception(__('The user does not exist.'));
            }

            if ($active && $this->__isNewCreateUser($udata)) {
                $this->__sendPassword($udata);
            }

            $this->User->save(array(
                'id' => $id,
                'active' => ($active) ? 1 : 0
            ));

        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    private function __sendPassword ($userData) {
        $password = $this->Auth->makeTempPassword($userData['User']);
        $Email = new CakeEmail();
        $Email->from(Configure::read('email.admin'));
        $Email->to($userData['User']['email']);
        $Email->bcc(Configure::read('email.backup'));
        $Email->subject(sprintf(_('Welcome %s'), $userData['User']['name']));
        $Email->emailFormat('html');
        $Email->theme($userData['User']['language_id']);
        $Email->template('maketemppassword', 'infomail');
        $Email->viewVars(array(
            'user' =>$userData['User'],
            'password' => $password,
            'isNewUser' => true
        ));
        $Email->send();
    }

    public function changeUsername () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $id = $this->request->data['id'];
            $username = $this->request->data['username'];

            $udata = $this->User->findById($id);
            if (!$udata) {
                throw new Exception(__('The user does not exist.'));
            }

            $udata['User']['username'] = $username;

            if (!$udata['User']['active']) {
                $this->User->save(array(
                    'id' => $id,
                    'username' => $username,
                    'password' => $this->__temp_psd,
                    'actioncode' => $this->__temp_actcode_new_user
                ));
            } else {
                $this->__sendPassword($udata);
                $this->User->save(array(
                    'id' => $id,
                    'username' => $username
                ));
            }





        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    private function __isNewCreateUser ($udata) {
        return $udata['User']['password'] === $this->__temp_psd && $udata['User']['actioncode'] === $this->__temp_actcode_new_user;
    }
}