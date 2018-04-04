/**
 * Created by benying.zou on 29.03.2018.
 */
Ext.define ('WWS.view.jobapplications.attachment.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'jobapplicationsattachmentgrid',

    requires: [
        'WWS.view.jobapplications.attachment.GridController',
        'WWS.view.jobapplications.attachment.GridViewModel'
    ],
    controller: 'jobapplicationsattachmentgrid',
    viewModel: {
        type: 'jobapplicationsattachmentgrid'
    },

    bind: '{allAttachmentsStore}',

    config: {
        title: T.__("Attachments"),
        iconCls: 'x-fa fa-shekel',
        closable: true,
        scrollable: true,

        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: '{0} - {1} of {2}',
            emptyMsg: T.__("There ist not jobs.")
        },

        tbar: [
            {
                text: Glb.btnSetting.newText,
                tooltip: Glb.btnSetting.newText,
                iconCls: Glb.btnSetting.newIconCls,
                itemId: 'newBtn',
                handler: 'onClickNew'
            },
            {
                text: Glb.btnSetting.editText,
                tooltip: Glb.btnSetting.editText,
                iconCls: Glb.btnSetting.editIconCls,
                itemId: 'editBtn',
                disabled: true,
                handler: 'onClickEdit'
            },
            {
                text: Glb.btnSetting.deleteText,
                tooltip: Glb.btnSetting.deleteText,
                iconCls: Glb.btnSetting.deleteIconCls2,
                itemId: 'deleteBtn',
                disabled: true,
                handler: 'onClickDelete'
            }
        ]
    },

    columns: [
        {
            xtype:'actioncolumn',
            width:30,
            dataIndex: 'file',
            renderer: function(v){
                return '<img src="' + Cake.api.path + '/filetypes/icon/'+Wiewind.File.getFileSuffix(v) + '" />';
            }
        },
        {
            header: T.__("Name"),
            flex: 1,
            dataIndex: 'name',
            renderer: function(v, meta, rec){
                return '<a href="' + Cake.api.path + '/jobapplications/showAttachmentFile/' + rec.get('id') + '" target="_blank">' + v + '</a>';
            }
        },
        {
            header: T.__("Default Send"),
            dataIndex: 'default_send',
            renderer: function(v){
                return (v) ? '<div class="x-fa fa-check-square green"></div>' : '';
            }
        }
    ],

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});