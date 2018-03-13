/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.semester.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolsemestereditwindow',

    init: function () {
        var vm = this.getViewModel(),
            semester_id = vm.get('id');
        if (semester_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadSemester',
                params: {
                    semester_id: semester_id
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
        if (view.callback) {
            if (values['id'] == 0) {
                values['id'] = res.id;
            }
            view.callback(values);
        }
        ABox.success(T.__("The semester has been saved!"));
        view.close();
    }
});