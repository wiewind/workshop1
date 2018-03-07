/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.addressbook.window.EditGridItemWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.addressbookwindoweditgriditem',

    submitSuccess: function (form, action) {
        var view = this.getView(),
            vm = this.getViewModel();
        ABox.success(
            T.__("The record has been saved."),
            function () {
                ABF.refreshGrid(vm.get('person_id'), vm.get('datatype'))
                view.close();
            }
        )
    }
});