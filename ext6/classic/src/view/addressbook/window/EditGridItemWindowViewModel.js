/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.addressbook.window.EditGridItemWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.addressbookwindoweditgriditem',

    data: {
        id: 0,
        datatype: 'telephone',
        person_id: 0
    },

    formulas: {
        showWindowTitle: function (get) {
            return get('id') > 0 ? T.__('Edit telephone') : T.__('New telephone');
        },

        isTelephone: function (get) {
            return get('datatype') === 'telephone'
        },

        isEmail: function (get) {
            return get('datatype') === 'email'
        },

        isAddress: function (get) {
            return get('datatype') === 'address'
        }
    }
});