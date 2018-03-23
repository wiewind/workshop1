/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.model.User',{
    extend: 'WWS.model.Base',
    fields: [
        {name: 'id', mapping: 'User.id', type:'int'},
        {name: 'customer_id', mapping: 'User.customer_id', type:'int'},
        {name: 'active', mapping: 'User.active', type:'bool'},
        {name: 'name', mapping: 'User.name'},
        {name: 'username', mapping: 'User.username'},
        {name: 'wechatname', mapping: 'User.wechatname'},
        {name: 'telephone', mapping: 'User.telephone'},
        {name: 'fax', mapping: 'User.fax'},
        {name: 'email', mapping: 'User.email'},
        {name: 'language_id', mapping: 'User.language_id', type:'int'},
        {name: 'modified', mapping: 'User.modified', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'module_ids', mapping: 'User.module_ids'},
        {name: 'module_names', mapping: 'User.module_names'}
    ]
});