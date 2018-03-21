/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define('WWS.store.AddressbookPersonStore', {
    extend: 'WWS.store.Base',

    alias: 'store.addressbookpersonstore',

    model: 'WWS.model.AddressbookPerson',

    autoLoad: false,

    proxy: {
        url: Cake.api.path + '/addressbook/json/getPersons'
    }
});