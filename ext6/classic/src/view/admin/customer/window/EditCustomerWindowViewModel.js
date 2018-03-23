/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.window.EditCustomerWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.admincustomerwindoweditcustomer',

    data: {
        id: 0,
        name: ''
    },

    formulas: {
        getTitle: function (get) {
            return get('id') > 0 ? T.__("Customer") : T.__("New Customer");
        }
    }
});