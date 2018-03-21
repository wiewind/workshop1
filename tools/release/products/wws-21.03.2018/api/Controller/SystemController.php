<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 01.03.2017
 * Time: 14:05
 */
Class SystemController extends AppController {

    public $components = array(
        'Login',
        'MySession',
        'MyCookie'
    );

    public $uses = array(
        'Version',
        'UserEvent',
        'Language',
        'Module',
        'PasskeyGroup'
    );

    public function initApp () {
        // NOTICE: To be safe, we don`t cache here regarding IE9 issue
        $this->disableCache();

        if ($this->logged) {
            $username = $this->MySession->read('user.username');
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
            $this->Login->fillSession($udata);
        }

        // setVersion
        $version = $this->getVersion();
        $this->MySession->writeConfig('version', $version);

        $this->__setLanguage1();
        $this->__setModules();

        if ($this->MySession->checkAll()) {
            $res['session'] = $this->MySession->readAll();
        }

        $res['errorCode'] = $this->__setErrorCode();

        $localeSript = sprintf("../resources/js/locale/ext-locale-%s.js", $this->MySession->read('appLanguage.ext_localname'));
        $this->set('localeSript', $localeSript);
        $this->set('session', $res['session']);
        $this->set('errorCode', $res['errorCode']);

        $this->layout = 'ajax';
    }

    public function getVersion () {
        $version = $this->Version->find('first', [
            'order' => 'id desc'
        ]);
        $version['Version']['year'] = substr($version['Version']['date'], 0, 4);
        return $version['Version'];
    }

    private function __setLanguage1 () {
        $this->MySession->deleteConfig('languages');
        $this->MySession->delete('appLanguage');

        $app_language = Configure::read('Config.language');
        $app_language_id = 1;

        $langs = $this->Language->find('all', [
            'order' => 'id'
        ]);
        $languages = [];
        foreach($langs as $l) {
            $languages[$l['Language']['id']] = $l['Language'];
            if ($l['Language']['cake_code'] === $app_language) {
                $app_language_id = $l['Language']['id'];
            }
        }

        $this->MySession->writeConfig('languages', $languages);
        $this->MySession->write('appLanguage', $languages[$app_language_id]);
    }

    private function __setModules () {
        $this->MySession->deleteConfig('modules');
        $this->MySession->delete('userModules');

        $ms = $this->Module->find('all', [
            'fields' => [
                'Module.id',
                'Module.name',
                'Module.visible',
                'Module.mobile_visible',
                'Module.authorizable',
                'Module.sortorder'
            ],
            'order' => 'Module.sortorder'
        ]);
        $systemsModules = [];
        if ($ms) {
            foreach($ms as $module) {
                $module['Module']['text'] = __d('modules', $module['Module']['name']);
                $systemsModules[$module['Module']['name']] = $module['Module'];
            }
        }
        $this->MySession->writeConfig('modules', $systemsModules);

        $user_id = $this->logged ? $this->MySession->read('user.id') : 0;
        $userModules = $this->Module->getUserModules($user_id, false);
        $this->MySession->write('userModules', $userModules);
        $userMobileModules = $this->Module->getUserModules($user_id, false, true);
        $this->MySession->write('userMobileModules', $userMobileModules);

        if (in_array('passkey', $userModules) || in_array('passkey', $userMobileModules)) {
            $this->__setPasskeyRoot($this->customer_id);
        }
    }

    private function __setPasskeyRoot ($customer_id) {
        $rdata = $this->PasskeyGroup->find('first', [
            'conditions' => [
                'customer_id' => $customer_id,
                'parent_id' => 0
            ]
        ]);
        if ($rdata) {
            $rdata = $rdata['PasskeyGroup'];
        } else {
            $rdata = [
                'customer_id' => $customer_id,
                'parent_id' => 0,
                'name' => 'root_' . GlbF::intToStringWithLeadingZeros($this->customer_id, 10)
            ];
            $this->PasskeyGroup->create();
            $this->PasskeyGroup->save($rdata);
            $rdata['id'] = $this->PasskeyGroup->getLastInsertId();
        }
        $data = [
            'id' => $rdata['id'],
            'name' => __d('modules',"passkey"),
            'parent_id' => 0,
            'path' => __d('modules', "passkey")
        ];
        $this->MySession->write('user.passkeyRoot', $data);
    }

    private function __setErrorCode () {
        $errorCodeClass = new ReflectionClass('ErrorCode');
        $codes = $errorCodeClass->getConstants();
        $msgs[0] = ErrorCode::getExceptionMessage(0);
        foreach ($codes as $code) {
            $msgs[$code] = ErrorCode::getExceptionMessage($code);
        }
        return array_merge($codes, ['messages' => $msgs]);
    }

    public function keeplive () {
        if (!$this->logged) {
            ErrorCode::throwExceptionCode(ErrorCode::ErrorCodeSessionTimeout);
        }
        return true;
    }
}