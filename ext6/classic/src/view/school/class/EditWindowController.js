/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.class.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolclasseditwindow',

    init: function () {
        var vm = this.getViewModel(),
            class_id = vm.get('id');
        if (class_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadClass',
                params: {
                    class_id: class_id
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
            res = Ext.decode(action.response.responseText),
            values = view.down('form').getValues();
        if (view.callbackFn) {
            values['id'] = res.class_id;
            view.callbackFn(values);
        }
        ABox.success(T.__("The class has been saved!"));
        view.close();
    }
});