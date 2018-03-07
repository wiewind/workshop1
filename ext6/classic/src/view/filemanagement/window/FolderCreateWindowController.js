/**
 * Created by benying.zou on 15.02.2018.
 */
Ext.define ('WWS.view.filemanagement.window.FolderCreateWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.filemanagementwindowfoldercreate',

    submitSuccess: function (form, action) {
        var me = this;
        FMF.refreshAll();
        ABox.success(
            T.__('Folder is saved.'),
            function () {
                me.closeView();
            }
        );
    }
});