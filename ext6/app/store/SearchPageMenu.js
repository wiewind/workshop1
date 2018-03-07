/**
 * Created by benying.zou on 05.02.2018.
 */
Ext.define('WWS.store.SearchPageMenu', {
    extend: 'WWS.store.Base',

    alias: 'store.searchpagemenu',

    fields: [
        {name: 'id', mapping: 'SearchPage.id', type: 'int'},
        {name: 'title', mapping: 'SearchPage.title', type: 'string'}
    ],

    proxy: {
        url: Cake.api.path + '/SearchPage/json/getMenus'
    }
});