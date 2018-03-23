/**
 * Created by benying.zou on 23.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.NaviPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.admindbmanagernavipanel',

    onItemSelect: function (grid, record, item, index, e) {
        var view = this.getView(),
            vm = this.getViewModel();
        //
        // e.preventDefault();
        // e.stopEvent();
        // me.showTable(record.get('name'));

        // view.down('[itemId="editBtn"]').enable();
        // view.down('[itemId="deleteBtn"]').enable();
        //
        // vm.setData({
        //     selectedCustomer: record.getData()
        // });
        //
        // var mainPanel = view.up('admincustomerpanel').down('[itemId="admincustomersmainpanel"]');
        // mainPanel.removeAll();
        // mainPanel.add(
        //     Ext.create('WWS.view.admin.customer.UsersGrid', {
        //         viewModel: {
        //             parent: vm
        //         }
        //     })
        // );
    },

});