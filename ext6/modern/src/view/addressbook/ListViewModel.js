/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.ListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.addressbooklist',

    stores: {
        personstore: {
            type: 'addressbookpersonstore',
            autoLoad: true,
            pageSize: 1000
        }
    }
});
