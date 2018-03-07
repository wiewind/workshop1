/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.filemanagement.ListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementlist',

    data: {
        id: 0
    },

    stores: {
        folderItems: {
            type: 'filemanagementgridstore',
            autoLoad: false
        }
    },

    formulas: {
        showPath: function (get) {
            return FMF.displayPath(get('path'));
        }
    }
});
