/**
 * Created by benying.zou on 05.02.2018.
 */
Ext.define ('WWS.view.setting.ForgotPasswordWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.settingforgotpasswordwindow',

    submitSuccess: function (form, action) {
        var data = action.result.data;
        ABox.success(
            Wiewind.String.sprintf(T.__('Hello %s, an email was sent to your email address!'), data.name),
            function () {
                location.reload();
            }
        );
    }
});