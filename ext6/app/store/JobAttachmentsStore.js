/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.store.JobAttachmentsStore', {
    extend: 'WWS.store.Base',

    alias: 'store.jobattachmentsstore',

    model: 'WWS.model.JobAttachment',

    autoLoad: false,

    proxy: {
        url: Cake.api.path + '/jobapplications/json/getJobAttachments'
    }
});