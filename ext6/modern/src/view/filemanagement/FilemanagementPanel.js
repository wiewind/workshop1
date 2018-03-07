/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define ('WWS.view.filemanagement.FilemanagementPanel', {
    extend: 'Ext.Container',
    xtype: 'filemanagementpanel',

    requires: [
        'WWS.view.filemanagement.Functions',
        'WWS.view.filemanagement.List',
        'WWS.view.filemanagement.FilemanagementPanelController'
    ],
    controller: 'filemanagementpanel',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                title: T.__m('filemanagement'),
                items: [
                    {
                        iconCls: 'x-fa fa-level-up',
                        cls: 'toolbar-button',
                        itemId: 'levelUpBtn',
                        hidden: true,
                        handler: 'onClickParentDir'
                    // },
                    // '->',
                    // {
                    //     iconCls: 'x-fa fa-search',
                    //     cls: 'toolbar-button',
                    //     handler: 'onClickSearch'
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'fm_path',
                itemId: 'pathCmp',
                minHeight: 30
            },
            {
                xtype: 'filemanagementlist',
                flex: 1
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});