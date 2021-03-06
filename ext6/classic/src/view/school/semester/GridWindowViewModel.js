/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.semester.GridWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolsemestergridwindow',

    data: {
        selectable: true
    },

    stores: {
        semesterStore: {
            type: 'schoolsemester',
            autoLoad: true,
            listeners: {
                load: function () {
                    var win = Ext.ComponentQuery.query('schoolsemestergridwindow')[0];
                    win.down('[itemId="okBtn"]').disable();
                    win.down('[itemId="editBtn"]').disable();
                    win.down('[itemId="deleteBtn"]').disable();
                    win.down('grid').setSelection();
                }
            }
        }
    }
});