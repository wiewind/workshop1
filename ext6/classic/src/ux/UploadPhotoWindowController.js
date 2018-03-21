/**
 * Created by benying.zou on 12.03.2018.
 */
Ext.define('WWS.ux.UploadPhotoWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploadphotowindow',

    submitOnEnter: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.onSubmit();
        }
    },

    onSubmit: function () {
        var me = this,
            view = this.getView(),
            form = view.down('form');
        form.submit({
            url: Cake.api.path + '/images/json/uploadPhoto',
            waitMsg: T.__('Uploading your photo...'),
            method: 'POST',
            timeout: 3000,
            success: function(form, action) {
                me.submitSuccess(form, action);
            },
            failure: function(form, action) {
                me.submitFailure(form, action);
            }
        });
    },

    submitSuccess: function (form, action) {
        var view = this.getView(),
            res = Ext.decode(action.response.responseText);
        if (view.callbackFn) {
            view.callbackFn(res.data.tmpPhotoName);
        }
        view.close();
    },

    submitFailure: function (form, action) {
        if (action.failureType === 'connect') {
            ABox.failure(action.response.statusText || T.__("server error"));
        } else if (action.failureType === 'server') {
            var res = Ext.decode(action.response.responseText);
            ABox.failure(res.message);
        } else if (action.failureType === 'client') {
            ABox.failure(T.__("client error"));
        }
    },

    onClose: function () {
        this.closeView();
    }
});