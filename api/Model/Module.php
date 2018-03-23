<?php
/**
 * Created by PhpStorm.
 * User: zoubenying
 * Date: 1/12/2016
 * Time: 下午 9:20
 */

class Module extends AppModel {
    public function getUserModules ($user_id=0, $showAlle=true, $mobile=false) {
        $conditions = [
            'Module.visible' => ($showAlle) ? [1, 0] : 1,
            'or' => [
                'ModulesUser.active' => 1,
                'and' => [
                    'ModulesUser.user_id is null',
                    'Module.authorizable' => 0
                ]
            ]
        ];

        if ($mobile) {
            $conditions['Module.mobile_visible'] = 1;
        }

        $data = $this->find('all', [
            'fields' => [
                'Module.id',
                'Module.name',
                'Module.visible',
                'Module.mobile_visible',
                'Module.authorizable',
                'Module.sortorder'
            ],
            'conditions' => $conditions,
            'joins' => [
                [
                    'table' => $this->tableize('ModulesUser'),
                    'alias' => 'ModulesUser',
                    'conditions' => array(
                        'Module.id = ModulesUser.module_id',
                        'ModulesUser.user_id' => $user_id
                    ),
                    'type' => 'left'
                ]
            ],
            'order' => ['Module.sortorder']
        ]);
        $res = array();

        if ($data) {
            foreach($data as $module) {
                $res[] = $module['Module'];
            }
        }

        return $res;
    }
}