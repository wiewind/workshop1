/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.plan.CopyWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolplancopywindow',

    onClickSelectClass: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        SCF.openClassGridWindow(vm.get('to_class.id'), function (data) {
            vm.setData({
                to_class: data
            });
        });
    },

    onClickSelectSemester: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        SCF.openSemesterGridWindow(vm.get('to_semester.id'), function (data) {
            vm.setData({
                to_semester: data
            });
        });
    },

    onSubmit: function () {
        var me = this,
            vm = this.getViewModel(),
            from_class_id = vm.get('from_class.id'),
            from_semester_id = vm.get('from_semester.id'),
            to_class_id = vm.get('to_class.id'),
            to_semester_id = vm.get('to_semester.id');

        if (from_class_id + '/' + from_semester_id === to_class_id + '/' + to_semester_id) {
            ABox.error(T.__('It is forbidden to copy plans after the same course and semester!'));
            return;
        }

        ABox.confirm(
            T.__('All plans in the target class semester will be replaced. Do you continue?'),
            function () {
                var form = me.getViewForm(),
                    data = me.getView().setting;
                form.submit({
                    url: data.url,
                    waitMsg: data.waitMsg,
                    method: data.method,
                    timeout: data.timeout,
                    submitEmptyText: data.submitEmptyText,
                    clientValidation: data.clientValidation,
                    success: function(form, action) {
                        me.submitSuccess(form, action);
                    },
                    failure: function(form, action) {
                        me.submitFailure(form, action);
                    }
                });
            }
        );
    },

    submitSuccess: function (form, action) {
        var view = this.getView(),
            vm = this.getViewModel(),
            to_class = vm.get('to_class'),
            to_semester = vm.get('to_semester');

        ABox.confirm(
            T.__("The plans have been copied!") + ' ' + T.__('Do you want to turn to the target class semester?'),
            function () {
                var schoolpanel = Ext.ComponentQuery.query('schoolpanel')[0];
                schoolpanel.getViewModel().setData({
                    class: to_class,
                    semester: to_semester
                });

                schoolpanel.down('schoolplantable').getController().drawPanel();
                schoolpanel.down('schoolchildgrid').getStore().reload();
            }
        );
        view.close();
    }
});