/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.filemanagement.search.ResultWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementsearchresultwindow',

    data: {
        text: 'unknown',
        folderId: 0
    },

    stores: {
        searchResults: {
            type: 'filemanagementsearchresults',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var vm = Ext.ComponentQuery.query('filemanagementsearchresultwindow')[0].getViewModel();
                    store.getProxy().setExtraParams({
                        text: vm.get('text'),
                        folderId: vm.get('folderId')
                    });
                }
            }
        }
    }
});