/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.addressbook.DetailViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.addressbookdetail',

    data: {
        id: 0
    },

    stores: {
        telephoneStore: {
            type: 'addressbooktelephonestore',
            autoLoad: false
        },
        emailStore: {
            type: 'addressbookemailstore',
            autoLoad: false
        },
        addressStore: {
            type: 'addressbookaddressstore',
            autoLoad: false
        }
    },

    formulas: {
    }
});