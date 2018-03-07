/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.passkey.search.ResultWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.passkeysearchresultwindow',

    data: {
        text: ''
    },

    stores: {
        searchResults: {
            type: 'passkeysearchresults',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var vm = Ext.ComponentQuery.query('passkeysearchresultwindow')[0].getViewModel();
                    store.getProxy().setExtraParams({
                        searchtext: vm.get('text')
                    });
                }
            }
        }
    }
});