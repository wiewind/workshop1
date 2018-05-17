/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.SchoolPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolpanel',
    
    init: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        Glb.Ajax({
            url: Cake.api.path + '/school/json/getDefaultData',
            success: function(response){
                var res = Ext.decode(response.responseText);
                if (Ext.isEmpty(res.data.SchoolClass)) {
                    ABox.warning(
                        T.__("Your have not class, please add a new class into system."),
                        function () {
                            SCF.openEditClassWindow(0, function (data) {
                                SCF.setDefaultClass(data.id, function () {
                                    view.close();
                                    Ext.getCmp('appmain').add(Ext.create('WWS.view.school.SchoolPanel'));
                                });
                            });
                        }
                    );
                    return;
                }
                if (Ext.isEmpty(res.data.SchoolSemester)) {
                    ABox.warning(
                        T.__("Your have not semester, please add a new semester into system."),
                        function () {
                            SCF.openEditSemesterWindow(0, function (data) {
                                SCF.setDefaultSemester(data.id, function () {
                                    view.close();
                                    Ext.getCmp('appmain').add(Ext.create('WWS.view.school.SchoolPanel'));
                                });
                            });
                        }
                    );
                    return;
                }
                vm.setData({
                    class: res.data.SchoolClass,
                    semester: res.data.SchoolSemester
                });
                view.add(view.buildItems());
                Glb.History.add(view.items.items[0]);
        }
        });
    },

    onClickSelectClass: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        SCF.openClassGridWindow(vm.get('class.id'), function (data) {
            vm.setData({
                class: data
            });

            var table = view.down('schoolplantable');
            if (table) {
                table.getController().drawPanel();
                view.down('schoolchildgrid').getStore().reload();
            } else {
                view.add(view.buildItems());
            }

        });
    },

    onClickCourse: function () {
        SCF.openCourseGridWindow();
    },

    onClickTeacher: function () {
        SCF.openTeacherGridWindow();
    },

    onClickRoom: function () {
        SCF.openRoomGridWindow();
    },

    onClickSelectSemester: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        SCF.openSemesterGridWindow(vm.get('semester.id'), function (data) {
            vm.setData({
                semester: data
            });
            var table = view.down('schoolplantable');
            if (table) {
                table.getController().drawPanel();
            }
        });
    }
});
