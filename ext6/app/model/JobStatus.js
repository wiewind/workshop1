/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.model.JobStatus',{
    extend: 'WWS.model.Base',
    fields: [
        {name: 'id', mapping: 'JobapplicationsTrack.id', type:'int'},
        {name: 'job_id', mapping: 'JobapplicationsTrack.job_id', type:'int'},
        {name: 'status_id', mapping: 'JobapplicationsTrack.statustype_id', type:'int'},
        {name: 'status_name', mapping: 'JobapplicationsTrack.status_name', type:'string'},
        {name: 'date', mapping: 'JobapplicationsTrack.date', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'notice', mapping: 'JobapplicationsTrack.notice', type:'string'}
    ]
});