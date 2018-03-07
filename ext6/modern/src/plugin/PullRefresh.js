/*
 * Extend Ext.Plugin to have global settings
 */
Ext.define('WWS.plugin.PullRefresh', {
    extend: 'Ext.dataview.pullrefresh.PullRefresh',
    alias: 'plugin.WWS_PullRefresh',
    config: {
        pullText: T.__('Go to refresh...'),
        releaseText: T.__('Start refresh!'),
        lastUpdatedText: T.__('Last refresh:') + ' &nbsp;',
        lastUpdatedDateFormat: 'd.m.Y H:i',
        loadedText: T.__('finished'),
        loadingText: T.__('loading...')
    },

    privates: {
        fetchLatest: function() {
            this.getList().getStore().loadPage(1, {
                callback: this.onLatestFetched,
                scope: this
            });
        }
    }
});