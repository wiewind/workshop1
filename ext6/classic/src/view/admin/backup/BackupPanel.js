/**
 * Created by benying.zou on 26.03.2018.
 */
Ext.define('WWS.view.admin.backup.BackupPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'adminbackuppanel',

    requires: [
        'WWS.view.admin.backup.BackupPanelController'
    ],
    controller: 'adminbackuppanel',

    config: {
        title: T.__("Backup"),
        icon: Cake.image.path + '/backup.png',
        closable: true,
        border: 0,
        layout: 'border',
        bodyStyle: {
            background: '#dfe9f6'
        },
        tbar: [
            {
                text: T.__("Start"),
                tooltip: T.__("Start Backup"),
                iconCls: 'x-fa fa-play-circle',
                handler: 'onClickStart'
            },
            '-',
            {
                text: Glb.btnSetting.deleteText,
                tooltip: Glb.btnSetting.deleteText,
                iconCls: Glb.btnSetting.deleteIconCls2,
                handler: 'onClickDelete'
            },
            '->',
            {
                text: Glb.btnSetting.refreshText,
                tooltip: Glb.btnSetting.refreshText,
                iconCls: Glb.btnSetting.refreshIconCls,
                handler: 'onClickRefresh'
            }
        ]
    }
});