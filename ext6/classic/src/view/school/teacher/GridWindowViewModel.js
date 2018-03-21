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
                beforeload: function (store) {
                    var panel = Ext.ComponentQuery.query('schoolpanel')[0],
                        pvm = panel.getViewModel();
                    store.getProxy().setExtraParams({
                        'class_id': pvm.get('class.id'),
                        'semester_id': pvm.get('semester.id')
                    });
                },
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