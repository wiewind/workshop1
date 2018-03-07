Ext.define('WWS.model.SchoolCoursetime', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolCoursetime.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolCoursetime.user_id', type: 'int'},
        {name: 'start', mapping: 'SchoolCoursetime.start', type: 'string'},
        {name: 'end', mapping: 'SchoolCoursetime.end', type: 'string'}
    ]
});