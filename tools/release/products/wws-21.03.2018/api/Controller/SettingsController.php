<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class SettingsController extends AppController {
    public $components = array(
        'Login',
        'MySession'
    );

    public function setLanguage () {
        $language_id = $this->request->data['language'];
        $langModel = ClassRegistry::init('Language');
        $lang = $langModel->findById($language_id);
        if (!$lang) {
            throw new Exception(__('Setting language failed.'));
        }

        $this->MySession->delete('appLanguage');

        $userModel = ClassRegistry::init('User');
        $userModel->save(array(
            'id' => $this->user_id,
            'language_id' => $language_id
        ));

        $this->MySession->write('user.language_id', $language_id);
        $this->MySession->write('appLanguage', $lang['Language']);
        Configure::write('Config.language', $lang['Language']['cake_code']);

        return Configure::read('Config.language');
    }
}