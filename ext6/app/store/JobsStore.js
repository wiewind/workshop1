/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.store.JobsStore', {
    extend: 'WWS.store.Base',

    alias: 'store.jobsstore',

    model: 'WWS.model.Job',

    autoLoad: false,

    proxy: {
        url: Cake.api.path + '/jobapplications/json/getJobList'
    }
});