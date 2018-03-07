/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.search.SearchPanel', {
    extend: 'Ext.Panel',
    xtype: 'searchpanel',

    requires: [
        'WWS.view.search.Functions',
        'WWS.view.search.Select',

        'WWS.view.search.SearchPanelController',
        'WWS.view.search.SearchPanelViewModel'
    ],
    controller: 'searchpanel',
    viewModel: {
        type: 'searchpanel'
    },

    config: {
        padding: 10,
        scrollable: true,
        innerCls: 'searchContent',
        bind: {
            html: '{text} <div class="noticeText rightFloat" style="margin-top: 50px;">{showModified}</div>'
        },

        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                bind: {
                    title: '{title}'
                },
                items: [
                    '->',
                    {
                        iconCls: 'x-fa fa-navicon',
                        cls: 'toolbar-button',
                        handler: 'onClickSelect'
                    }
                ]
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});