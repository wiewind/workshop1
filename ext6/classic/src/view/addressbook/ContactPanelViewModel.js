/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.ContactPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.addressbookcontactpanel',

    data: {
        id: 0,
        name: T.__('loading...')
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
        showPersonName: function (get) {
            return (get('id') > 0 && get('name')) ? get('name') : T.__('Unknown')
        },
        showPersonName2: function (get) {
            return (get('id') > 0 && get('name2')) ? get('name2') : T.__('Unknown')
        },
        showBirthday: function (get) {
            return (get('id') > 0 && get('birthday') > 0) ? Glb.Date.displayDateFromString(get('birthday')) : T.__('Unknown')
        },
        showCompany: function (get) {
            return (get('id') > 0 && get('company')) ? get('company') : T.__('Unknown')
        },
        showNotice: function (get) {
            return (get('id') > 0 && get('notice')) ? Wiewind.String.nl2br(get('notice')) : T.__('Empty')
        }
    }
});