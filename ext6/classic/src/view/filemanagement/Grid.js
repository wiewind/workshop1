/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'filemanagementgrid',

    requires: [
        'WWS.view.filemanagement.GridController',
        'WWS.view.filemanagement.GridViewModel'
    ],
    controller: 'filemanagementgrid',
    viewModel: {
        type: 'filemanagementgrid'
    },

    config: {
        bind: {
            title: '{showPath}',
            store: '{folderItems}'
        },
        iconCls: 'x-fa fa-folder-open-o',
        border: 0,
        scrollable: true,
        selModel: {
            selType: 'checkboxmodel',
            ignoreRightMouseSelection: true
        },
        forceFit: true
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("This folder is empty.")
    },
    emptyText: T.__("This folder is empty."),

    columns: [
        {
            width:30,
            dataIndex: 'icon',
            renderer: function(v, meta, rec){
                if (!v) {
                    return '<div class="x-fa fa-folder-o"></div>';
                }
                return '<img src="' + v + '" />';
            }
        },
        {
            text: T.__("Name"),
            flex: 1,
            dataIndex: 'text',
            renderer: function(v, meta, rec){
                if (rec.get('cls')) {
                    return '<div class="' + rec.get('cls') + '">' + v + '</div>';
                }
                return v;
            }
        },
        {
            text: T.__("Size"),
            width: 100,
            align: 'right',
            dataIndex: 'FilemanagementFile.size',
            renderer: function (v, meta, rec) {
                if (rec.get('isFile')) {
                    return Ext.util.Format.fileSize(v);
                }
                return '';
            }
        },
        {
            text: T.__("Modified"),
            dataIndex: 'FilemanagementFolder.modified',
            width: 150,
            renderer: function (v, meta, rec) {
                if (rec.get('isFile')) {
                    v = rec.get('FilemanagementFile.modified');
                }
                return Glb.Date.displayDateFromString(v, ' H:i:s');
            }
        },
        {
            text: T.__("Modified by"),
            width: 100,
            dataIndex: 'FilemanagementFolder.modified_by_name',
            renderer: function (v, meta, rec) {
                if (rec.get('isFile')) {
                    return rec.get('FilemanagementFile.modified_by_name');
                }
                return v;
            }
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
            // text: T.__("New Folder"),
            tooltip: T.__("New Folder"),
            iconCls: Glb.btnSetting.addIconCls,
            handler: 'onClickNewFolder'
        },
        {
            // text: T.__("Upload"),
            tooltip: T.__("Upload"),
            iconCls: 'x-fa fa-upload',
            btnName: 'upload',
            disabled: true,
            handler: 'onClickUpload'
        },
        ' ',
        {
            // text: T.__("Download"),
            tooltip: T.__("Download"),
            iconCls: 'x-fa fa-download',
            btnName: 'download',
            disabled: true,
            handler: 'onClickDownload'
        },
        {
            // text: T.__("Delete"),
            tooltip: Glb.btnSetting.deleteText,
            iconCls: Glb.btnSetting.deleteIconCls2,
            btnName: 'delete',
            disabled: true,
            handler: 'onClickDelete'
        },
        {
            // text: T.__("Worklist"),
            tooltip: T.__("add to worklist"),
            iconCls: 'x-fa fa-ge',
            // iconCls: 'x-fa fa-share-alt',
            disabled: true,
            btnName: 'toworklist',
            handler: 'onClickWorklist'
        },
        ' ',
        {
            // text: T.__("Rename"),
            tooltip: T.__("Rename"),
            iconCls: 'x-fa fa-edit',
            disabled: true,
            btnName: 'rename',
            handler: 'onClickRename'
        },
        {
            // text: T.__("Copy URL"),
            tooltip: T.__("Copy URL"),
            iconCls: 'x-fa fa-copy',
            btnName: 'copyurl',
            disabled: true,
            handler: 'onClickCopyUrl'
        },
        '->',
        {
            xtype: 'searchfield',
            emptyText: Glb.btnSetting.searchText,
            width: 300,
            listeners: {
                specialkey: 'enterSearch'
            },
            onClickCancel: 'onClickCancel',
            onClickSearch: 'onClickSearch'
        }
    ],

    listeners: {
        activate: Glb.History.add,

        selectionchange: 'onSelectionchange',

        itemdblclick: 'itemDblClick',

        itemmouseenter: FMF.events.itemmouseenter,

        itemmousedown: FMF.events.itemmousedown,

        itemmouseup: FMF.events.itemmouseup,

        containermouseup: 'onContainerMouseUp'
    }
});