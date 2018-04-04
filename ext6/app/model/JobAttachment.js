/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.model.JobAttachment',{
    extend: 'WWS.model.Base',
    fields: [
        {name: 'id', mapping: 'JobapplicationsJobsAttachment.id', type:'int'},
        {name: 'job_id', mapping: 'JobapplicationsJobsAttachment.job_id', type:'int'},
        {name: 'attachment_id', mapping: 'JobapplicationsJobsAttachment.attachment_id', type:'int'},
        {name: 'user_id', mapping: 'JobapplicationsAttachment.user_id', type:'int'},
        {name: 'name', mapping: 'JobapplicationsAttachment.name', type:'string'},
        {name: 'file', mapping: 'JobapplicationsAttachment.file', type:'string'},
        {name: 'default_send', mapping: 'JobapplicationsAttachment.default_send', type:'bool'},
        {name: 'deleted', mapping: 'JobapplicationsAttachment.deleted', type:'bool'},
        {name: 'created', mapping: 'JobapplicationsAttachment.created', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'modified', mapping: 'JobapplicationsAttachment.modified', type:'date', dateFormat:'Y-m-d H:i:s'}
    ]
});