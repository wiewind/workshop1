/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define ('WWS.view.jobapplications.edit.JobStatusGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'jobapplicationseditjobstatusgrid',

    requires: [
        'WWS.view.jobapplications.edit.JobStatusWindow',

        'WWS.view.jobapplications.edit.JobStatusGridController',
        'WWS.view.jobapplications.edit.JobStatusGridViewModel'
    ],
    controller: 'jobapplicationseditjobstatusgrid',
    viewModel: {
        type: 'jobapplicationseditjobstatusgrid'
    },

    bind: '{jobStatusStore}',

    config: {
        title: T.__("Status"),
        scrollable: true,
        border: 1,
        height: 350,
        width: '100%',

        plugins: [
            Ext.create("Ext.grid.plugin.CellEditing", {
                clicksToEdit: 1,
                listeners: {
                    edit: 'onCellEdit'
                }
            })
        ],
        selType: 'cellmodel',

        tbar: [
            {
                text: Glb.btnSetting.addText,
                tooltip: Glb.btnSetting.addText,
                iconCls: Glb.btnSetting.addIconCls,
                handler: 'onClickAdd'
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
            width:30,
            dataIndex: 'status_id',
            renderer: function(v, meta, rec){
                meta.tdAttr = 'data-qtip="' + rec.get('status_name') + '"';
                return '<img src="' + Cake.image.path + '/jobstatus/' + JAF.getJobStatusImageId(v) + '.png" />';
            }
        },
        {
            text: T.__("Status"),
            width:100,
            dataIndex: 'status_name'
        },
        {
            text: T.__("Date"),
            width:150,
            dataIndex: 'date',
            renderer: Ext.util.Format.dateRenderer(SSD.data.formatting.date_format_short + ' H:i:s')
        },
        {
            text: T.__("Notice"),
            flex: 1,
            dataIndex: 'notice',
            editor: {
                allowBlank: true
            }
        }
    ],

    listeners: {
        select: 'onItemSelect'
    }
});