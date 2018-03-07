Ext.define('WWS.model.SchoolPlan', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolPlan.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolCourse.user_id', type: 'int'},

        {name: 'course_id', mapping: 'SchoolPlan.course_id', type: 'int'},
        {name: 'course_name', mapping: 'SchoolCourse.name', type: 'string'},

        {name: 'teacher_id', mapping: 'SchoolPlan.teacher_id', type: 'int'},
        {name: 'teacher_name', mapping: 'SchoolTeacher.lastname', type: 'string', convert: function(v, rec) {
            return SchoolFn.buildDisplayPersonName(v, rec.raw['SchoolTeacher']['firstname'], rec.raw['SchoolTeacher']['sex']);
        }},

        {name: 'room_id', mapping: 'SchoolPlan.room_id', type: 'int'},
        {name: 'room_name', mapping: 'SchoolRoom.name', type: 'string'},

        {name: 'coursetime_id', mapping: 'SchoolPlan.coursetime_id', type: 'int'},
        {name: 'coursetime_start', mapping: 'SchoolCoursetime.start', type: 'string'},
        {name: 'coursetime_end', mapping: 'SchoolCoursetime.end', type: 'string'},

        {name: 'weekday', mapping: 'SchoolPlan.weekday', type: 'int'},
        {name: 'period', mapping: 'SchoolPlan.period', type: 'string'},
        {name: 'first_date', mapping: 'SchoolPlan.first_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'description', mapping: 'SchoolPlan.description', type: 'string'}
    ]
});