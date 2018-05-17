/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define ('WWS.view.filemanagement.FilemanagementPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'filemanagementpanel',

    requires: [
        'WWS.view.filemanagement.Functions',
        'WWS.view.filemanagement.window.FolderCreateWindow',
        'WWS.view.filemanagement.window.RenameWindow',
        'WWS.view.filemanagement.window.FileViewerWindow',
        'WWS.view.filemanagement.window.FileUploadWindow',
        'WWS.view.filemanagement.NaviPanel',
        'WWS.view.filemanagement.Grid',
        'WWS.view.filemanagement.worklist.Grid',
        'WWS.view.filemanagement.window.ShareWindow',
        'WWS.view.filemanagement.search.ResultWindow'
    ],

    title: T.__m("filemanagement"),
    icon: Cake.image.path + '/board/filemanagement16.png',
    layout: 'border',
    closable: true,
    border: 0,
    bodyPadding: 10,

    addToHistory: false,

    items: [
        {
            xtype: 'filemanagementnavipanel',
            region: 'west'
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'fmTabpanel',
            items: [
                {
                    xtype: 'filemanagementgrid'
                },
                {
                    xtype: 'filemanagementworklistgrid'
                }
            ]
        }
    ],

    listeners: {
        activate: Glb.History.add
    }
});