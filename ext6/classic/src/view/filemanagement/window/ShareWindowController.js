/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define ('WWS.view.filemanagement.window.ShareWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.filemanagementwindowshare',

    submitSuccess: function (form, action) {
        var view = this.getView();
        ABox.success(
            T.__('The email has already been sent out.'),
            function () {
                view.close();
            }
        );
    }
});