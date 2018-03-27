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
        api: {
            read: Cake.api.path + '/dbmanager/json/getTableDaten',
            update: Cake.api.path + '/dbmanager/json/update',
            create: Cake.api.path + '/dbmanager/json/create',
            destroy: Cake.api.path + '/dbmanager/json/delete'
        }
    }
});