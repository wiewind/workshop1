/**
 * Created by benying.zou on 15.02.2018.
 */
Ext.define ('WWS.view.filemanagement.window.RenameWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.filemanagementwindowrename',

    afterRender: function () {
        // 原名称不要随新名称输入而更改，所以不能用bind，只能在这里赋值。
        var view = this.getView(),
            oldNameField = view.down('displayfield[name="oldname1"]'),
            vm = this.getViewModel();
        oldNameField.setValue(vm.get('name'))
    },

    submitSuccess: function (form, action) {
        var view = this.getView();
        FMF.refreshAll();
        ABox.success(
            T.__('Rename success.'),
            function () {
                view.close();
            }
        );
    }
});