/**
 * Created by benying.zou on 26.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.TableGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admindbmanagertablegrid',

    init: function () {
        var vm = this.getViewModel(),
            tablename = vm.get('tablename');


    },

    onCellEdit: function (editor, context) {
        var vm = this.getViewModel();
        Glb.Ajax({
            url: Cake.api.path + '/dbmanager/json/update',
            params: Ext.apply(context.newValues, {
                tablename: vm.get('tablename')
            }),
            success: function () {
                vm.getStore('recordsStore').reload();
            }
        });
    },

    onClickNew: function () {
        var vm = this.getViewModel();
        Ext.create('WWS.view.admin.dbmanager.window.RecordWindow', {
            viewModel: {
                parent: vm
            },
            callbackFn: function () {
                vm.getStore('recordsStore').reload();
            }
        })
    },

    onClickDelete: function(grid, rowIndex, colIndex) {
        var vm = this.getViewModel(),
            store = vm.getStore('recordsStore');
        ABox.confirm(
            T.__("Are you sure you want to delete the record?"),
            function () {
                var rec = store.getAt(rowIndex),
                    keys = vm.get('keys'),
                    tablename = vm.get('tablename'),
                    params;
                if (keys.length === 1 && keys[0] === 'id') {
                    params = {
                        tablename: tablename,
                        id: rec.get('id')
                    };
                } else {
                    var where = '';
                    keys.forEach(function (key) {
                        if (where) where += ' and ';
                        where += key + '="' + rec.get(key) + '"';
                    });
                    params = {
                        tablename: tablename,
                        where: where
                    };
                }
                Glb.Ajax({
                    url: Cake.api.path + '/dbmanager/json/delete',
                    params: params,
                    success: function(response){
                        store.reload();
                        ABox.success(T.__("This record is deleted"));
                    }
                });
            }
        );
    }
});