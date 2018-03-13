/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('WWS.view.filemanagement.window.FileUploadWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'filemanagementwindowfileupload',

    requires: [
        'WWS.view.filemanagement.window.FileUploadWindowController',
        'WWS.view.filemanagement.window.FileUploadWindowViewModel'
    ],
    controller: 'filemanagementwindowfileupload',
    viewModel: {
        type: 'filemanagementwindowfileupload'
    },

    input: {
        url: Cake.api.path + '/filemanagement/json/filesUpload',
        waitMsg: T.__("Uploading your file(s)..."),
        timeout: 300000
    },

    config: {
        bind: {
            title: 'showWindowTitle'
        },
        iconCls: 'x-fa fa-upload',
        layout: 'fit',
        width: 600,
        height: 400,
        autoShow: true
    },

    configForm: function () {
        var me = this;
        return {
            layout: 'fit',
            bodyPadding: 0,
            padding: 0,
            tbar: [
                {
                    xtype: 'multifilefield',
                    id: 'documentsField',
                    name: 'documents[]',
                    fieldLabel: T.__("Files"),
                    labelWidth: 60,
                    padding: 5,
                    width: '100%',
                    allowBlank: false,
                    buttonText: T.__("Select Files")+'...',
                    vtype: 'fileTypeAndSize',
                    afterFileChange: function (files) {
                        me.getController().afterFileChange(files);
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'folderId',
                    bind: {
                        value: '{id}'
                    }
                }
            ]
        };
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'grid',
                title: null,
                scrollable: true,
                // border: '1px 0 0 0',
                store: {
                    fields: ['name', 'size', 'message']
                },
                columns: [
                    {
                        width:30,
                        dataIndex: 'message',
                        renderer: function (v, meta, rec) {
                            var img = (v) ? '/cross.png' : '/ok_green_q.png';
                            meta.tdAttr = 'data-qtip="' + rec.get('message') + '"';
                            return '<img src="' + Cake.image.path + img + '" />';
                        }
                    },
                    {
                        text: T.__("File"),
                        dataIndex: 'name',
                        flex: 1,
                        renderer: function(v, meta, rec) {
                            meta.tdAttr = 'data-qtip="' + rec.get('message') + '"';
                            return v;
                        }
                    },
                    {
                        text: T.__("Size"),
                        dataIndex: 'size',
                        width: 100,
                        renderer: function(v, meta, rec) {
                            meta.tdAttr = 'data-qtip="' + rec.get('message') + '"';
                            return Ext.util.Format.fileSize(v);
                        }
                    }
                ]
            }
        ];
    }
});