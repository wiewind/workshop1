/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.teacher.GridWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolteachergridwindow',

    data: {
        selectable: false
    },

    stores: {
        teacherStore: {
            type: 'schoolteacher',
            autoLoad: true,
            listeners: {
                load: function () {
                    var win = Ext.ComponentQuery.query('schoolteachergridwindow')[0];
                    win.down('[itemId="okBtn"]').disable();
                    win.down('[itemId="editBtn"]').disable();
                    win.down('[itemId="deleteBtn"]').disable();
                    win.down('grid').setSelection();
                }
            }
        }
    }
});