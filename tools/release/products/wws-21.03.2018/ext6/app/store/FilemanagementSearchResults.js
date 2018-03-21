/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.store.FilemanagementSearchResults', {
    extend: 'WWS.store.Base',

    alias: 'store.filemanagementsearchresults',

    model: 'WWS.model.FilemanagementGridItem',

    proxy: {
        url: Cake.api.path + '/filemanagement/json/search'
    }
});