/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.room.GridWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.schoolroomgridwindow',

    onClickCancel: function (field) {
        field.setValue('');
        this.onClickSearch(field);
    },

    onClickSearch: function (field) {
        var store = this.getViewModel().getStore('roomStore');
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
        var view = this.getView();
        SCF.openEditRoomWindow(0, function (data) {
            view.down('grid').getStore().reload();
        });
    },

    onClickEdit: function () {
        var view = this.getView(),
            grid = view.down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            record = record[0];
            SCF.openEditRoomWindow(record.get('id'), function (data) {
                grid.getStore().reload();
            });
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            grid = view.down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            ABox.confirm(
                T.__("Are you sure you want to delete the room?"),
                function (btn) {
                    var room_id = record[0].get('id');
                    Glb.Ajax({
                        url: Cake.api.path + '/school/transjson/deleteRoom',
                        params: {
                            room_id: room_id
                        },
                        success: function(response){
                            var store = grid.getStore();
                            store.reload();
                            ABox.success(T.__("The room has been deleted!"));
                        }
                    });
                }
            );
        }
    }
});