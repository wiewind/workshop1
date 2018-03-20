/**
 * Created by benying.zou on 20.03.2018.
 */
Ext.define('WWS.view.school.ChildrenListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolchildrenlist',

    data: {},

    stores: {
        childrenStore: {
            type: 'schoolchildren',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var grid = Ext.ComponentQuery.query('schoolchildrenlist')[0],
                        class_id = grid.getViewModel().get('class.id');
                    store.getProxy().setExtraParam('class_id', class_id);
                }
            }
        }
    }
});