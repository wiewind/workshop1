/**
 * Created by benying.zou on 28.02.2018.
 */
Ext.define('WWS.view.search.Functions', {
    singleton: true,
    alternateClassName: ['SHF'],

    showContent: function (id, no_id_check) {
        no_id_check = no_id_check || false;
        var searchpanel = Ext.ComponentQuery.query('searchpanel');
        if (searchpanel) {
            searchpanel = searchpanel[0];
            var sc = searchpanel.down('[itemId="searchcontainer"]'),
                contentPanel = sc.down();
            if (!contentPanel || no_id_check || Number(contentPanel.getViewModel().get('id')) !== Number(id)) {
                sc.removeAll();
                sc.add(Ext.create('WWS.view.search.Content', {
                    viewModel: {
                        data: {
                            id: id
                        }
                    }
                }));
            }
        }
    },

    showEditContent: function (id) {
        var searchpanel = Ext.ComponentQuery.query('searchpanel');
        if (searchpanel) {
            searchpanel = searchpanel[0];
            var sc = searchpanel.down('[itemId="searchcontainer"]'),
                editPanel = Ext.create('WWS.view.search.EditContent', {
                    viewModel: {
                        data: {
                            id: id
                        }
                    }
                });
            sc.removeAll();
            sc.add(editPanel);
        }
    },

    getErstContentId: function () {
        var searchmenu = Ext.ComponentQuery.query('searchmenu')[0],
            store = searchmenu.getViewModel().getStore('menus'),
            res = store.getAt(0),
            id = res.get('id');
        return id;
    },

    refreshMenu: function (loadFirstPage) {
        loadFirstPage = loadFirstPage || false;
        var searchmenu = Ext.ComponentQuery.query('searchmenu')[0];
        if (loadFirstPage) {
            searchmenu.newOpen = true;
        }
        searchmenu.getViewModel().getStore('menus').reload();
    },

    refreshWidgets: function (hotlinks) {
        var searchpanel = Ext.ComponentQuery.query('searchpanel')[0],
            sidepanels = Ext.ComponentQuery.query('searchsidepanel');
        if (sidepanels) {
            Ext.Array.each(sidepanels, function(sp) {
                var side = sp.side,
                    items = sp.items.items;
                SS = sp;
                it = items;
                for (var i=items.length-1; i>-1; i--) {
                    item = items[i];
                    if (item.xtype !== 'searchmenu') {
                        sp.remove(item);
                    }
                }
                sp.add(searchpanel.buildWidgets(hotlinks, side));
            });
        }
    }
});