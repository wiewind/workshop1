/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.store.PasskeySearchResults', {
    extend: 'WWS.store.Base',

    alias: 'store.passkeysearchresults',

    model: 'WWS.model.PasskeyGridItem',

    proxy: {
        url: Cake.api.path + '/passkeys/json/search'
    }
});