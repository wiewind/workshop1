/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.model.Job', {
    extend: 'WWS.model.Base',
    fields : [
        {name: 'id', mapping: 'JobapplicationsJob.id', type:'int'},
        {name: 'jobname', mapping: 'JobapplicationsJob.jobname', type:'string'},
        {name: 'company', mapping: 'JobapplicationsJob.company', type:'string'},
        {name: 'postcode', mapping: 'JobapplicationsJob.postcode', type:'string'},
        {name: 'town', mapping: 'JobapplicationsJob.town', type:'string'},
        {name: 'street', mapping: 'JobapplicationsJob.street', type:'string'},
        {name: 'contact', mapping: 'JobapplicationsJob.contact', type:'string'},
        {name: 'telephone', mapping: 'JobapplicationsJob.telephone', type:'string'},
        {name: 'fax', mapping: 'JobapplicationsJob.fax', type:'string'},
        {name: 'email', mapping: 'JobapplicationsJob.email', type:'string'},
        {name: 'url', mapping: 'JobapplicationsJob.url', type:'string'},
        {name: 'comment', mapping: 'JobapplicationsJob.comment', type:'string'},
        {name: 'created', mapping: 'JobapplicationsJob.created', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'modified', mapping: 'JobapplicationsJob.modified', type:'date', dateFormat:'Y-m-d H:i:s'},

        {name: 'statustype_id', mapping: 'JobapplicationsJob.statustype_id', type:'int'},
        {name: 'status', mapping: 'JobapplicationsJob.status', type:'string'},

        {name: 'email_applied', mapping: 'JobapplicationsJob.email_applied', type:'bool'}
    ]
});