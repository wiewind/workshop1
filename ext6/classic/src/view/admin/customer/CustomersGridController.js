/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.customer.CustomersGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.admincustomercustomersgrid',

    onItemSelect: function (grid, record) {
        var view = this.getView(),
            vm = this.getViewModel();

        view.down('[itemId="editBtn"]').enable();
        view.down('[itemId="deleteBtn"]').enable();

        vm.setData({
            selectedCustomer: record.getData()
        });

        var mainPanel = view.up('admincustomerpanel').down('[itemId="admincustomersmainpanel"]');
        mainPanel.removeAll();
        mainPanel.add(
            Ext.create('WWS.view.admin.customer.UsersGrid', {
                viewModel: {
                    parent: vm
                }
            })
        );
    },

    onItemDblClick: function () {
        this.onClickEdit();
    },

    onClickNew: function () {
        var view = this.getView();
        CTF.openEditCustomerWindow(0, function () {
            view.getStore().reload()
        });
    },

    onClickEdit: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            CTF.openEditCustomerWindow(record.get('id'), function (data) {
                vm.setData({
                    selectedCustomer: data
                });
                vm.getStore('customersStore').reload();
            });
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            ABox.confirm(
                T.__("Are you sure you want to delete the customer?"),
                function () {
                    Glb.Ajax({
                        url: Cake.api.path + '/customers/json/deleteCustomer',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response, options) {
                            var mainPanel = view.up('admincustomerpanel').down('[itemId="admincustomersmainpanel"]');
                            mainPanel.removeAll();
                            ABox.success(T.__("The customer was removed."));
                            view.getStore().reload();
                        }
                    });
                }
            );
        }
    }

});
