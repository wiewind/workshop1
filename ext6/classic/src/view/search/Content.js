/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.search.Content', {
    extend: 'Ext.panel.Panel',
    xtype: 'searchcontent',

    requires: [
        'WWS.view.search.ContentController',
        'WWS.view.search.ContentViewModel'
    ],

    controller: 'searchcontent',
    viewModel: {
        type: 'searchcontent'
    },

    config: {
        iconCls: 'x-fa fa-file-text-o',
        bodyCls: 'searchContent',
        minHeight: 600,
        layout: 'vbox',
        defaults: {
            xtype: 'component',
            width: '100%'
        }
    },

    bind: {
        title: '{title}'
    },

    items: [
        {
            bind: {
                html: '{text}'
            }
        },
        {
            minHeight: 50,
            flex: 1
        },
        {
            bind: {
                html: '<div class="noticeText rightFloat">{showModified}</div>'
            }
        }
    ],

    initComponent: function () {
        this.tools = [
            {
                type: 'gear',
                tooltip: T.__('Edit'),
                hidden: !Glb.common.checkLogin(),
                handler: 'onClickEdit'
            }
        ];
        this.callParent();
    }
});