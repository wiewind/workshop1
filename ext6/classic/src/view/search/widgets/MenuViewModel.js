/**
 * Created by benying.zou on 05.02.2018.
 */
Ext.define('WWS.view.search.widgets.MenuViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.searchwidgetsmenu',

    stores: {
        menus: {
            type: 'searchpagemenu',
            autoLoad: true,
            afterload: function (store) {
                var searchmenu = Ext.ComponentQuery.query('searchwidgetsmenu')[0];
                if (searchmenu.newOpen) {
                    if (store.count() > 0) {
                        var rec = store.getAt(0);
                        SHF.showContent(rec.get('id'));
                    }
                    searchmenu.newOpen = false;
                }
            }
        }
    }
});
