/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.class.GridWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.schoolclassgridwindow',

    init: function () {
        var vm = this.getViewModel(),
            class_id = vm.get('id');
        if (class_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadClass',
                params: {
                    id: class_id
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText);
                    vm.setData(resp.data);
                }
            });
        }
    },

    submitSuccess: function (form, action) {
        var view = this.getView(),
            res = Ext.decode(action.response.responseText),
            values = view.down('form').getValues();
        if (view.callback) {
            values['id'] = res.class_id;
            view.callback(values);
        }
        ABox.success(T,__("Class has been saved!"));
        view.close();
    },


    onClickCancel: function (field) {
        field.setValue('');
        this.onClickSearch(field);
    },

    onClickSearch: function (field) {
        var store = this.getViewModel().getStore('classStore');
        store.getProxy().setExtraParam('searchText', field.getValue());
        store.reload();
    },

    enterSearch: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.onClickSearch(field);
        }
    },

    setDefault: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (!rec.get('is_default')) {
            SCF.setDefaultClass(rec.get('id'), function () {
                grid.getStore().reload();
            });
        }
    },

    onItemSelect: function () {
        var view = this.getView();
        view.down('[itemId="okBtn"]').enable();
        view.down('[itemId="editBtn"]').enable();
        view.down('[itemId="deleteBtn"]').enable();
    },

    onItemDblClick: function (grid, record) {
        var vm = this.getViewModel();
        if (vm.get('selectable')) {
            this.onClickSelect();
        }
    },

    onClickSelect: function () {
        var view = this.getView(),
            record = view.down('grid').getSelection();
        if (record.length > 0) {
            view.callback(record[0].getData());
            view.close();
        }
    },

    onClickNew: function () {
        var view = this.getView();
        SCF.openEditClassWindow(0, function () {
            view.down('grid').getStore().reload();
        });
    },

    onClickEdit: function () {
        var view = this.getView(),
            grid = view.down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            record = record[0];
            SCF.openEditClassWindow(record.get('id'), function () {
                grid.getStore().reload()
            });
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            grid = view.down('grid'),
            record = grid.getSelection();
        if (record.length > 0) {
            if (record[0].get('is_default')) {
                ABox.error(T.__('The default class kann not be deleted!'));
                return;
            }

            ABox.confirm(
                T.__("Are you sure you want to delete the class?"),
                function (btn) {
                    Glb.Ajax({
                        url: Cake.api.path + '/school/json/deleteClass',
                        params: {
                            class_id: record[0].get('id')
                        },
                        success: function(response){
                            var store = grid.getStore();
                            store.reload();
                            ABox.success(T.__("Class has been deleted!"));
                        }
                    });
                }
            );
        }
    }
});