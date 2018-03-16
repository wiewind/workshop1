/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FileViewerWindow', {
    extend: 'Ext.window.Window',
    xtype: 'filemanagementwindowfileviewer',

    requires: [
        'WWS.view.filemanagement.window.FileViewerWindowController',
        'WWS.view.filemanagement.window.FileViewerWindowViewModel'
    ],
    controller: 'filemanagementwindowfileviewer',
    viewModel: {
        type: 'filemanagementwindowfileviewer'
    },

    config: {
        bind: {
            title: T.__("File Previewer") + ' {name}',
            icon: Cake.api.path + '/filetypes/icon/{getSuffix}'
        },
        autoShow: true,
        width: 1000,
        height: 800,
        layout: 'fit',
        maximizable: true,
        modal: true
    },

    tbar: [
        {
            text: Glb.btnSetting.deleteText,
            tooltip: Glb.btnSetting.deleteText,
            iconCls: Glb.btnSetting.deleteIconCls2,
            handler: 'onClickDelete'
        },
        {
            text: T.__("Rename"),
            tooltip: T.__("Rename"),
            iconCls: 'x-fa fa-edit',
            handler: 'onClickRename'
        },
        '-',
        {
            text: T.__("Copy URL"),
            tooltip: T.__("Copy URL"),
            iconCls: 'x-fa fa-copy',
            handler: 'onClickCopyUrl'
        },
        '-',
        {
            text: T.__("Download"),
            tooltip: T.__("Download File"),
            iconCls: 'x-fa fa-cloud-download',
            handler: 'onClickDownload'
        },
        {
            text: T.__("Worklist"),
            tooltip: T.__("add to worklist"),
            iconCls: 'x-fa fa-ge',
            handler: 'onClickWorklist'
        },
        '->',
        {
            xtype: 'component',
            bind: {
                html: T.__('Modified') + ' {displayModified}'
            }
        }
    ]
});