/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.search.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'searchmenu',

    requires: [
        'WWS.view.search.MenuController',
        'WWS.view.search.MenuViewModel'
    ],

    controller: 'searchmenu',

    viewModel: {
        type: 'searchmenu'
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
                )
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