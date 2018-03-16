/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.semester.GridWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.schoolsemestergridwindow',

    onItemSelect: function () {
        var view = this.getView();
        view.down('[itemId="okBtn"]').enable();
        view.down('[itemId="editBtn"]').enable();
        view.down('[itemId="deleteBtn"]').enable();
    },

    onItemDblClick: function (grid, record) {
        var selectable = this.getViewModel().get('selectable');
        if (selectable) {
            this.onClickSelect();
        } else {
            this.onClickEdit();
        }
    },

    onClickSelect: function () {
        var view = this.getView(),
            record = view.down('grid').getSelection();
        if (record.length > 0) {
            view.callbackFn(record[0].getData());
            view.close();
        }
    },

    onClickNew: function () {
        var view = this.getView();
        SCF.openEditSemesterWindow(0, function (data) {
            view.down('grid').getStore().reload();
        });
    },

    onClickEdit: function () {
        var view = this.getView(),
            grid = view.down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            record = record[0];
            SCF.openEditSemesterWindow(record.get('id'), function (data) {
                grid.getStore().reload();
                SCF.updateCurrentSemester(data);
            });
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            grid = view.down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            ABox.confirm(
                T.__("Are you sure you want to delete the semester?"),
                function (btn) {
                    var semester_id = record[0].get('id');
                    Glb.Ajax({
                        url: Cake.api.path + '/school/transjson/deleteSemester',
                        params: {
                            semester_id: semester_id
                        },
                        success: function(response){
                            var store = grid.getStore();
                            if (semester_id == view.selectedSemesterId) {
                                SCF.updateCurrentSemester();
                            } else {
                                store.reload();
                            }
                            ABox.success(T.__("The semester has been deleted!"));
                        }
                    });
                }
            );
        }
    }
});