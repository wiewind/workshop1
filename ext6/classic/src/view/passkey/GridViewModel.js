/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.passkey.GridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.passkeygrid',

    data: {},

    stores: {
        passkeygridstore: {
            type: 'passkeygridstore',
            autoLoad: true,
            listeners: {
                beforeload: function (store) {
                    var id = Ext.ComponentQuery.query('passkeygrid')[0].getViewModel().get('id');
                    store.getProxy().setExtraParams({
                        group_id: id
                    });
                }
            }
        }
    }
});