<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 20.09.2017
 * Time: 15:13
 */

class SchoolPlan extends AppModel {
    var $belongsTo = array(
        'SchoolCourse' => array(
            'className' => 'SchoolCourse',
            'foreignKey' => 'course_id'
        ),

        'SchoolTeacher' => array(
            'className' => 'SchoolTeacher',
            'foreignKey' => false,
            'conditions' => [
                'or' => [
                    'SchoolPlan.teacher_id = SchoolTeacher.id',
                    'SchoolPlan.teacher_id = 0 and SchoolCourse.default_teacher_id = SchoolTeacher.id'
                ]
            ]
        ),

        'SchoolRoom' => array(
            'className' => 'SchoolRoom',
            'foreignKey' => false,
            'conditions' => [
                'or' => [
                    'SchoolPlan.room_id = SchoolRoom.id',
                    'SchoolPlan.room_id = 0 and SchoolCourse.default_room_id = SchoolRoom.id'
                ]
            ]
        ),

        'SchoolCoursetime' => array(
            'className' => 'SchoolCoursetime',
            'foreignKey' => 'coursetime_id'
        )
    );
}