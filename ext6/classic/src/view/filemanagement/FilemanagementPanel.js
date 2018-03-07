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

    initComponent: function () {
        Ext.apply(Ext.form.VTypes, {
            fileTypeAndSize : function(val, field){
                var upload = field.fileInputEl.dom,
                    files = upload.files;

                for (var i = 0; i < files.length; i++) {
                    var message = '',
                        suffix = Wiewind.File.getFileSuffix(files[i].name);
                    if (Wiewind.Array.in_array(suffix, Cake.filemanagement.notAllowdTypes)) {
                        return false;
                    }
                    if (files[i].size > Cake.filemanagement.maxFileSize) {
                        return false;
                    }
                }
                return true;
            },
            fileTypeAndSizeText: T.__("File is invalidate."),

            foldername : function(val, field){
                var reg= /^[^\\\/\*\?\|<>:'"]+$/;
                return (val!=='.')&&(val!=='..')&&(reg.test(val));
            },
            foldernameText: T.__("Folder is invalidate.")
        });
        this.callParent();
    }
});