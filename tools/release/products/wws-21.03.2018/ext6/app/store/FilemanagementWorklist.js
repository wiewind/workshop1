/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.store.FilemanagementWorklist', {
    extend: 'WWS.store.Base',

    alias: 'store.filemanagementworklist',

    model: 'WWS.model.FilemanagementGridItem',

    proxy: {
        url: Cake.api.path + '/filemanagement/json/getWorklist'
    }
});