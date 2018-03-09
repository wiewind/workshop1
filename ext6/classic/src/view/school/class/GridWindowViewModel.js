/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.class.GridWindowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolclassgridwindow',

    data: {
        selectable: true
    },

    stores: {
        classStore: {
            type: 'schoolclass',
            autoLoad: true,
            listeners: {
                load: function () {
                    var win = Ext.ComponentQuery.query('schoolclassgridwindow')[0];
                    win.down('[itemId="okBtn"]').disable();
                    win.down('[itemId="editBtn"]').disable();
                    win.down('[itemId="deleteBtn"]').disable();
                    win.down('grid').setSelection();
                }
            }
        }
    }
});