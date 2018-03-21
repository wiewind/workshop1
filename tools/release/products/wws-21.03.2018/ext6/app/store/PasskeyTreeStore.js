/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.store.PasskeyTreeStore', {
    extend: 'WWS.store.BaseTree',

    alias: 'store.passkeytreestore',

    model: 'WWS.model.PasskeyTreeItem',

    root: {},

    proxy: {
        url: Cake.api.path + '/passkeys/json/getGroupTree'
    }
});