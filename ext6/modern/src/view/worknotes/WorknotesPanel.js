/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.worknotes.WorknotesPanel', {
    extend: 'Ext.Container',
    xtype: 'worknotespanel',

    requires: [
        'WWS.view.worknotes.List',
        'WWS.view.worknotes.Detail',
        'WWS.view.worknotes.WorknotesPanelController'
    ],
    controller: 'worknotespanel',

    config: {
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                title: T.__m('worknotes'),
                items: [
                    // '->',
                    // {
                    //     iconCls: 'x-fa fa-search',
                    //     cls: 'toolbar-button',
                    //     handler: 'onClickSearch'
                    // }
                ]
            },
            {
                xtype: 'worknoteslist'
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});