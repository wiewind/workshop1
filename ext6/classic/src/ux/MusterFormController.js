/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define ('WWS.ux.MusterFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.musterform',

    submitOnEnter: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.onSubmit();
        }
    },

    getViewForm: function () {
        return this.getView();
    },

    onSubmit: function () {
        var me = this,
            form = this.getViewForm(),
            data = this.getView().setting;
        form.submit({
            url: data.url,
            waitMsg: data.waitMsg,
            method: data.method,
            timeout: data.timeout,
            submitEmptyText: data.submitEmptyText,
            clientValidation: data.clientValidation,
            success: function(form, action) {
                me.submitSuccess(form, action);
            },
            failure: function(form, action) {
                me.submitFailure(form, action);
            }
        });
    },

    submitSuccess: function (form, action) {},

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

    fieldFocus: function (field) {
        field.focus();
    }
});