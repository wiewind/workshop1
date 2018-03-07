/**
 * Created by benying.zou on 01.03.2018.
 */
Ext.define ('WWS.view.passkey.window.EditKeyWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.passkeywindoweditkey',

    afterRender: function () {
        this.onShowPasswordField();
    },

    onShowPasswordField: function () {
        var view = this.getView(),
            form = view.down('form'),
            ct = form.down('fieldcontainer'),
            password2Field = form.down('[name="password2"]');
        ct.removeAll();
        ct.add([
            {
                xtype: 'textfield',
                name: 'password',
                fieldLabel: T.__("Password"),
                emptyText: T.__('Password'),
                inputType: 'password',
                bind: {
                    value: '{password}'
                },
                allowBlank: false,
                width: 400,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'button',
                icon: Cake.image.path + '/eye.png',
                tooltip: T.__('show password'),
                margin: '0 0 0 20',
                padding: '5 10',
                handler: 'onShowPasswordText'
            }
        ]);
        password2Field.enable();
    },

    onShowPasswordText: function () {
        var view = this.getView(),
            form = view.down('form'),
            ct = form.down('fieldcontainer'),
            password2Field = form.down('[name="password2"]');
        ct.removeAll();
        ct.add([
            {
                xtype: 'textfield',
                name: 'password',
                fieldLabel: T.__("Password"),
                emptyText: T.__('Password'),
                bind: {
                    value: '{password}'
                },
                allowBlank: false,
                width: 400,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'button',
                icon: Cake.image.path + '/eye_close.png',
                tooltip: T.__('hide password'),
                margin: '0 0 0 20',
                padding: '5 10',
                handler: 'onShowPasswordField'
            }
        ]);
        password2Field.disable();
    },

    onClickDelete: function () {
        var me = this,
            vm = this.getViewModel();
        PKF.mixDelete([], [vm.get('id')], function () {me.closeView();});
    },

    onClickClone: function () {
        var vm = this.getViewModel();
        PKF.clone([vm.get('id')]);
        this.closeView();
    },

    onClickOpenUrl: function () {
        var vm = this.getViewModel(),
            url = vm.get('url');
        if (url) {
            window.open(url, '_blank');
        }
    },

    onClickCopyUsername: function () {
        var vm = this.getViewModel();
        Wiewind.Action.setClipboardText(vm.get('username'));
    },

    onClickCopyPassowrd: function () {
        var vm = this.getViewModel();
        Wiewind.Action.setClipboardText(vm.get('password'));
    },

    submitSuccess: function (form, action) {
        var view = this.getView();
        PKF.refreshAll();
        ABox.success(
            T.__('Passkey has been saved!'),
            function () {
                view.close();
            }
        );
    }
});