Ext.define('WWS.model.SchoolClass', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolClass.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolClass.user_id', type: 'int'},
        {name: 'is_default', mapping: 'SchoolClass.is_default', type: 'bool'},
        {name: 'name', mapping: 'SchoolClass.name', type: 'string'},
        {name: 'description', mapping: 'SchoolClass.description', type: 'string'},
        {name: 'icon', mapping: 'SchoolClass.icon', type: 'string'}
    ]
});