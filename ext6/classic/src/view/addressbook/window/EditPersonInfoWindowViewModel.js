/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.window.EditPersonInfoWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.addressbookwindoweditpersoninfo',

    data: {
        id: 0,
        name: ''
    },

    formulas: {
        showWindowTitle: function (get) {
            return get('id') > 0 ? T.__('Edit') + ': ' + get('name') : T.__('New Person');
        }
    }
});