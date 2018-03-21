<?php

/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 23.11.2016
 * Time: 15:35
 */
class LoginController extends AppController
{
    public $components = array(
        'Login',
        'Auth',
        'MySession'
    );

    public function dologin() {
        if ($this->logged) {
            $this->logged = false;
            $this->Login->logout();
        }

        $result = [];

        $username = $this->request->data['username'];
        $password = $this->request->data['password'];

        $userData = $this->Login->checkLoginData($username, $password);
        if (!$userData) {
            throw new Exception(__('Failure of the login, please try again.'));
        }


        $this->logged = true;
        $this->user_id = intval($this->MySession->read('user.id'));
        $this->set('user_id', $this->user_id);
        $this->customer_id = intval($this->MySession->read('customer.id'));
        $this->set('customer_id', $this->customer_id);

        $keepLogged = isset($this->request->data['keepLogged']) && $this->request->data['keepLogged']==='true';
        if ($keepLogged) {
            $this->MyCookie->write('keepLogged', 1);
            $this->MyCookie->write('username', $username);
        } else {
            $this->MyCookie->delete('keepLogged');
        }

        $result['user'] = $this->MySession->read('user');

        if ($userData['User']['psw_free']) {
            if ($this->MySession->check('directurl')) {
                $result['directurl'] = $this->MySession->read('directurl');
                $this->MySession->delete('directurl');
            }
        } else {
            $result['directurl'] = $this->_makeUserActionUrl($userData['User']['id'], 'resetPassword');
        }

        return $result;
    }

    public function dologout () {
        if ($this->logged) {
            $this->Login->logout();
        }
    }

    public function forgetpassword () {
        $this->set('loginMsg', $this->Session->read('wsp.data.msg'));
        $this->Session->delete('wsp.sys.msg');
        $this->layout = 'login';
    }

    protected function _makeUserActionUrl ($userId, $action) {
        $actioncode = GlbF::getRandomZifferStr(30);
        $userModel = ClassRegistry::init('User');
        $userModel->save(array(
            'id' => $userId,
            'actioncode' => $actioncode
        ));
        $hashaction = $this->Auth->encodeHashAction($userId, 'User.id', $action, $actioncode);
        return Configure::read('system.projUrl') . '/' . Configure::read('system.api.dirname') . '/login/action/' . $hashaction;
    }

    public function makeResetPasswordMail () {
        $username = $this->request->data['username'];
        if (!$username) {
            throw new Exception(__('False username!'));
        }
        $userModel = ClassRegistry::init('User');
        $userData = $userModel->find('first', array(
            'conditions' => array(
                'username' => $username,
                'active' => 1
            )
        ));
        if (!$userData) {
            throw new Exception(__('False username!'));
        }
        Configure::write('Config.language', Configure::read('Glb.languages.'.$userData['User']['language_id'].'.cake_code'));

        $url = $this->_makeUserActionUrl($userData['User']['id'], 'makeTempPassword');

        $Email = new CakeEmail();
        $Email->from(Configure::read('email.admin'));
        $Email->to($userData['User']['email']);
        $Email->subject(__('Reset Your Password'));
        $Email->emailFormat('html');
        $Email->theme($userData['User']['language_id']);
        $Email->template('makeresetpassword', 'infomail');
        $Email->viewVars(array(
            'user' =>$userData['User'],
            'url' => $url
        ));
        $Email->send();

        return [
            'username' => $userData['User']['username'],
            'name' => $userData['User']['name']
        ];
    }

    public function action () {
        $this->layout = 'login';
        try {
            $this->set('version', $this->MySession->readConfig('version'));
            $hashaction = str_replace($this->request->params['controller'].'/'.$this->request->params['action'].'/', '', $this->request->url);
            $hashaction = $this->Auth->decodeHashAction($hashaction);
            if (!$hashaction) {
                throw new Exception(__('This url is expired!'));
            }

            switch ($hashaction['action']) {
                case 'makeTempPassword':
                    $this->_makeTempPassword($hashaction['key']);
                    return;

                case 'resetPassword':
                    $this->_resetpassword($hashaction['key']);
                    return;
            }
        } catch (Exception $e) {
            $this->set('info', $e->getMessage());
        }

        $this->render('info');
    }

    protected function _makeTempPassword ($id) {
        $userModel = ClassRegistry::init('User');
        $userData = $userModel->find('first', array(
            'conditions' => array(
                'id' => $id,
                'active' => 1
            )
        ));
        if (!$userData || strlen($userData['User']['actioncode']) === 0) {
            throw new Exception(__('This url is expired!'));
        }
        $tempPassword = $this->Auth->makeTempPassword($userData['User']);

        $Email = new CakeEmail();
        $Email->from(Configure::read('email.admin'));
        $Email->to($userData['User']['email']);
        $Email->subject(__('New Password'));
        $Email->emailFormat('html');
        $Email->theme($userData['User']['language_id']);
        $Email->template('maketemppassword', 'infomail');
        $Email->viewVars(array(
            'user' =>$userData['User'],
            'password' => $tempPassword
        ));
        $Email->send();

        $this->set('info', __('The new password was sent to your email address!'));
        $this->render('info');
    }

    protected function _resetpassword ($id) {
        $userModel = ClassRegistry::init('User');
        $userData = $userModel->find('first', array(
            'conditions' => array(
                'id' => $id,
                'active' => 1
            )
        ));
        if (!$userData || strlen($userData['User']['actioncode']) === 0) {
            throw new Exception(__('This url is expired!'));
        }
        Configure::write('Config.language', Configure::read('Glb.languages.'.$userData['User']['language_id'].'.cake_code'));
        $this->set('user', $userData['User']);
        $this->render('resetpassword');
    }

    public function doResetPassword () {
        $user_id = $this->request->data['user_id'];
        $model = ClassRegistry::init('User');
        $userData = $model->find('first', array(
            'conditions' => array(
                'id' => $user_id,
                'active' => 1
            )
        ));
        $lang_id = ($userData) ? $userData['User']['language_id'] : 1;
        Configure::write('Config.language', Configure::read('Glb.languages.'.$lang_id.'.cake_code'));
        if (!$userData) {
            throw new Exception(__('Failure by resetting password!'));
        }
        $password = $this->Auth->decodePassword($userData['User'], $this->request->data['password']);
        $model->save(array(
            'id' => $user_id,
            'password' => $password,
            'actioncode' => '',
            'psw_free' => 1,
            'modified_by' => $user_id
        ));
        if ($this->MySession->check('directurl')) {
            $result['directurl'] = $this->MySession->read('directurl');
            $this->MySession->delete('directurl');
        }
    }
}