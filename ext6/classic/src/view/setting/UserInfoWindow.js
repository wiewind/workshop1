/**
 * Created by benying.zou on 02.02.2018.
 */

Ext.define('WWS.view.setting.UserInfoWindow', {
    extend: 'WWS.ux.MusterFormWindow',

    requires: [
        'WWS.view.setting.UserInfoWindowController'
    ],
    controller: 'settinguserinfowindow',

    config: {
        title: T.__('User'),
        icon: Cake.image.path + '/user.png',
        width: 400
    },

    input: {
        url: Cake.api.path + '/login/json/doResetPassword'
    },

    buildFormItems: function () {
        Ext.apply(Ext.form.field.VTypes, {
            password: function (value) {
                return Glb.common.checkPassword(value);
            },
            passwordText: T.__("min. length of password: 6"),
            repeatpassword: function(value, field) {
                var psw = field.up('form').getForm().findField('data[password]');
                return psw.getValue() === value;
            },
            repeatpasswordText: T.__("Password and repeated password are not identical!")
        });

        return [
            {
                xtype: 'component',
                html: '<table>' +
                    '<tr><td>' + T.__("User") + ':</td><td>' + SSD.data.user.name + '</td></tr>' +
                    '<tr><td>' + T.__("Username") + ':</td><td>' + SSD.data.user.username + '</td></tr>' +
                    '<tr><td>' + T.__("Customer") + ':</td><td>' + SSD.data.customer.name + '</td></tr>' +
                    '</table><hr />' +
                    T.__("Change Password") + '<br />'
            },
            {
                xtype: 'hiddenfield',
                name: 'data[user_id]',
                value:SSD.data.user.id
            },
            {
                xtype: 'textfield',
                fieldLabel: T.__("new password"),
                emptyText: T.__("new password"),
                name: 'data[password]',
                inputType: 'password',
                allowBlank: false,
                vtype: 'password',
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: T.__("repeated"),
                emptyText: T.__("repeated"),
                name: 'data[password2]',
                inputType: 'password',
                allowBlank: false,
                vtype: 'repeatpassword',
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            }
        ];
    }
});