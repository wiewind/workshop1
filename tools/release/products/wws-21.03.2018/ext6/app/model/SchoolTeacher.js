Ext.define('WWS.model.SchoolTeacher', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolTeacher.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolTeacher.user_id', type: 'int'},
        {name: 'lastname', mapping: 'SchoolTeacher.lastname', type: 'string'},
        {name: 'firstname', mapping: 'SchoolTeacher.firstname', type: 'string'},
        {name: 'sex', mapping: 'SchoolTeacher.sex', type: 'string'},
        {name: 'telephone', mapping: 'SchoolTeacher.telephone', type: 'string'},
        {name: 'birthday', mapping: 'SchoolTeacher.birthday', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'fax', mapping: 'SchoolTeacher.fax', type: 'string'},
        {name: 'email', mapping: 'SchoolTeacher.email', type: 'string'},
        {name: 'address', mapping: 'SchoolTeacher.address', type: 'string'},
        {name: 'photo', mapping: 'SchoolTeacher.photo', type: 'string'},
        {name: 'description', mapping: 'SchoolTeacher.description', type: 'string'},
        {name: 'count_courses', mapping: 'SchoolTeacher.count_courses', type: 'int'}
    ]
});