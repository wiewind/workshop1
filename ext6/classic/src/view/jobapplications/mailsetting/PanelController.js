/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define('WWS.view.jobapplications.mailsetting.PanelController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.jobapplicationsmailsetting',

    submitSuccess: function (form, action) {
        var data = Ext.decode(action.response.responseText).data;
        JAF.setBassData({
            mailsetting: data
        });
        ABox.success(T.__("Mailsetting saved."));
    },

    onClickCancel: function () {
        this.closeView();
    }
});