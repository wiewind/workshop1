/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.customer.window.ChangeUsernameWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.admincustomerwindowchangeusername',

    submitSuccess: function (form, action) {
        var view = this.getView();
        if (view.callbackFn) {
            view.callbackFn();
        }
        ABox.success(T.__("The username has been changed!"));
        view.close();
    }
});