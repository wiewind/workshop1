/**
 * Created by benying.zou on 26.03.2018.
 */
Ext.define('WWS.view.admin.dbmanager.TableGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.admindbmanagertablegrid',

    data: {
        tablename: '',
        dataConfig: {},
        keys: []
    },

    stores: {
        recordsStore: {
            type: 'dbrecord',
            autoLoad: false,
            listeners: {
                beforeload: function () {
                    var grid = Ext.ComponentQuery.query('admindbmanagertablegrid')[0],
                        tablename = grid.getViewModel().get('tablename');
                    grid.getStore().setExtraParams({'tablename': tablename});
                },

                beforesync: function () {
                    var grid = Ext.ComponentQuery.query('admindbmanagertablegrid')[0],
                        tablename = grid.getViewModel().get('tablename');
                    grid.getStore().setExtraParam({'tablename': tablename});
                }
            }
        }
    }
});