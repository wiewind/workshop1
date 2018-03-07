/**
 * Created by benying.zou on 15.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FolderCreateWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.filemanagementwindowfoldercreate',

    data: {},

    formulas: {
        showWindowTitle: function (get) {
            return Wiewind.String.sprintf(T.__("Add Folder to [%s]"), FMF.displayPath(get('path')));
        },

        isPublish: function (get) {
            return !(get('customer_id') > 0);
        },

        hideCheckbox: function (get) {
            return get('id') > 0;
        }
    }
});