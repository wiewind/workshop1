/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.store.FilemanagementTreeStore', {
    extend: 'WWS.store.BaseTree',

    alias: 'store.filemanagementtreestore',

    model: 'WWS.model.FilemanagementTreeItem',

    root: {},

    proxy: {
        url: Cake.api.path + '/filemanagement/json/getFilesTree'
    }
});