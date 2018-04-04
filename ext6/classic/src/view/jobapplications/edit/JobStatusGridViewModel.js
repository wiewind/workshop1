/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define('WWS.view.jobapplications.edit.JobStatusGridViewModel', {
    extend: 'WWS.ux.MusterFormViewModel',
    alias: 'viewmodel.jobapplicationseditjobstatusgrid',

    stores: {
        jobStatusStore: {
            type: 'jobstatusstore',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var grid = Ext.ComponentQuery.query('jobapplicationseditjobstatusgrid')[0],
                        job_id = grid.getViewModel().get('id');
                    store.getProxy().setExtraParam('job_id', job_id);
                },
                load: function (store) {
                    var grid = Ext.ComponentQuery.query('jobapplicationseditjobstatusgrid')[0];
                    grid.down('[itemId="deleteBtn"]').disable();
                }
            }
        }
    }
});