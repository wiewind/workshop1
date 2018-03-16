/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.Functions', {
    singleton: true,
    alternateClassName: ['SCF'],

    openClassGridWindow: function (selectable, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.class.GridWindow', {
            viewModel: {
                data: {
                    selectable: selectable
                }
            },
            callbackFn: callbackFn
        });
    },

    openEditClassWindow: function (id, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.class.EditWindow', {
            viewModel: {
                data: {
                    id: id
                }
            },
            callbackFn: callbackFn
        });
    },

    setDefaultClass: function (class_id, callbackFn) {
        callbackFn = callbackFn || function () {};
        callbackFn = callbackFn || function () {};
        Glb.Ajax({
            url: Cake.api.path + '/school/json/setDefaultClass',
            params: {
                class_id: class_id
            },
            success: function(response){
                callbackFn();
            }
        });
    },

    openEditChildWindow: function (child_id, class_id, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.child.EditWindow', {
            viewModel: {
                data: {
                    id: child_id,
                    class_id: class_id
                }
            },
            callbackFn: callbackFn
        });
    },


    openSemesterGridWindow: function (selectedSemesterId, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.semester.GridWindow', {
            selectedSemesterId: selectedSemesterId,
            callbackFn: callbackFn
        });
    },

    openEditSemesterWindow: function (id, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.semester.EditWindow', {
            viewModel: {
                data: {
                    id: id
                }
            },
            callbackFn: callbackFn
        });
    },

    updateCurrentSemester: function (data) {
        data = data || {};
        var schoolpanel = Ext.ComponentQuery.query('schoolpanel')[0],
            gridwin = Ext.ComponentQuery.query('schoolsemestergridwindow');
        if (!Wiewind.isEmpty(data)) {
            schoolpanel.getViewModel().setData({
                semester: data
            });
        } else {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/getCurrentSemester',
                success: function(response){
                    var res = Ext.decode(response.responseText);
                    schoolpanel.getViewModel().setData({
                        semester: res.data
                    });
                    if (gridwin) {
                        gridwin[0].selectedSemesterId = res.data.id;
                        gridwin.down('grid').getStore().reload();
                    }
                }
            });
        }
    },

    openTeacherGridWindow: function (selectable, callbackFn) {
        selectable = selectable || false;
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.teacher.GridWindow', {
            viewModel: {
                data: {
                    selectable: selectable
                }
            },
            callbackFn: callbackFn
        });
    },

    openEditTeacherWindow: function (teacher_id, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.teacher.EditWindow', {
            viewModel: {
                data: {
                    id: teacher_id
                }
            },
            callbackFn: callbackFn
        });
    },

    openRoomGridWindow: function (selectable, callbackFn) {
        selectable = selectable || false;
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.room.GridWindow', {
            viewModel: {
                data: {
                    selectable: selectable
                }
            },
            callbackFn: callbackFn
        });
    },

    openEditRoomWindow: function (room_id, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.room.EditWindow', {
            viewModel: {
                data: {
                    id: room_id
                }
            },
            callbackFn: callbackFn
        });
    },

    openCourseGridWindow: function (selectable, callbackFn) {
        selectable = selectable || false;
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.course.GridWindow', {
            viewModel: {
                data: {
                    selectable: selectable
                }
            },
            callbackFn: callbackFn
        });
    },

    openEditCourseWindow: function (id, callbackFn) {
        callbackFn = callbackFn || function () {};
        Ext.create('WWS.view.school.course.EditWindow', {
            viewModel: {
                data: {
                    id: id
                }
            },
            callbackFn: callbackFn
        });
    },

    openEditPlanWindow: function (id, callbackFn) {
        callbackFn = callbackFn || function () {};

        var schoolpanel = Ext.ComponentQuery.query('schoolpanel')[0];
        var data = {};
        if (typeof id === 'object') {
            data = id;
        } else {
            data.id = id;
        }


        Ext.create('WWS.view.school.plan.EditWindow', {
            viewModel: {
                parent: schoolpanel.getViewModel(),
                data: data
            },
            callbackFn: callbackFn
        });
    },

    tableRefresh: function () {
        var table = Ext.ComponentQuery.query('schoolplantable');
        if (table) {
            table = table[0];
            table.getController().drawPanel();
        }
    },

    scaleOneMinute: 3,
    timeToScale: function (time) {
        var arr = time.split(':');
        return arr[0] * SCF.scaleOneMinute * 60 + arr[1] * SCF.scaleOneMinute;
    },
    
    refreshCell: function (cellId) {
        var table = Ext.ComponentQuery.query('schoolplantable');
        if (table) {
            var cell = table[0].down('[itemsId="planCell_' + cellId + '"]');
            if (cell) {
                cell.getController().onClickRefresh();
            }
        }
    }
});