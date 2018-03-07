/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.passkey.search.ResultWindow', {
    extend: 'Ext.window.Window',
    xtype: 'passkeysearchresultwindow',

    requires: [
        'WWS.view.passkey.search.ResultWindowController',
        'WWS.view.passkey.search.ResultWindowViewModel'
    ],
    controller: 'passkeysearchresultwindow',
    viewModel: {
        type: 'passkeysearchresultwindow'
    },

    config: {
        bind: {
            title: Wiewind.String.sprintf(T.__('search with [%s], '), '{text}')
        },
        width: 1000,
        height: 500,
        layout: 'fit',
        modal: true,
        border: 0,
        autoShow: true
    },

    items: [
        {
            xtype: 'grid',
            bind: {
                store: '{searchResults}'
            },
            selModel: {
                selType: 'checkboxmodel',
                ignoreRightMouseSelection: true
            },
            forceFit: true,
            columns: [
                {
                    width:30,
                    dataIndex: 'isPasskey',
                    renderer: function(v, meta, rec){
                        if (!v) {
                            return '<div class="x-fa fa-folder-o"></div>';
                        }
                        if (rec.get('PasskeyData.url')) {
                            value = Cake.image.path+'/key_go.png';
                        } else {
                            value = Cake.image.path+'/key.png';
                        }
                        return '<img src="' + value + '" />';
                    }
                },
                {
                    text: T.__("Title"),
                    flex: 1,
                    dataIndex: 'text'
                },
                {
                    text: T.__("Group"),
                    flex: 1,
                    dataIndex: 'PasskeyGroup.path'
                },
                {
                    text: T.__("Username"),
                    flex: 1,
                    dataIndex: 'PasskeyData.username'
                },
                {
                    text: T.__("URL"),
                    flex: 1,
                    dataIndex: 'PasskeyData.url',
                    renderer: function (url) {
                        if (url) {
                            return '<a href="' + url + '" target="_blank">' + url + '</a>';
                        }
                        return '';
                    }
                }
            ],

            tbar: [
                {
                    btnName: 'tbarDelete',
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: 'x-fa fa-trash',
                    disabled: true,
                    handler: 'onClickDelete'
                },
                ' ',
                {
                    btnName: 'tbarOpenUrl',
                    tooltip: T.__("Open Url"),
                    icon: Cake.image.path+'/world_link.png',
                    disabled: true,
                    handler: 'onClickOpenUrl'
                },
                {
                    btnName: 'tbarCopyUsername',
                    tooltip: T.__("Copy Username"),
                    icon: Cake.image.path+'/user_copy.png',
                    disabled: true,
                    handler: 'onClickCopyUsername'
                },
                {
                    btnName: 'tbarCopyPassword',
                    tooltip: T.__("Copy Password"),
                    icon: Cake.image.path+'/key_copy.png',
                    disabled: true,
                    handler: 'onClickCopyPassowrd'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: '{0} - {1} of {2}',
                emptyMsg: T.__("Empty")
            },
            listeners: {
                selectionchange: 'onSelectionChange',
                itemdblclick: 'onItemdblclick'
            }
        }
    ]
});