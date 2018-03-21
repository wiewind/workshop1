Ext.define('WWS.model.SchoolRoom', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolRoom.id', type: 'int'},
        {name: 'user_id', mapping: 'SchoolRoom.user_id', type: 'int'},
        {name: 'name', mapping: 'SchoolRoom.name', type: 'string'},
        {name: 'telephone', mapping: 'SchoolRoom.telephone', type: 'string'},
        {name: 'description', mapping: 'SchoolRoom.description', type: 'string'}
    ]
});