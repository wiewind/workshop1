Ext.define('WWS.model.SchoolPlan', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolPlan.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolCourse.user_id', type: 'int'},

        {name: 'semester_id', mapping: 'SchoolPlan.semester_id', type: 'int'},
        {name: 'semester_name', mapping: 'SchoolSemester.semester', type: 'string', convert: function(v, rec) {
            var term = (Number(v)===1) ? T.__("Winter Term") : T.__("Summer Term");
            return term + ' ' + rec.data['SchoolSemester']['school_year'];
        }},

        {name: 'class_id', mapping: 'SchoolPlan.class_id', type: 'int'},
        {name: 'class_name', mapping: 'SchoolClass.name', type: 'string'},

        {name: 'course_id', mapping: 'SchoolPlan.course_id', type: 'int'},
        {name: 'course_name', mapping: 'SchoolCourse.name', type: 'string'},

        {name: 'teacher_id', mapping: 'SchoolPlan.teacher_id', type: 'int'},
        {name: 'teacher_name', mapping: 'SchoolTeacher.lastname', type: 'string', convert: function(v, rec) {
            return Glb.displayPersonName(v, rec.data['SchoolTeacher']['firstname'], rec.data['SchoolTeacher']['sex']);
        }},

        {name: 'room_id', mapping: 'SchoolPlan.room_id', type: 'int'},
        {name: 'room_name', mapping: 'SchoolRoom.name', type: 'string'},

        {name: 'start', mapping: 'SchoolPlan.start', type: 'string'},
        {name: 'end', mapping: 'SchoolPlan.end', type: 'string'},

        {name: 'weekday', mapping: 'SchoolPlan.weekday', type: 'int'},
        {name: 'period', mapping: 'SchoolPlan.period', type: 'string'},
        {name: 'first_date', mapping: 'SchoolPlan.first_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'description', mapping: 'SchoolPlan.description', type: 'string'}
    ]
});