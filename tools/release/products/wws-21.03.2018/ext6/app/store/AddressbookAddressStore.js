/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.store.AddressbookAddressStore', {
    extend: 'WWS.store.Base',
    alias: 'store.addressbookaddressstore',
    fields: [
        {name: 'id', mapping: 'AddressbookAddress.id', type: 'int'},
        {name: 'person_id', mapping: 'AddressbookAddress.person_id', type: 'int'},
        {name: 'title', mapping: 'AddressbookAddress.title'},
        {name: 'address', mapping: 'AddressbookAddress.address'}
    ],
    autoSync: true,
    proxy: {
        api: {
            read: Cake.api.path + '/addressbook/json/getRecord/address',
            update: Cake.api.path + '/addressbook/json/saveRecord/address',
            create: Cake.api.path + '/addressbook/json/saveRecord/address',
            destroy: Cake.api.path + '/addressbook/json/deleteRecord/address'
        }
    },
    listeners: {
        write: function (store) {
            store.reload();
        }
    }
});