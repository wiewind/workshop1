/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.course.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolcourseeditwindow',

    init: function () {
        var vm = this.getViewModel(),
            course_id = vm.get('id');
        if (course_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadCourse',
                params: {
                    course_id: course_id
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText);
                    vm.setData(resp.data);
                }
            });
        }
    },

    onClickSelectTeacher: function () {
        var vm = this.getViewModel();
        SCF.openTeacherGridWindow(true, function (data) {
            vm.setData({
                DefaultTeacher: data
            });
        });
    },

    onClickSelectRoom: function () {
        var vm = this.getViewModel();
        SCF.openRoomGridWindow(true, function (data) {
            vm.setData({
                DefaultRoom: data
            });
        });
    },

    onClickCancelTeacher: function () {
        var vm = this.getViewModel();
        vm.setData({
            DefaultTeacher: {}
        });
    },

    onClickCancelRoom: function () {
        var vm = this.getViewModel();
        vm.setData({
            DefaultRoom: {}
        });
    },

    checkCancelTrigger: function (cmp) {
        var trigger = cmp.triggerEl.item(0);
        if (cmp.getValue() === null || cmp.getValue() === '') {
            trigger.hide();
        } else {
            trigger.show();
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
        ABox.success(T.__("The course has been saved!"));
        view.close();
    }
});