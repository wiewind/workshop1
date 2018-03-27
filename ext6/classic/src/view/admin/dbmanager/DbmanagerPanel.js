/**
 * Created by benying.zou on 23.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.DbmanagerPanel', {
    extend: 'Ext.Panel',
    xtype: 'admindbmanagerpanel',

    requires: [
        'WWS.view.admin.dbmanager.Functions',
        'WWS.view.admin.dbmanager.NaviPanel',
        'WWS.view.admin.dbmanager.TableGrid',
        'WWS.view.admin.dbmanager.window.RecordWindow'
    ],

    config: {
        title: T.__("DB Management"),
        icon: Cake.image.path+'/dbmanager.png',
        layout: 'border',
        closable: true,
        bodyPadding: 10,
        border: 0
    },

    items: [
        {
            xtype: 'admindbmanagernavipanel',
            region: 'west'
        },
        {
            xtype: 'container',
            itemId: 'dbmanagerMainPanel',
            region: 'center',
            layout: 'fit',
            bodyStyle: {
                background: '#dfe9f6'
            },
            items: [
                {
                    padding: '20 0 0 0',
                    html: '<div style="font-size: 20px; font-weight: bold; color: gray; "><span class="x-fa fa-arrow-left"> ' + T.__('Please select a tabale!') + '</div>'
                }
            ]
        }
    ]
});
