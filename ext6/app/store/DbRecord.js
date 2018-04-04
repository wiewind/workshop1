/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.store.DbRecord', {
    extend: 'WWS.store.Base',
    alias: 'store.dbrecord',
    fields: [
        {name: 'id', type: 'int'}
    ],
    autoSync: true,
    proxy: {
        url: Cake.api.path + '/dbmanager/json/getTableDaten'
    }
});