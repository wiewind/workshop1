/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FileUploadWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.filemanagementwindowfileupload',

    submitSuccess: function (form, action) {
        var view = this.getView();
        ABox.success(
            T.__("Files are saved."),
            function () {
                FMF.refreshAll();
                view.close();
            }
        )
    },

    afterFileChange: function (files) {
        var view = this.getView(),
            store = view.down('grid').getStore();
        if (files) {
            var data = [];
            for (var i = 0; i < files.length; i++) {
                var message = '',
                    suffix = Wiewind.File.getFileSuffix(files[i].name);
                if (Wiewind.Array.in_array(suffix, Cake.filemanagement.notAllowdTypes)) {
                    message += '* ' + T.__("This File ist not allowed type to upload.") + '<br />';
                }
                if (files[i].size > Cake.filemanagement.maxFileSize) {
                    message += '* ' + T.__("This File ist too large.") +
                        Wiewind.String.sprintf(T.__("The limit is %s."), Ext.util.Format.fileSize(Cake.filemanagement.maxFileSize)) + '<br />';
                }
                data.push({
                    name: files[i].name,
                    size: files[i].size,
                    message: message
                });
            }
            store.loadData(data);
            view.setting.timeout = files.length * 60000;
        }
    }
});