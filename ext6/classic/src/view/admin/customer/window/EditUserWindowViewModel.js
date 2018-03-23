/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.window.EditUserWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.adminuserwindowedituser',

    data: {
        id: 0,
        customer_id: SSD.data.user.customer_id,
        name: '',
        language_id: SSD.data.appLanguage.id
    },

    formulas: {
        getTitle: function (get) {
            return get('id') > 0 ? T.__("User") : T.__("New User");
        }
    }
});