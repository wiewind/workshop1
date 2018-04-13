/**
 * Created by benying.zou on 12.04.2018.
 */
Ext.define('WWS.model.Currency',{
    extend: 'WWS.model.Base',
    fields: [
        {name: 'id', mapping: 'Currency.id', type:'int'},
        {name: 'name', mapping: 'Currency.name'},
        {name: 'code', mapping: 'Currency.code'},
        {name: 'symble', mapping: 'Customer.symble'},
        {name: 'active', mapping: 'Customer.active', type:'bool'}
    ]
});