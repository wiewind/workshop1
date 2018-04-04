/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define ('WWS.view.jobapplications.edit.JobStatusWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.jobapplicationseditjobstatuswindow',

    submitSuccess: function (form, action) {
        var view = this.getView();
        if (view.callbackFn) {
            view.callbackFn();
        }
        this.closeView();
    }
});