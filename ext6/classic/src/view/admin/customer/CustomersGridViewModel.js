/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.CustomersGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.admincustomercustomersgrid',

    stores: {
        customersStore: {
            type: 'customers',
            autoLoad: true,
            listeners: {
                load: function () {
                    var grid = Ext.ComponentQuery.query('admincustomercustomersgrid')[0];
                    grid.down('[itemId="editBtn"]').disable();
                    grid.down('[itemId="deleteBtn"]').disable();
                    grid.setSelection();
                }
            }
        }
    }
});