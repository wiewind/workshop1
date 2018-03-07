/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.setting.LoginWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.settingloginwindow',

    submitSuccess: function (form, action) {
        var me = this,
            user = action.result.data.user;
        ABox.success(
            Wiewind.String.sprintf(T.__('Welcome %s!'), user.name),
            function () {
                me.closeView();
                location.reload();
            }
        );
    }
});