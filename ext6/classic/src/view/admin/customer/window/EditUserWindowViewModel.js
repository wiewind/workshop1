/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.window.EditUserWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.admincustomerwindowedituser',

    data: {
        id: 0,
        customer_id: 0,
        name: '',
        language_id: 0
    },

    formulas: {
        getTitle: function (get) {
            return get('id') > 0 ? T.__("User") : T.__("New User");
        }
    }
});