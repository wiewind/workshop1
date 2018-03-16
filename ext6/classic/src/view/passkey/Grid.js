/**
 * Created by benying.zou on 25.11.2016.
 */
Ext.define ('WWS.view.passkey.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'passkeygrid',

    requires: [
        'WWS.view.passkey.GridController',
        'WWS.view.passkey.GridViewModel'
    ],
    controller: 'passkeygrid',
    viewModel: {
        type: 'passkeygrid'
    },

    config: {
        iconCls: 'x-fa fa-folder-open',
        border: 0,
        scrollable: true,
        selModel: {
            selType: 'checkboxmodel',
            ignoreRightMouseSelection: true
        },
        forceFit: true,
        bind: {
            title: '{path}',
            store: '{passkeygridstore}'
        }
    },
    emptyText: T.__("This Group is empty."),

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

    bbar: [
        {
            text: Glb.btnSetting.refreshText,
            iconCls: Glb.btnSetting.refreshIconCls,
            handler: 'onRefresh'
        }
    ],

    tbar: [
        {
            // text: T.__("Parent directory"),
            tooltip: T.__("Parent directory"),
            iconCls: 'x-fa fa-level-up',
            btnName: 'parentDir',
            disabled: true,
            handler: 'onClickParentDir'
        },
        ' ',
        {
            tooltip: T.__("New Key"),
            icon: Cake.image.path+'/key_add.png',
            handler: 'onClickNewKey'
        },
        {
            icon: Cake.image.path+'/folder_add.png',
            tooltip: T.__("New Group"),
            handler: 'onClickNewGroup'
        },
        ' ',
        {
            btnName: 'tbarDelete',
            tooltip: Glb.btnSetting.deleteText,
            iconCls: Glb.btnSetting.deleteIconCls2,
            disabled: true,
            handler: 'onClickDelete'
        },
        {
            btnName: 'tbarClone',
            tooltip: T.__("Clone"),
            icon: Cake.image.path+'/key_duplicate.png',
            disabled: true,
            handler: 'onClickClone'
        },
        ' ',
        {
            btnName: 'tbarRename',
            tooltip: T.__("Rename"),
            iconCls: 'x-fa fa-edit',
            disabled: true,
            handler: 'onClickRename'
        },
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
        },
        '->',
        {
            xtype: 'textfield',
            emptyText: Glb.btnSetting.searchText,
            triggers: {
                search: {
                    cls: 'x-form-search-trigger',
                    tooltip: Glb.btnSetting.searchText,
                    handler: 'onClickSearch'
                }
            },
            listeners: {
                specialkey: 'enterSearch'
            }
        }
    ],

    listeners: {
        itemdblclick: 'onItemDblclick',
        selectionchange: 'onSelectionchange',
        itemmousedown: PKF.events.itemmousedown,
        itemmouseup: PKF.events.itemmouseup,
        containermouseup: 'onContainerMouseUp'
    }
});