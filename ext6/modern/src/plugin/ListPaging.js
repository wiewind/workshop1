/*
 * Extend Ext.Plugin to have global settings
 */
Ext.define('WWS.plugin.ListPaging', {
    extend: 'Ext.dataview.plugin.ListPaging',
    alias: 'plugin.WWS_ListPaging',
    config: {
        autoPaging: true,
        bufferZone: 0,
        loadMoreText: T.__('load more...'),
        noMoreRecordsText: T.__('No More Records')
    }
});