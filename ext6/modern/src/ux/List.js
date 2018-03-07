/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.ux.List', {
    extend: 'Ext.dataview.List',

    requires: [
        'WWS.plugin.ListPaging',
        'WWS.plugin.PullRefresh'
    ],

    config: {
        scrollable: true,
        emptyText: T.__('This list is empty.'),

        plugins: {
            'WWS_ListPaging': {},
            'WWS_PullRefresh': {}
        }
    }
});