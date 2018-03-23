/**
 * Created by benying.zou on 06.12.2016.
 */
Ext.define ('WWS.view.admin.customer.CustomersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'admincustomercustomersgrid',

    requires: [
        'WWS.view.admin.customer.CustomersGridController',
        'WWS.view.admin.customer.CustomersGridViewModel'
    ],
    controller: 'admincustomercustomersgrid',
    viewModel: {
        type: 'admincustomercustomersgrid'
    },

    bind: '{customersStore}',

    config: {
        scrollable: true,
        title: T.__("Customer List"),
        iconCls: 'x-fa fa-users'
    },


    columns: [
        {
            text: T.__("Customer"),
            flex: 1,
            dataIndex: 'name'
        },
        {
            text: T.__("Modified"),
            dataIndex: 'modified',
            width: 120,
            renderer: function (v) {
                return Glb.Date.displayDateFromTimestamp(v);
            }
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("Empty")
    },
    
    tbar: [
        {
            text: T.__("New Customer"),
            iconCls: Glb.btnSetting.newIconCls,
            tooltip: T.__("New Customer"),
            handler: 'onClickNew'
        },
        {
            text: T.__("Edit Customer"),
            iconCls: Glb.btnSetting.editIconCls,
            tooltip: T.__("Edit Customer"),
            itemId: 'editBtn',
            disabled: true,
            handler: 'onClickEdit'
        },
        {
            text: T.__("Delete Customer"),
            iconCls: Glb.btnSetting.deleteIconCls2,
            tooltip: T.__("Delete Customer"),
            itemId: 'deleteBtn',
            disabled: true,
            handler: 'onClickDelete'
        }
    ],

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});