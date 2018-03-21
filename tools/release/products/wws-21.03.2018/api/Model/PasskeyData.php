<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 20.12.2016
 * Time: 09:42
 */

class PasskeyData extends AppModel {
//    public $useTable = 'passkey_datas';

    var $belongsTo = array(
        'PasskeyGroup' => array(
            'className' => 'PasskeyGroup',
            'foreignKey' => 'group_id'
        )
    );
}