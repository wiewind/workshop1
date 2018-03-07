/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.search.SelectViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.searchselect',

    stores: {
        searchpagemenu: {
            type: 'searchpagemenu',
            autoLoad: true,
            listeners: {
                load: function (store) {
                    store.add({
                        id: -1,
                        title: T.__('Hotlinks')
                    })
                }
            }
        }
    }
});