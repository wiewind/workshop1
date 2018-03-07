/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define('WWS.view.addressbook.PersonGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.addressbookpersongrid',

    data: {},

    stores: {
        personstore: {
            type: 'addressbookpersonstore',
            autoLoad: true
        }
    }
});