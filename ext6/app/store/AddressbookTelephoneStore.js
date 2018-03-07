/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.store.AddressbookTelephone', {
    extend: 'WWS.store.Base',
    alias: 'store.addressbooktelephonestore',
    fields: [
        {name: 'id', mapping: 'AddressbookTelephone.id', type: 'int'},
        {name: 'person_id', mapping: 'AddressbookTelephone.person_id', type: 'int'},
        {name: 'title', mapping: 'AddressbookTelephone.title'},
        {name: 'number', mapping: 'AddressbookTelephone.number'}
    ],
    autoSync: true,
    proxy: {
        api: {
            read: Cake.api.path + '/addressbook/json/getRecord/telephone',
            update: Cake.api.path + '/addressbook/json/saveRecord/telephone',
            create: Cake.api.path + '/addressbook/json/saveRecord/telephone',
            destroy: Cake.api.path + '/addressbook/json/deleteRecord/telephone'
        }
    },
    listeners: {
        write: function (store) {
            store.reload();
        }
    }
});