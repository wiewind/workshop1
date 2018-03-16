Ext.define('WWS.model.SchoolCourse', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolCourse.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolCourse.user_id', type: 'int'},
        {name: 'name', mapping: 'SchoolCourse.name', type: 'string'},
        {name: 'default_teacher_id', mapping: 'SchoolCourse.default_teacher_id', type: 'int'},
        {name: 'default_teacher_name', mapping: 'DefaultTeacher.lastname', type: 'string', convert: function(v, rec) {
            return Glb.displayPersonName(v, rec.data['DefaultTeacher']['firstname'], rec.data['DefaultTeacher']['sex']);
        }},
        {name: 'default_room_id', mapping: 'SchoolCourse.default_room_id', type: 'int'},
        {name: 'default_room_name', mapping: 'DefaultRoom.name', type: 'string'},
        {name: 'description', mapping: 'SchoolCourse.description', type: 'string'},
        {name: 'count_every_week', mapping: 'SchoolCourse.count_every_week', type: 'float'}
    ]
});