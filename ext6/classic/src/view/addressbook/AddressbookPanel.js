/**
 * Created by benying.zou on 21.12.2016.
 */
Ext.define ('WWS.view.addressbook.AddressbookPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'addressbookpanel',

    requires: [
        'WWS.view.addressbook.Functions',
        'WWS.view.addressbook.PersonGrid',
        'WWS.view.addressbook.ContactPanel',
        'WWS.view.addressbook.window.EditPersonInfoWindow',
        'WWS.view.addressbook.window.EditGridItemWindow'
    ],

    config: {
        title: T.__m("addressbook"),
        icon: Cake.image.path + '/board/addressbook16.png',
        layout: 'border',
        closable: true,
        padding: 10,
        defaults: {
            border: 1
        }
    },

    items: [
        {
            xtype: 'addressbookpersongrid',
            region: 'west'
        },
        {
            xtype: 'tabpanel',
            region: 'center'
        }
    ],

    listeners: {
        activate: Glb.History.add
    }
});

