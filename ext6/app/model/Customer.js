/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.model.Customer',{
    extend: 'WWS.model.Base',
    fields: [
        {name: 'id', mapping: 'Customer.id', type:'int'},
        {name: 'name', mapping: 'Customer.name'},
        {name: 'street', mapping: 'Customer.street'},
        {name: 'no', mapping: 'Customer.no'},
        {name: 'postcode', mapping: 'Customer.postcode'},
        {name: 'town', mapping: 'Customer.town'},
        {name: 'modified', mapping: 'Customer.modified', type:'date', dateFormat:'Y-m-d H:i:s'}
    ]
});