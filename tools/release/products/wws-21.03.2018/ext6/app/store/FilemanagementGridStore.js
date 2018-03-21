/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.store.FilemanagementGridStore', {
    extend: 'WWS.store.Base',

    alias: 'store.filemanagementgridstore',

    model: 'WWS.model.FilemanagementGridItem',

    autoLoad: false,

    proxy: {
        url: Cake.api.path + '/filemanagement/json/getFolder'
    },

    loadFolderItems: function (folderId, callback) {
        folderId = folderId || 0;
        callback = callback || function () {};
        this.getProxy().setExtraParams({
            folderId: folderId
        });
        this.load(callback);
    }
});