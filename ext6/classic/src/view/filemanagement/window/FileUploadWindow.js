/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('WWS.view.filemanagement.window.FileUploadWindow', {
    extend: 'Ext.window.Window',
    xtype: 'filemanagementwindowfileupload',

    requires: [
        'WWS.view.filemanagement.window.FileUploadWindowController',
        'WWS.view.filemanagement.window.FileUploadWindowViewModel'
    ],
    controller: 'filemanagementwindowfileupload',
    viewModel: {
        type: 'filemanagementwindowfileupload'
    },

    config: {
        bind: {
            title: '{showWindowTitle}'
        },
        iconCls: 'x-fa fa-upload',
        layout: 'border',
        width: 600,
        height: 500,
        autoShow: true
    },

    initComponent: function () {
        var controller = this.getController();
        this.items = [
            {
                xtype: 'form',
                region: 'north',
                height: 160,
                html: '<div id="drop_area">' + T.__('Drag documents to this area...') + '</div>',
                bbar: [
                    {
                        xtype: 'multifilefield',
                        name: 'documents[]',
                        // labelWidth: 0,
                        // width: '100%',
                        buttonOnly: true,
                        buttonText: T.__("Add Files")+'...',
                        vtype: 'fileTypeAndSize',
                        afterFileChange: function (files) {
                            controller.afterFileChange(files)
                        }
                    }
                ]
            },
            {
                xtype: 'grid',
                region: 'center',
                title: null,
                scrollable: true,
                // border: '1px 0 0 0',
                bind: {
                    store: '{uploadFiles}'
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
                    },
                    {
                        xtype:'actioncolumn',
                        width:30,
                        items: [
                            {
                                iconCls: Glb.btnSetting.deleteIconCls2,
                                tooltip: Glb.btnSetting.deleteText,
                                handler: 'onDelete'
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent();
    },

    buttons: [
        {
            text: Glb.btnSetting.saveText,
            tooltip: Glb.btnSetting.saveText,
            iconCls: Glb.btnSetting.saveIconCls,
            handler: 'onSave'
        },
        {
            text: Glb.btnSetting.cancelText,
            tooltip: Glb.btnSetting.cancelText,
            iconCls: Glb.btnSetting.cancelIconCls,
            handler: 'onCancel'
        }
    ]
});