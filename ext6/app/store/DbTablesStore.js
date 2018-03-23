/**
 * Created by benying.zou on 23.03.2018.
 */
Ext.define('WWS.store.DbTablesStore', {
    extend: 'WWS.store.Base',

    alias: 'store.dbtables',

    pageSize: 1000,
    fields: [
        {name: 'name', mapping: 'name'}
    ],
    autoLoad: true,
    proxy: {
        url: Cake.api.path + '/dbmanager/json/getTables'
    }
});