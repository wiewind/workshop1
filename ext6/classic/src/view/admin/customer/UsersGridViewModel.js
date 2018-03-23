/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.UsersGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.admincustomerusersgrid',

    stores: {
        usersStore: {
            type: 'users',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var grid = Ext.ComponentQuery.query('admincustomerusersgrid')[0],
                        customer_id = grid.getViewModel().get('selectedCustomer.id');
                    store.getProxy().setExtraParam('customer_id', customer_id);
                },
                load: function () {
                    var grid = Ext.ComponentQuery.query('admincustomerusersgrid')[0];
                    grid.down('[itemId="editBtn"]').disable();
                    grid.down('[itemId="deleteBtn"]').disable();
                    grid.down('[itemId="activeBtn"]').disable();
                    grid.down('[itemId="blockBtn"]').disable();
                    grid.down('[itemId="changeUsernameBtn"]').disable();
                    grid.setSelection();
                }
            }
        },

        activeSelectStore: {
            fields: [
                {name: 'value'},
                {name: 'name'},
                {name: 'img'}
            ],
            data: [
                {name: T.__("all"), value: 'all', img: 'user_all.png', icon: 'fa-star-half-full'},
                {name: T.__("active"), value: '1', img: 'user.png', icon: 'fa-star'},
                {name: T.__("blocked"), value: '0', img: 'user_inactive.png', icon: 'fa-star-o'}
            ]
        }
    },

    formulas: {
        getTitle: function (get) {
            return Wiewind.String.sprintf(T.__("User List of %s"), get('selectedCustomer.name'))
        }
    }
});