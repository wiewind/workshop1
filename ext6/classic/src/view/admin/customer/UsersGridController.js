/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.customer.UsersGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.admincustomerusersgrid',

    onItemSelect: function (grid, record) {
        var grid = this.getView();
        grid.down('[itemId="editBtn"]').enable();
        grid.down('[itemId="deleteBtn"]').enable();
        grid.down('[itemId="changeUsernameBtn"]').enable();

        if (record.get('active')) {
            grid.down('[itemId="activeBtn"]').disable();
            grid.down('[itemId="blockBtn"]').enable();
        } else {
            grid.down('[itemId="activeBtn"]').enable();
            grid.down('[itemId="blockBtn"]').disable();
        }
    },

    onItemDblClick: function (grid, record) {
        this.onClickEdit();
    },

    onClickNew: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        Ext.create('WWS.view.admin.customer.window.EditUserWindow', {
            viewModel: {
                data: {
                    id: 0,
                    customer_id: vm.get('selectedCustomer.id'),
                    language_id: SSD.data.appLanguage.id
                }
            },
            callbackFn: function () {
                view.getStore().reload();
            }
        });
    },

    onClickEdit: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            Ext.create('WWS.view.admin.customer.window.EditUserWindow', {
                viewModel: {
                    data: {
                        id: record.get('id'),
                        customer_id: vm.get('selectedCustomer.id')
                    }
                },
                callbackFn: function () {
                    view.getStore().reload();
                }
            });
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            ABox.confirm(
                T.__("Are you sure you want to delete the user?"),
                function (btn) {
                    Glb.Ajax({
                        url: Cake.api.path + '/users/json/deleteUser',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response, options) {
                            view.getStore().reload();
                            ABox.success(T.__("The user was removed."));
                        }
                    });
                }
            );
        }
    },

    onClickActive: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            this.setActive(record, true);
        }
    },

    onClickBlock: function () {
        var view = this.getView(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            this.setActive(record, false);
        }
    },

    setActive: function (record, active) {
        var vm = this.getViewModel();
        if (record.get('active') !== Boolean(active)) {
            Glb.Ajax({
                url: Cake.api.path + '/users/json/setActive',
                params: {
                    id: record.get('id'),
                    active: (active) ? 1 : 0
                },
                success: function (response, options) {
                    vm.getStore('usersStore').reload();
                    var msg = (active) ? T.__("The user is active!") : T.__("The user is blocked!");
                    ABox.success(msg);
                }
            });
        }
    },

    onClickChangeUsername: function () {
        var view = this.getView(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            Ext.create('WWS.view.admin.customer.window.ChangeUsernameWindow', {
                viewModel: {
                    data: record.getData()
                },
                callbackFn: function () {
                    view.getStore().reload();
                }
            });
        }
    },

    onClickChange: function (combo, newValue) {
        var store = combo.up('grid').getStore();
        store.getProxy().setExtraParam('active', newValue);
        store.reload();
    }
});