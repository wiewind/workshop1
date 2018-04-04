/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define('WWS.view.jobapplications.edit.PanelController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.jobapplicationseditpanel',

    init: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            id = vm.get('id');
        if (id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/jobapplications/json/loadJob',
                params: {
                    id: id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    vm.setData(data);
                }
            });
        }
        view.buildItems();
    },

    submitSuccess: function (form, action) {
        var view = this.getView();
        if (view.callbackFn) {
            view.callbackFn();
        }
        ABox.success(T.__("Job saved."));
        view.close();
    },

    onClickCancel: function () {
        this.closeView();
    }
});