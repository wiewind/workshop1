/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.worklist.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'filemanagementworklistgrid',

    requires: [
        'WWS.view.filemanagement.worklist.GridController',
        'WWS.view.filemanagement.worklist.GridViewModel'
    ],
    controller: 'filemanagementworklistgrid',
    viewModel: {
        type: 'filemanagementworklistgrid'
    },

    bind: '{fmWorklist}',

    config: {
        title: T.__('Worklist'),
        iconCls: 'x-fa fa-ge',
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
        emptyMsg: T.__("Empty")
    },

    emptyText: T.__("There are not files in worklist."),

    columns: [
        {
            width:30,
            dataIndex: 'icon',
            renderer: function(v, meta, rec) {
                return '<img src="' + v + '" />';
            }
        },
        {
            text: T.__("File"),
            flex: 1,
            dataIndex: 'FilemanagementFile.name',
            renderer: function(v, meta, rec){
                var text = FMF.displayPath(rec.get('FilemanagementFolder.path')) + '/<b>' + v + '</b>';
                if (rec.get('cls')) {
                    return '<div class="' + rec.get('cls') + '">' + text + '</div>';
                }
                return text;
            }
        },
        {
            text: T.__("Size"),
            width: 100,
            align: 'right',
            dataIndex: 'FilemanagementFile.size',
            renderer: function (v, meta, rec) {
                return Ext.util.Format.fileSize(v);
            }
        },
        {
            text: T.__("Modified"),
            dataIndex: 'FilemanagementFile.modified',
            width: 150,
            renderer: function (v, meta, rec) {
                return Glb.Date.displayDateFromString(v, ' H:i:s');
            }
        },
        {
            text: T.__("Modified by"),
            width: 100,
            dataIndex: 'FilemanagementFile.modified_by_name'
        }
    ],

    tbar: [
        {
            tooltip: T.__("Download"),
            iconCls: 'x-fa fa-download',
            btnName: 'download',
            disabled: true,
            handler: 'onClickDownload'
        },
        {
            tooltip: T.__("Remove from worklist"),
            iconCls: 'x-fa fa-remove',
            btnName: 'delete',
            disabled: true,
            handler: 'onClickDelete'
        },
        {
            tooltip: T.__("Share"),
            iconCls: 'x-fa fa-share-alt',
            btnName: 'share',
            disabled: true,
            handler: 'onClickShare'
        },
        ' ',
        {
            tooltip: T.__("Rename"),
            iconCls: 'x-fa fa-edit',
            disabled: true,
            btnName: 'rename',
            handler: 'onClickRename'
        },
        {
            tooltip: T.__("Copy URL"),
            iconCls: 'x-fa fa-copy',
            btnName: 'copyurl',
            disabled: true,
            handler: 'onClickCopyUrl'
        }
    ],

    listeners: {
        activate: Glb.History.add,

        selectionchange: 'onSelectionchange',

        itemdblclick: 'itemDblClick'
    }

});