/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FileViewerWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementwindowfileviewer',

    data: {},

    formulas: {
        getSuffix: function (get) {
            return Wiewind.File.getFileSuffix(get('name'));
        },

        displayModified: function (get) {
            return Glb.Date.displayDateFromString(get('modified'), 'H:i:s');
        }
    }
});