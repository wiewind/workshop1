/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.LoginPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'mainlogin',

    requires: [
        'WWS.view.main.LoginPanelController'
    ],
    controller: 'mainlogin',

    config: {
        iconCls: Glb.btnSetting.loginIconCls,
        layout: 'vbox'
    },

    items: [
        {
            xtype: 'toolbar',
            itemId: 'buttonToolbar',
            docked: 'top',
            title: T.__('Login'),
            items: [
                {
                    iconCls: 'x-fa fa-chevron-left',
                    handler: MGlb.common.goback
                }
            ]
        },
        {
            itemId: 'formMessageBox',
            hidden: true,
            cls: 'formmessagebox',
            hideAnimation: 'fadeOut',
            showAnimation: 'fadeIn',
            html: ''
        },
        {
            xtype: 'textfield',
            name: 'username',
            reference: 'login_username',
            placeholder: T.__('Username'),
            listeners: {
                keyup: 'enterSubmit'
            }
        },
        {
            xtype: 'passwordfield',
            name: 'password',
            reference: 'login_password',
            placeholder: T.__('Password'),
            listeners: {
                keyup: 'enterSubmit'
            }
        },
        {
            xtype: 'checkbox',
            boxLabel: T.__('Keep me logged in'),
            name: 'keepLogged',
            inputValue: '1',
            checked: true,
            uncheckedValue: '0'
        },
        {
            style: 'height: 2em;'
        },
        {
            xtype: 'button',
            text: Glb.btnSetting.loginText,
            iconCls: Glb.btnSetting.loginIconCls,
            ui: 'action',
            width: '100%',
            padding: 10,
            handler: 'onSubmit'
        },
        {
            style: 'height: 2em;'
        },
        {
            xtype: 'component',
            style: {
                textAlign: 'right'
            },
            html: '<a href="javascript: MGlb.common.forgotPassword()">' + T.__('Forgot Your Password?') + '</a>'
        },
        {
            style: 'height: 2em;'
        }
    ]
});