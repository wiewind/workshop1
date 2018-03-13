/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.child.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolchildgrid',

    onClickCancel: function (field) {
        field.setValue('');
        this.onClickSearch(field);
    },

    onClickSearch: function (field) {
        var store = this.getViewModel().getStore('childrenStore');
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
        view.down('[itemId="editBtn"]').enable();
        view.down('[itemId="deleteBtn"]').enable();
    },

    onItemDblClick: function (grid, record) {
        this.onClickEdit()
    },

    onClickNew: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        SCF.openEditChildWindow(0, vm.get('class.id'), function () {
            view.getStore().reload();
        });
    },

    onClickEdit: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            SCF.openEditChildWindow(record.get('id'), vm.get('class.id'), function () {
                view.getStore().reload()
            });
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            record = view.getSelection();
        if (record.length > 0) {
            ABox.confirm(
                T.__("Are you sure you want to delete the child?"),
                function (btn) {
                    Glb.Ajax({
                        url: Cake.api.path + '/school/transjson/deleteChild',
                        params: {
                            child_id: record[0].get('id')
                        },
                        success: function(response){
                            var store = view.getStore();
                            store.reload();
                            ABox.success(T.__("The child has been deleted!"));
                        }
                    });
                }
            );
        }
    }
});