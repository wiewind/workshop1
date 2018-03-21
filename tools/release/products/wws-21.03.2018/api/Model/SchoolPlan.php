<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 20.09.2017
 * Time: 15:13
 */

class SchoolPlan extends AppModel {
    var $belongsTo = array(
        'SchoolSemester' => array(
            'className' => 'SchoolSemester',
            'foreignKey' => 'semester_id'
        ),

        'SchoolClass' => array(
            'className' => 'SchoolClass',
            'foreignKey' => 'class_id'
        ),

        'SchoolCourse' => array(
            'className' => 'SchoolCourse',
            'foreignKey' => 'course_id'
        ),

        'SchoolTeacher' => array(
            'className' => 'SchoolTeacher',
            'foreignKey' => 'teacher_id'
        ),

        'SchoolRoom' => array(
            'className' => 'SchoolRoom',
            'foreignKey' => 'room_id'
        )
    );
}