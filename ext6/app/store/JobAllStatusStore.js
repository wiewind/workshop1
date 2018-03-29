/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.store.JobAllStatusStore', {
    extend: 'WWS.store.Base',

    alias: 'store.joballstatusstore',

    fields: [
        {name: 'id', mapping: 'JobapplicationsStatustype.id', type:'int'},
        {name: 'name', mapping: 'JobapplicationsStatustype.name', type:'string'}
    ],

    proxy: {
        url: Cake.api.path + '/jobapplications/json/getStatustypes'
    }
});