/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.search.Select', {
    extend: 'Ext.Panel',
    xtype: 'searchselect',

    requires: [
        'WWS.view.search.SelectController',
        'WWS.view.search.SelectViewModel'
    ],
    controller: 'searchselect',
    viewModel: {
        type: 'searchselect'
    },

    config: {
        layout: 'fit',
        scrollable: true
    },

    items: [
        {
            xtype: 'dataview',
            bind: {
                store: '{searchpagemenu}'
            },
            itemTpl: '<div class="searchMenuItem" onclick="javascript: SFns.openPage({id})">{title}</div>'
        },
        {
            xtype: 'toolbar',
            itemId: 'buttonToolbar',
            docked: 'top',
            title: T.__m('search'),
            items: [
                {
                    iconCls: 'x-fa fa-chevron-left',
                    handler: MGlb.common.goback
                }
            ]
        }
    ],

    listeners: {
        activate: Glb.History.add
    }
});

