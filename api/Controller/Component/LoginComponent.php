<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 01.12.2016
 * Time: 11:14
 */

App::uses('Component', 'Controller');

class LoginComponent extends Component {

    var $components = array('MySession', 'MyCookie', 'Auth');

    public function checkLoginData ($username, $password) {
        $userModel = ClassRegistry::init('User');
        $userModel->bindModel([
            'belongsTo' => [
                'Customer' => [
                    'className' => 'Customer',
                    'foreignKey' => 'customer_id'
                ]
            ]
        ]);
        $udata = $userModel->find('first', [
            'conditions' => [
                'username' => $username,
                'active' => 1
            ]
        ]);

        if (!$udata) {
            throw new Exception(__('Username is not exist, please try again.'));
        }
        if (!$this->Auth->checkPassword($udata['User'], $password)) {
            throw new Exception(__('Invalid password, please try again.'));
        }
        $this->fillSession($udata);
        return $udata;
    }

    public function fillSession ($udata) {
        $this->MySession->delete('customer');
        $this->MySession->delete('user');
        $this->MySession->delete('appLanguage');
        $this->MySession->delete('userModules');

        $this->MySession->write('customer', array(
            'id' => $udata['Customer']['id'],
            'name' => $udata['Customer']['name']
        ));

        $this->MySession->write('user', array(
            'id' => $udata['User']['id'],
            'username' => $udata['User']['username'],
            'name' => $udata['User']['name'],
            'email' => $udata['User']['email'],
            'psw_free' => $udata['User']['psw_free'],
            'language_id' => $udata['User']['language_id']
        ));
    }

    public function loginOnlyWithUsername ($username) {
        $userModel = ClassRegistry::init('User');
        $userModel->bindModel(array(
            'belongsTo' => array(
                'Customer' => array(
                    'className' => 'Customer',
                    'foreignKey' => 'customer_id'
                )
            )
        ));
        $udata = $userModel->find('first', array(
            'conditions' => array(
                'username' => $username,
                'active' => 1
            )
        ));

        if (!$udata) {
            throw new Exception(__('Username is not exist, please try again.'));
        }
        $this->fillSession($udata);
        return $udata;
    }

    public function checkModule ($modulename) {
        if ($this->MySession->check('userModules')) {
            return in_array($modulename, $this->MySession->read('userModules'));
        }
        return false;
    }

    public function checkCookieKeepLogged () {
        if ($this->MyCookie->check('keepLogin') && intval($this->MyCookie->read('keepLogin')) === 1 && $this->MyCookie->check('username')) {
            return true;
        }
        return false;
    }

    public function checkLogin () {
        $return = $this->MySession->check('user.id');
        if (!$return) {
            if ($this->checkCookieKeepLogged()) {
                $username = $this->MyCookie->read('username');
                $this->loginOnlyWithUsername($username);
                $this->MySession->write('loginFromCookie', true);
                $return = true;
            }
        }
        return $return;
    }

    public function logout () {
        $this->MySession->deleteUserSession();
        $this->MyCookie->deleteAll();
    }
}