/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.teacher.GridWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolteachergridwindow',

    onClickCancel: function (field) {
        field.setValue('');
        this.onClickSearch(field);
    },

    onClickSearch: function (field) {
        var store = this.getViewModel().getStore('teacherStore');
        store.getProxy().setExtraParam('searchText', field.getValue());
        store.reload();
    },

    enterSearch: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.onClickSearch(field);
        }
    },

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
        var store = this.getViewModel().getStore('teacherStore');
        SCF.openEditTeacherWindow(0, function () {
            store.reload();
        });
    },

    onClickEdit: function () {
        var grid = this.getView().down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            record = record[0];
            SCF.openEditTeacherWindow(record.get('id'), function () {
                grid.getStore().reload()
            });
        }
    },

    onClickDelete: function () {
        var grid = this.getView().down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            ABox.confirm(
                T.__("Are you sure you want to delete the teacher?"),
                function (btn) {
                    Glb.Ajax({
                        url: Cake.api.path + '/school/transjson/deleteTeacher',
                        params: {
                            teacher_id: record[0].get('id')
                        },
                        success: function(response){
                            var store = grid.getStore();
                            store.reload();
                            ABox.success(T.__("The teacher has been deleted!"));
                        }
                    });
                }
            );
        }
    }
});