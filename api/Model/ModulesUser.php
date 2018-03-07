<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 08.12.2016
 * Time: 14:47
 */
class ModulesUser extends AppModel {
    public function saveIt ($data) {
        $r = $this->find('first', array(
            'conditions' => array(
                'user_id' => $data['user_id'],
                'module_id' => $data['module_id']
            )
        ));
        if ($r) {
            $data['id'] = $r['ModulesUser']['id'];
        } else {
            $this->create();
        }
        $this->save($data);
    }
}