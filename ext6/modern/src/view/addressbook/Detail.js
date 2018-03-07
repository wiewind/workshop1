/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.addressbook.Detail', {
    extend: 'Ext.Panel',
    xtype: 'addressbookdetail',

    requires: [
        'WWS.view.addressbook.DetailController',
        'WWS.view.addressbook.DetailViewModel'
    ],
    controller: 'addressbookdetail',
    viewModel: {
        type: 'addressbookdetail'
    },

    config: {
        layout: 'vbox',
        showAnimation: 'pop',
        scrollable: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                bind: {
                    title: '{name}'
                },
                items: [
                    {
                        iconCls: 'x-fa fa-chevron-left',
                        handler: MGlb.common.goback
                    }
                ]
            },
            {
                xtype: 'component',
                itemId: 'displayBox',
                padding: 10
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});