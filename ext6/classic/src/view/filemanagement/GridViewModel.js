/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.GridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementgrid',

    data: {},

    stores: {
        folderItems: {
            type: 'filemanagementgridstore'
        }
    },

    formulas: {
        showPath: function (get) {
            return FMF.displayPath(get('path'));
        }
    }
});