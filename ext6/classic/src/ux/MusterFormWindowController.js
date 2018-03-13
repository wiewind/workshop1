/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.ux.MusterFormWindowController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.musterformwindow',

    getViewForm: function () {
        return this.getView().down('form');
    },

    onClose: function () {
        this.beforeclose();
        this.closeView();
    },

    beforeclose: function () {}
});