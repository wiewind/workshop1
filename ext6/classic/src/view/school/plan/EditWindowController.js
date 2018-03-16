/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.plan.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolplaneditwindow',

    init: function () {
        var vm = this.getViewModel(),
            plan_id = vm.get('id');
        if (plan_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadPlan',
                params: {
                    plan_id: plan_id
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText);
                    vm.setData(resp.data);
                }
            });
        }
    },

    onClickSelectCourse: function () {
        var vm = this.getViewModel();
        SCF.openCourseGridWindow(true, function (data) {
            var newData = {
                SchoolCourse: data
            };

            if (Wiewind.isEmpty(vm.get('SchoolTeacher'))) {
                Ext.apply(newData, {
                    SchoolTeacher: data.DefaultTeacher
                });
            }

            if (Wiewind.isEmpty(vm.get('SchoolRoom'))) {
                Ext.apply(newData, {
                    SchoolRoom: data.DefaultRoom
                });
            }

            vm.setData(newData);
        });
    },

    onClickCancelCourse: function () {
        var vm = this.getViewModel();
        vm.setData({
            SchoolCourse: {}
        });
    },

    onClickSelectTeacher: function () {
        var vm = this.getViewModel();
        SCF.openTeacherGridWindow(true, function (data) {
            vm.setData({
                SchoolTeacher: data
            });
        });
    },

    onClickCancelTeacher: function () {
        var vm = this.getViewModel();
        vm.setData({
            SchoolTeacher: {}
        });
    },

    onClickSelectRoom: function () {
        var vm = this.getViewModel();
        SCF.openRoomGridWindow(true, function (data) {
            vm.setData({
                SchoolRoom: data
            });
        });
    },

    onClickCancelRoom: function () {
        var vm = this.getViewModel();
        vm.setData({
            SchoolRoom: {}
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
        ABox.success(T.__("The plan has been saved!"));

        var tablepanel = Ext.ComponentQuery.query('schoolplantable')[0];
        tablepanel.getController().drawPanel();
        view.close();
    }
});