/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.projects.EditPanelController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.worknotesprojectseditpanel',

    submitSuccess: function (form, action) {
        ABox.success(T.__("Successfully saved"));
        Ext.ComponentQuery.query('worknotesprojectsgrid')[0].getViewModel().getStore('projects').reload();
        Ext.ComponentQuery.query('worknotesnavipanel')[0].getStore().reload();
        Ext.ComponentQuery.query('worknotesrecommendationpanel')[0].getViewModel().getStore('newNotes').reload();
        this.onCancel();
    },

    submitFailure: function(form, action) {
        ABox.failure(T.__("server error"));
    },

    onCancel: function () {
        this.getView().up().removeAll();
    }
});