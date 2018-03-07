/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.passkey.List', {
    extend: 'Ext.dataview.List',
    xtype: 'passkeylist',

    requires: [
        'WWS.view.passkey.ListController',
        'WWS.view.passkey.ListViewModel'
    ],
    controller: 'passkeylist',
    viewModel: {
        type: 'passkeylist'
    },

    bind: {
        store: '{groupItems}'
    },

    config: {
        scrollable: true,
        emptyText: T.__("This folder is empty."),

        plugins: [
            'WWS_PullRefresh'
        ],

        disableSelection: true,
        itemTpl: new Ext.XTemplate(
            '<div>{[this.showIcon(values.icon)]} <b>{text}</b></div>',
            {
                showIcon: function(icon){
                    if (!icon) {
                        return '<span class="x-fa fa-folder-o"></span>';
                    }
                    return '<img src="' + icon + '" />';
                }
            }
        )
    },

    listeners: {
        itemtap: 'onItemTap'
    }
});