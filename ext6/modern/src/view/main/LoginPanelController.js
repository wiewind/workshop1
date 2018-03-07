/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.LoginPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainlogin',

    enterSubmit: function (btn, e) {
        if (Wiewind.Action.getKeyCode(e) === Ext.event.Event.ENTER) {
            this.onSubmit();
        }
    },

    onSubmit: function () {
        var me = this;
        this.getView().submit({
            url: Cake.api.path + '/login/json/doLogin',
            waitMsg: Glb.formSetting.waitMsg,
            method: Glb.formSetting.method,
            timeout: Glb.formSetting.timeout,
            submitEmptyText: Glb.formSetting.submitEmptyText,
            clientValidation: Glb.formSetting.clientValidation,
            success: function(form, action) {
                var user = action.data.user;
                ABox.success(
                    Wiewind.String.sprintf(T.__('Welcome %s!'), user.name)
                );
                location.reload();
            },
            failure: function(form, action) {
                ABox.failure(T.__("Error"));
            }
        });
    }
});
