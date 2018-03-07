/**
 * Created by benying.zou on 02.03.2018.
 */
Ext.define ('WWS.view.passkey.DetailController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.passkeydetail',

    setData: function (data) {
        this.getViewModel().setData(data);
    },

    onShowPasswordText: function (btn) {
        var pwdField = btn.up('container').down('[itemId="passwordField"]'),
            vm = this.getViewModel();
        if (btn.pwdVisible) {
            btn.pwdVisible = false;
            btn.setIcon(Cake.image.path + '/eye.png');
            pwdField.setHtml(vm.get('showPassword'));
        } else {
            btn.pwdVisible = true;
            btn.setIcon(Cake.image.path + '/eye_close.png');
            pwdField.setHtml(vm.get('password'));
        }
    }
});