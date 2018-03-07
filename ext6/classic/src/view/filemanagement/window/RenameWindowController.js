/**
 * Created by benying.zou on 15.02.2018.
 */
Ext.define ('WWS.view.filemanagement.window.RenameWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.filemanagementwindowrename',

    submitSuccess: function (form, action) {
        var view = this.getView();
        FMF.refreshAll();
        ABox.success(
            T.__('Rename success.'),
            function () {
                view.close();
            }
        );
    }
});