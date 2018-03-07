/**
 * Created by benying.zou on 01.03.2018.
 */
Ext.define ('WWS.view.passkey.window.EditGroupWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.passkeywindoweditgroup',

    submitSuccess: function (form, action) {
        var view = this.getView(),
            isNew = this.getViewModel().get('isNew'),
            msg = isNew ? T.__('Group has been saved.') : T.__('Rename success.');
        PKF.refreshAll();
        ABox.success(
            msg,
            function () {
                view.close();
            }
        );
    }
});