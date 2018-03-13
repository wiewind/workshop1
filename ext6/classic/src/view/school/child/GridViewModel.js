/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.child.GridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolchildgrid',

    data: {},

    stores: {
        childrenStore: {
            type: 'schoolchildren',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var grid = Ext.ComponentQuery.query('schoolchildgrid')[0],
                        class_id = grid.getViewModel().get('class.id');
                    store.getProxy().setExtraParam('class_id', class_id);
                },
                load: function () {
                    var grid = Ext.ComponentQuery.query('schoolchildgrid')[0];
                    grid.down('[itemId="editBtn"]').disable();
                    grid.down('[itemId="deleteBtn"]').disable();
                    grid.setSelection();
                }
            }
        }
    }
});