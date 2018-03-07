/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.model.SchoolChild', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'SchoolChild.id', type: 'int'},
        {name: 'class_id', mapping: 'SchoolChild.class_id', type: 'int'},
        {name: 'class_name', mapping: 'SchoolClass.name', type: 'string'},
        {name: 'lastname', mapping: 'SchoolChild.lastname', type: 'string'},
        {name: 'firstname', mapping: 'SchoolChild.firstname', type: 'string'},
        {name: 'sex', mapping: 'SchoolChild.sex', type: 'string'},
        {name: 'birthday', mapping: 'SchoolChild.birthday', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'addresses', mapping: 'SchoolChild.addresses', type: 'string', convert: function(v) {
            return Ext.encode(v);
        }},
        {name: 'telephones', mapping: 'SchoolChild.telephones', type: 'string', convert: function(v) {
            return Ext.encode(v);
        }},
        {name: 'mobiles', mapping: 'SchoolChild.mobilephones', type: 'string', convert: function(v) {
            return Ext.encode(v);
        }}
    ]
});