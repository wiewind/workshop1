/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.store.BaseTree', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.basetree',

    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function (store, records, successful, operation) {
            if (successful) {
                store.afterload(store);
            } else {
                var resp = Ext.decode(operation._response.responseText);
                var msg = (resp.message) ? resp.message : T.__('Unknown');
                ABox.failure(msg, function () {
                    if (Number(resp.code) === 600) {
                        location.reload();
                    }
                    if (('failure' in config)) config.failure(response, options);
                });
            }
        }
    },

    afterload: function (store) {}
});