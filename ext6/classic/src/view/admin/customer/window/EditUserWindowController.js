/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.customer.window.EditUserWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.adminuserwindowedituser',

    init: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            user_id = vm.get('id'),
            modulesCt = view.down('[itemId="modulesCt"]');
        if (user_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/users/json/load',
                params: {
                    id: user_id
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText);
                    console.log(resp.data);

                    vm.setData(resp.data);

                    modulesCt.add(view.buildModulesFormItems());
                }
            });
        } else {
            modulesCt.add(view.buildModulesFormItems());
        }
    },

    submitSuccess: function (form, action) {
        var view = this.getView(),
            res = Ext.decode(action.response.responseText);
        if (view.callbackFn) {
            view.callbackFn(res.data);
        }
        ABox.success(T.__("The user has been saved!"));
        view.close();
    }
});