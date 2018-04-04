/**
 * Created by benying.zou on 26.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.TableGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admindbmanagertablegrid',

    onItemSelect: function (grid, record) {
        var grid = this.getView();
        grid.down('[itemId="editBtn"]').enable();
        grid.down('[itemId="deleteBtn"]').enable();
    },

    onItemDblClick: function (grid, record) {
        this.onClickEdit();
    },

    onClickNew: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        Ext.create('WWS.view.admin.dbmanager.window.RecordWindow', {
            viewModel: {
                parent: vm
            },
            callbackFn: function () {
                view.getStore().reload();
            }
        })
    },

    onClickEdit: function () {
        var view = this.getView(),
            store = view.getStore(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            record = record[0];
            Ext.create('WWS.view.admin.dbmanager.window.RecordWindow', {
                viewModel: {
                    parent: vm,
                    data: Ext.apply(record.getData(), {
                        newRocord: false
                    })
                },
                callbackFn: function () {
                    view.getStore().reload();
                }
            })
        }
    },

    onClickDelete: function() {
        var view = this.getView(),
            store = view.getStore(),
            vm = this.getViewModel(),
            record = view.getSelection();
        if (record.length > 0) {
            var record = record[0];
            ABox.confirm(
                T.__("Are you sure you want to delete the record?"),
                function () {
                    var keys = vm.get('keys'),
                        tablename = vm.get('tablename'),
                        params;
                    if (keys.length === 1 && keys[0] === 'id') {
                        params = {
                            tablename: tablename,
                            id: record.get('id')
                        };
                    } else {
                        var where = '';
                        keys.forEach(function (key) {
                            if (where) where += ' and ';
                            where += key + '="' + record.get(key) + '"';
                        });
                        params = {
                            tablename: tablename,
                            where: where
                        };
                    }
                    Glb.Ajax({
                        url: Cake.api.path + '/dbmanager/json/delete',
                        params: params,
                        success: function (response) {
                            store.reload();
                            ABox.success(T.__("This record is deleted"));
                        }
                    });
                }
            );
        }
    }
});