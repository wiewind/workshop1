/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FileUploadWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.filemanagementwindowfileupload',

    data: {},

    formulas: {
        showWindowTitle: function (get) {
            return Wiewind.String.sprintf(T.__("Upload Files to [%s]"), FMF.displayPath(get('path')));
        }
    }
});