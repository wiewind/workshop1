/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.store.JobStatusStore', {
    extend: 'WWS.store.Base',

    alias: 'store.jobstatusstore',

    model: 'WWS.model.JobStatus',

    autoLoad: false,

    proxy: {
        api: {
            read: Cake.api.path + '/jobapplications/json/getJobStatus',
            update: Cake.api.path + '/jobapplications/json/saveJobStatus',
            create: Cake.api.path + '/jobapplications/json/saveJobStatus',
            destroy: Cake.api.path + '/jobapplications/json/deleteJobStatus'
        }
    }
});