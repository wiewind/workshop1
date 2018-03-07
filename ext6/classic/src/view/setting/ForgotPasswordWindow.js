/**
 * Created by benying.zou on 05.02.2018.
 */
Ext.define ('WWS.view.setting.ForgotPasswordWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'settingforgotpasswordwindow',

    requires: [
        'WWS.view.setting.ForgotPasswordWindowController'
    ],
    controller: 'settingforgotpasswordwindow',

    config: {
        title: T.__('Forgot Your Password?'),
        icon: Cake.image.path + '/key.png',
        width: 400
    },

    input: {
        submitText: Glb.btnSetting.sendText,
        submitIconCls: Glb.btnSetting.sendIconCls,
        url: Cake.api.path + '/login/json/makeResetPasswordMail'
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'textfield',
                fieldLabel: T.__('Username'),
                emptyText: T.__('Please enter your username'),
                name: 'username',
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            }
        ];
    }
});