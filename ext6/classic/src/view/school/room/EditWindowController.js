/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.room.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolroomeditwindow',

    init: function () {
        var vm = this.getViewModel(),
            room_id = vm.get('id');
        if (room_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadRoom',
                params: {
                    room_id: room_id
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
            if (values['id'] == 0) {
                values['id'] = res.id;
            }
            view.callbackFn(values);
        }
        ABox.success(T.__("The room has been saved!"));
        view.close();
    }
});