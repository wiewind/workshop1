/**
 * Created by benying.zou on 01.02.2018.
 */
Ext.define ('WWS.view.setting.LoginWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'settingloginwindow',

    requires: [
        'WWS.view.setting.LoginWindowController'
    ],
    controller: 'settingloginwindow',

    config: {
        title: Glb.btnSetting.loginText,
        iconCls: Glb.btnSetting.loginIconCls,
        width: 400
    },

    input: {
        submitText: Glb.btnSetting.loginText,
        submitIconCls: Glb.btnSetting.loginIconCls,
        url: Cake.api.path + '/login/json/doLogin'
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
            },
            {
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: T.__('Password'),
                emptyText: T.__('Please enter your password'),
                name: 'password',
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'checkbox',
                        boxLabel: T.__('Keep me logged in'),
                        name: 'keepLogged',
                        inputValue: 1,
                        uncheckedValue: 0,
                        value: 0
                    },
                    {
                        xtype: 'component',
                        flex: 1
                    },
                    {
                        xtype: 'component',
                        margin: '3 0 0 0',
                        html: '<a href="javascript: Glb.common.forgotPassword()">' + T.__('Forgot Your Password?') + '</a>'
                    }
                ]
            }
        ];
    }
});