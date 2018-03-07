<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 02.10.2017
 * Time: 13:00
 */

class SchoolChild extends AppModel {
    var $hasMany = array(
        'telephones' => array(
            'className' => 'SchoolChildrenTelephone',
            'foreignKey' => 'child_id'
        ),

        'mobilephones' => array(
            'className' => 'SchoolChildrenMobilephone',
            'foreignKey' => 'child_id'
        ),

        'addresses' => array(
            'className' => 'SchoolChildrenAddress',
            'foreignKey' => 'child_id'
        )
    );
}