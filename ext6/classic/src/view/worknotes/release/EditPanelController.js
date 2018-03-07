/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.release.EditPanelController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.worknotesreleaseeditpanel',

    afterRender: function () {
        var view = this.getView(),
            containerPanel = view.up('worknotesshowcontainerpanel'),
            worknotId = containerPanel.getViewModel().get('id'),
            hiddenfield = view.down('hiddenfield');
        hiddenfield.setValue(worknotId);
    },

    submitSuccess: function (form, action) {
        ABox.success(T.__("Successfully saved"));
        Ext.ComponentQuery.query('worknotesreleasegrid')[0].getStore().reload();
        Ext.ComponentQuery.query('worknotesnavipanel')[0].getStore().reload();
        this.onCancel();
    },

    submitFailure: function(form, action) {
        ABox.failure(T.__("server error"));
    },

    onCancel: function () {
        this.getView().up().removeAll();
    }
});