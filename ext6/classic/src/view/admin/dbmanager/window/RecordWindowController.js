/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.window.RecordWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.admindbmanagerwindowrecord',

    init: function () {
        var vm = this.getViewModel(),
            customer_id = vm.get('id');
        if (customer_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/customers/json/load',
                params: {
                    id: customer_id
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText);
                    vm.setData(resp.data);
                }
            });
        }
    },

    submitSuccess: function (form, action) {
        var view = this.getView(),
            res = Ext.decode(action.response.responseText);
        if (view.callbackFn) {
            view.callbackFn(res.data);
        }
        if (view.callbackFn) {
            view.callbackFn(res.data);
        }
        ABox.success(T.__("The customer has been saved!"));
        view.close();
    }
});