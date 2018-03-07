/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.store.PasskeyGridStore', {
    extend: 'WWS.store.Base',

    alias: 'store.passkeygridstore',

    model: 'WWS.model.PasskeyGridItem',

    autoLoad: false,

    proxy: {
        url: Cake.api.path + '/passkeys/json/getGroupMembers'
    }
});