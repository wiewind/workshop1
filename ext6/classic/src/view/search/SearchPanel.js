/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.search.SearchPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'searchpanel',

    requires: [
        'WWS.view.search.Functions',
        'WWS.view.search.Menu',
        'WWS.view.search.Content',
        'WWS.view.search.EditContent',
        'WWS.view.search.SideContainer',
        'WWS.view.search.EditHotlineWindow',

        'WWS.view.search.SearchPanelController'
    ],

    controller: 'searchpanel',

    config: {
        title: T.__m('search'),
        icon: Cake.image.path+'/board/search16.png',
        closable: false,
        layout: 'hbox',
        scrollable: true
    },

    buildItems: function (hotlinks) {
        var linkPanelItems = [
            {
                xtype: 'searchmenu'
            }
        ];

        var items = [
            {
                xtype: 'searchsidecontainer',
                side: 'l',
                items: linkPanelItems.concat(this.buildWidgets(hotlinks, 'l'))
            },
            {
                xtype: 'container',
                flex: 1,
                itemId: 'searchcontainer',
                padding: '10 0',
                defaults: {
                    border: 1
                }
            },
            {
                xtype: 'searchsidecontainer',
                side: 'r',
                items: this.buildWidgets(hotlinks, 'r')
            }
        ];

        return items;
    },

    buildWidgets: function (hotlinks, side) {
        var me = this,
            pageItems = [];
        Ext.Array.each(hotlinks[side], function(comp) {
            var tools = [];

            if (Glb.common.checkLogin()) {
                tools = [{
                    type: 'gear',
                    hotId: comp['id'],
                    tooltip: T.__("Edit"),
                    handler: function () {
                        me.getController().onEditWidget(comp['id']);
                    }
                }];
            }

            pageItems.push({
                title: comp['title'],
                hotName: 'widget_' + comp['id'],
                bodyCls: 'searchmenubox',
                tools: tools,
                html: comp['text']
            });
        });

        return pageItems;
    }
});