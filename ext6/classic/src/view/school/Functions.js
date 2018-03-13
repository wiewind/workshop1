/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.Functions', {
    singleton: true,
    alternateClassName: ['SCF'],

    config: {
        class: [],
        semester: [],

        weekdays: [T.__("Monday"), T.__("Tuesday"), T.__("Wednesday"), T.__("Thursday"), T.__("Friday")],
        coursePeriods: [
            {name: T.__("weekly"), value: 'weekly'},
            {name: T.__("two-weeks"), value: 'two-weeks'}
        ],
        cellHeight: 100
    },

    openClassGridWindow: function (selectable, callbackFn) {
        Ext.create('WWS.view.school.class.GridWindow', {
            viewModel: {
                data: {
                    selectable: selectable
                }
            },
            callback: callbackFn
        });
    },

    openEditClassWindow: function (class_id, callbackFn) {
        Ext.create('WWS.view.school.class.EditWindow', {
            viewModel: {
                data: {
                    id: class_id
                }
            },
            callback: callbackFn
        });
    },

    setDefaultClass: function (class_id, callback) {
        callback = callback || function () {};
        Glb.Ajax({
            url: Cake.api.path + '/school/json/setDefaultClass',
            params: {
                class_id: class_id
            },
            success: function(response){
                callback();
            }
        });
    },

    openEditChildWindow: function (child_id, class_id, callbackFn) {
        Ext.create('WWS.view.school.child.EditWindow', {
            viewModel: {
                data: {
                    id: child_id,
                    class_id: class_id
                }
            },
            callback: callbackFn
        });
    },


    openSemesterGridWindow: function (selectedSemesterId, callbackFn) {
        Ext.create('WWS.view.school.semester.GridWindow', {
            selectedSemesterId: selectedSemesterId,
            callback: callbackFn
        });
    },

    openEditSemesterWindow: function (semester_id, callbackFn) {
        Ext.create('WWS.view.school.semester.EditWindow', {
            viewModel: {
                data: {
                    id: semester_id
                }
            },
            callback: callbackFn
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
    }
});