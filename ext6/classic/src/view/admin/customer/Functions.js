/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.Functions', {
    singleton: true,
    alternateClassName: ['CTF'],

    openEditCustomerWindow: function (id, callbackFn) {
        Ext.create('WWS.view.admin.customer.window.EditCustomerWindow', {
            viewModel: {
                data: {
                    id: id
                }
            },
            callbackFn: callbackFn
        });
    }
});