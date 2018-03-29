/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.view.jobapplications.JobsGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.jobapplicationsjobsgrid',

    stores: {
        jobsStore: {
            type: 'jobsstore',
            autoLoad: true,
            listeners: {
                load: function () {
                    var grid = Ext.ComponentQuery.query('jobapplicationsjobsgrid')[0];
                    grid.down('[itemId="editBtn"]').disable();
                    grid.down('[itemId="sendBtn"]').disable();
                    grid.down('[itemId="deleteBtn"]').disable();
                    grid.setSelection();
                }
            }
        }
    }
});