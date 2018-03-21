<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::import('Core', 'l10n');
App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */

class AppController extends Controller {

    public $components = array(
        'RequestHandler',
        'Login',
        'MySession',
        "Session",
        'MyCookie',
        'Cookie',
        'Paginator'
    );

    var $helpers = array(
        'Html',
        'Form',
        'Js'
    );

    public $uses = array(
        'Version',
        'UserEvent',
        'Language',
        'Module'
    );

    public $allow = array(
        'admin/backup',
        'filemanagement/getfile'
    );

    public $logged = false;

    function beforeFilter () {
//        if (Configure::read('system.brand') === 'live') {
//            Configure::write('debug', 0);
//        }

        if ($this->Login->checkLogin()) {
            $this->logged = true;
            $this->user_id = intval($this->MySession->read('user.id'));
            $this->set('user_id', $this->user_id);
            $this->customer_id = intval($this->MySession->read('customer.id'));
            $this->set('customer_id', $this->customer_id);
        }

        $this->__setPageLanguage();

        //-------------------------

        parent::beforeFilter();
    }

    // -------- i18 -------------------
    private function __setPageLanguage () {
        $lang = 'zho';
        if ($this->MySession->check('appLanguage')) {
            $lang = $this->MySession->read('appLanguage.cake_code');
        } else {
            if ($this->MySession->check('user')) {
                $app_language_id = $this->MySession->read('user.language_id');
                $langs = $this->Language->findById($app_language_id);
                $lang = $langs['Language']['cake_code'];
            } else if (Configure::check('system.defaultLanguage.cake_code')) {
                $lang = Configure::read('system.defaultLanguage.cake_code');
            }
        }
        Configure::write('Config.language', $lang);
        $this->MySession->write('formatting', Configure::read('Glb.formatting.' . $lang));

    }



    function checkLogin () {
        if (!$this->logged) {
            ErrorCode::throwExceptionCode(ErrorCode::ErrorCodeUserDenied);
        }
    }

    function afterFilter() {
        if ($this->logged) {
            // save Event
            if ($this->isEvent()) {
                $user_id = $this->user_id;
                $this->UserEvent->save(array(
                    'user_id' => $user_id,
                    'event' => $this->request->url,
                    'session_id' => $this->MySession->id(),
                    'ip' => $this->get_client_ip(),
                    'time' => date('Y-m-d H:i:s')
                ));
                if (strtolower($this->request->params['action']) === 'logout') {
                    $this->MySession->delete();
                }
            }

            // reset cookie
            if ($this->Login->checkCookieKeepLogged()) {
                $this->MyCookie->write('keepLogged', $this->MyCookie->read('keepLogged'));
                $this->MyCookie->write('username', $this->MySession->read('user.username'));
            }
        }

        parent::afterFilter();
    }

    private function isEvent () {
        if (!$this->logged) return false;

        $action = strtolower($this->request->params['action']);
        $toSaveAction = array('login', 'logout', 'save', 'delete', 'search', 'set');
        foreach ($toSaveAction as $aAction) {
            if (strpos($action, $aAction) !== false) return true;
        }

        return false;
    }

    function get_client_ip() {
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

    public function json () {
        $args = func_get_args();
        $fn_name = (count($args) > 0) ? $args[0] : false;
        array_splice($args, 0, 1);

        $result = array(
            'data' => [],
            'message' => '',
            'success' => true,
            'code' => 200
        );
        if ($fn_name) {
            try {
                $r = call_user_func_array(array($this, $fn_name), $args);
                if (is_array($r) && isset($r['data'])) $result = array_merge($result, $r);
                else $result['data'] = $r;
            } catch (Exception $e) {
                $result['success'] = false;
                $result['message'] = $e->getMessage();
                $result['code'] = $e->getCode();
            }
        }

        $this->set('result', $result);
        $this->layout = 'ajax';
        $this->render ('/Json/output');
    }

    public function transjson () {
        $args = func_get_args();
        $fn_name = (count($args) > 0) ? $args[0] : false;
        array_splice($args, 0, 1);

        $result = array(
            'data' => [],
            'message' => '',
            'success' => true,
            'code' => 200
        );
        if ($fn_name) {
            $dataSource = ClassRegistry::init('User')->getDataSource();
            $dataSource->begin();
            try {
                $r = call_user_func_array(array($this, $fn_name), $args);
                if (is_array($r) && isset($r['data'])) $result = array_merge($result, $r);
                else $result['data'] = $r;
                $dataSource->commit();
            } catch (Exception $e) {
                $dataSource->rollback();
                $result['success'] = false;
                $result['message'] = $e->getMessage();
                $result['code'] = $e->getCode();
            }
        }

        $this->set('result', $result);
        $this->layout = 'ajax';
        $this->render ('/Json/output');
    }

    protected function _translateTo ($msg, $languageId) {
        $webLanguage = Configure::read('Config.language');
        Configure::write('Config.language', $this->MySession->readConfig('languages.' . $languageId . '.cake_code'));
        $res = __($msg);
        Configure::write('Config.language', $webLanguage);
        return $res;
    }
}