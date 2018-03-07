/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.setting.UserInfoWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.settinguserinfowindow',

    submitSuccess: function (form, action) {
        var me = this,
            result = Ext.decode(action.response.responseText);
        if (result.success) {
            ABox.success(
                T.__("Password is changed!"),
                function () {
                    me.closeView();
                }
            );
        }
    }
});