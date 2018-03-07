/**
 * Created by benying.zou on 21.12.2016.
 */
Ext.define ('WWS.view.addressbook.AddressbookPanel', {
    extend: 'Ext.Container',
    xtype: 'addressbookpanel',

    requires: [
        'WWS.view.addressbook.Functions',
        'WWS.view.addressbook.List'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                title: T.__m('addressbook')
                // items: [
                //     '->',
                //     {
                //         iconCls: 'x-fa fa-search',
                //         cls: 'toolbar-button',
                //         handler: 'onClickSearch'
                //     }
                // ]
            },
            {
                xtype: 'addressbooklist',
                flex: 1
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});

