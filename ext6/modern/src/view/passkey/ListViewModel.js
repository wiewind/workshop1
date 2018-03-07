/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.passkey.ListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.passkeylist',

    data: {
        id: 0
    },

    stores: {
        groupItems: {
            type: 'passkeygridstore',
            autoLoad: false,
            listeners: {
                beforeload: function (store) {
                    var id = Ext.ComponentQuery.query('passkeylist')[0].getViewModel().get('id');
                    store.getProxy().setExtraParams({
                        group_id: id
                    });
                }
            }
        }
    }
});
