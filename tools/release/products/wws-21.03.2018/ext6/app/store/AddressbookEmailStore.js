/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.store.AddressbookEmailStore', {
    extend: 'WWS.store.Base',
    alias: 'store.addressbookemailstore',
    fields: [
        {name: 'id', mapping: 'AddressbookEmail.id', type: 'int'},
        {name: 'person_id', mapping: 'AddressbookEmail.person_id', type: 'int'},
        {name: 'title', mapping: 'AddressbookEmail.title'},
        {name: 'email', mapping: 'AddressbookEmail.email'}
    ],
    autoSync: true,
    proxy: {
        api: {
            read: Cake.api.path + '/addressbook/json/getRecord/email',
            update: Cake.api.path + '/addressbook/json/saveRecord/email',
            create: Cake.api.path + '/addressbook/json/saveRecord/email',
            destroy: Cake.api.path + '/addressbook/json/deleteRecord/email'
        }
    },
    listeners: {
        write: function (store) {
            store.reload();
        }
    }
});