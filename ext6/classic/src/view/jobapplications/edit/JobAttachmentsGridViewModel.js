/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define('WWS.view.jobapplications.edit.JobAttachmentsGridViewModel', {
    extend: 'WWS.ux.MusterFormViewModel',
    alias: 'viewmodel.jobapplicationseditjobattachments',

    stores: {
        jobAttachments: {
            type: 'jobattachmentsstore',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var grid = Ext.ComponentQuery.query('jobapplicationseditjobattachments')[0],
                        job_id = grid.getViewModel().get('id');
                    store.getProxy().setExtraParam('job_id', job_id);
                }
            }
        }
    }
});