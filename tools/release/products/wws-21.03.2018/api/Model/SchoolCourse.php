<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 25.09.2017
 * Time: 11:51
 */

class SchoolCourse extends AppModel {
    var $belongsTo = array(
        'DefaultTeacher' => array(
            'className' => 'SchoolTeacher',
            'foreignKey' => 'default_teacher_id'
        ),

        'DefaultRoom' => array(
            'className' => 'SchoolRoom',
            'foreignKey' => 'default_room_id'
        )
    );
}