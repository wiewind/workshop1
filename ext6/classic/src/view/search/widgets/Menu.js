/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.search.widgets.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'searchwidgetsmenu',

    requires: [
        'WWS.view.search.widgets.MenuController',
        'WWS.view.search.widgets.MenuViewModel'
    ],

    controller: 'searchwidgetsmenu',

    viewModel: {
        type: 'searchwidgetsmenu'
    },

    config: {
        title: T.__('Categories'),
        newOpen: true
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'dataview',
                bind: {
                    store: '{menus}'
                },
                itemSelector: 'searchmenu-item',
                cls: 'searchmenubox',
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                    '   <a onclick="SHF.showContent({id})">{title}</a>',
                    '</tpl>'
                ),
                listeners: {
                    itemcontextmenu: 'onItemClick'
                }
            }
        ];

        if (Glb.common.checkLogin()) {
            this.tools = [
                {
                    type: 'plus',
                    tooltip: T.__("Add"),
                    handler: 'onAdd'
                }
            ];
        }

        this.callParent();
    }
});