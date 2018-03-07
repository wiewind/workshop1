/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.filemanagement.search.ResultWindow', {
    extend: 'Ext.window.Window',
    xtype: 'filemanagementsearchresultwindow',

    requires: [
        'WWS.view.filemanagement.search.ResultWindowController',
        'WWS.view.filemanagement.search.ResultWindowViewModel'
    ],
    controller: 'filemanagementsearchresultwindow',
    viewModel: {
        type: 'filemanagementsearchresultwindow'
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
                    text: T.__("Path"),
                    flex: 1,
                    dataIndex: 'FilemanagementFolder.path',
                    renderer: function (v, meta, rec) {
                        return FMF.displayPath(v);
                    }
                },
                {
                    text: T.__("Size"),
                    width:100,
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
                    renderer: function (v, meta, rec) {
                        if (rec.get('isFile')) {
                            v = rec.get('FilemanagementFile.modified');
                        }
                        return Glb.Date.displayDateFromString(v, ' H:i:s');
                    }
                },
                {
                    text: T.__("Modified by"),
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
                    tooltip: T.__("Download"),
                    iconCls: 'x-fa fa-download',
                    btnName: 'download',
                    disabled: true,
                    handler: 'onClickDownload'
                },
                {
                    tooltip: T.__("add to worklist"),
                    iconCls: 'x-fa fa-ge',
                    disabled: true,
                    btnName: 'toworklist',
                    handler: 'onClickWorklist'
                },
                {
                    tooltip: T.__("Copy URL"),
                    iconCls: 'x-fa fa-copy',
                    btnName: 'copyurl',
                    disabled: true,
                    handler: 'onClickCopyUrl'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: '{0} - {1} of {2}',
                emptyMsg: T.__("Empty")
            },
            listeners: {
                selectionchange: 'onSelectionchange',
                itemdblclick: 'onItemdblclick'
            }
        }
    ]
});