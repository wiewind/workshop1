/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.filemanagement.FileViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementfile',

    data: {
        id: 0
    },

    formulas: {
        showPath: function (get) {
            return FMF.displayPath(get('path'));
        },

        showSize: function (get) {
            return Ext.util.Format.fileSize(get('size'));
        },

        displayModified: function (get) {
            return Glb.Date.displayDateFromString(get('modified'), 'H:i:s');
        }
    }
});