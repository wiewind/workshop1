/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.room.GridWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolroomgridwindow',

    data: {
        selectable: false
    },

    stores: {
        roomStore: {
            type: 'schoolroom',
            autoLoad: true,
            listeners: {
                load: function () {
                    var win = Ext.ComponentQuery.query('schoolroomgridwindow')[0];
                    win.down('[itemId="okBtn"]').disable();
                    win.down('[itemId="editBtn"]').disable();
                    win.down('[itemId="deleteBtn"]').disable();
                    win.down('grid').setSelection();
                }
            }
        }
    }
});