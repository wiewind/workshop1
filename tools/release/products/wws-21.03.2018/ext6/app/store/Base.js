/**
 * Created by benying.zou on 22.02.2017.
 */
Ext.define('WWS.store.Base', {
    extend: 'Ext.data.Store',

    alias: 'store.base',

    pageSize: (Ext.manifest.toolkit==='classic') ?  Cake.classic.maxPageSize : Cake.modern.maxPageSize,

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
                });
            }
        }
    },

    afterload: function (store) {},

    setExtraParams: function (params) {
        this.getProxy().setExtraParams(params);
        return this;
    }
});