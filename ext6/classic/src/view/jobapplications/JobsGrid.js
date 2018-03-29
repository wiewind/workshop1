/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define ('WWS.view.jobapplications.JobsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'jobapplicationsjobsgrid',

    requires: [
        'WWS.view.jobapplications.JobsGridController',
        'WWS.view.jobapplications.JobsGridViewModel'
    ],
    controller: 'jobapplicationsjobsgrid',
    viewModel: {
        type: 'jobapplicationsjobsgrid'
    },

    bind: {
        store: '{jobsStore}'
    },
    
    emptyText: T.__("There ist not jobs."),

    config: {
        title: T.__("Jobs"),
        iconCls: 'x-fa fa-black-tie',
        closable: false,
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
            '-',
            {
                text: T.__("Send Mail"),
                tooltip: T.__("Send Mail"),
                iconCls: Glb.btnSetting.sendIconCls,
                itemId: 'sendBtn',
                disabled: true,
                handler: 'onClickSendEmail'
            },
            '-',
            {
                text: Glb.btnSetting.deleteText,
                tooltip: Glb.btnSetting.deleteText,
                iconCls: Glb.btnSetting.deleteIconCls2,
                itemId: 'deleteBtn',
                disabled: true,
                handler: 'onClickDelete'
            },
            '->',
            {
                text: T.__("Tools"),
                tooltip: T.__("Tools"),
                iconCls: 'x-fa fa-gears',
                menu: [
                    {
                        text: T.__("Mailsetting"),
                        tooltip: T.__("Mailsetting"),
                        iconCls: 'x-fa fa-envelope-o',
                        handler: 'onClickEmailSetting'
                    },
                    {
                        text: T.__("Attachments"),
                        tooltip: T.__("Attachments"),
                        iconCls: 'x-fa fa-shekel',
                        handler: 'onClickAttachments'
                    }
                ]
            }
        ]
    },

    columns: [
        {
            text: T.__("Status"),
            dataIndex: 'statustype_id',
            width:60,
            renderer: function(v, meta, rec){
                meta.tdAttr = 'data-qtip="' + rec.get('status') + '"';
                return '<img src="' + Cake.image.path + '/jobstatus/' + JAF.getJobStatusImageId(v) + '.png" />';
            }
        }, {
            text: T.__("email applied"),
            dataIndex: 'email_applied',
            width:80,
            renderer: function(v, meta, rec){
                if (v) return '<div class="x-fa fa-check-square-o green">';
                return '<div class="x-fa fa-square-o">';
            }
        }, {
            text: T.__("Date"),
            dataIndex: 'created',
            width:130,
            renderer: Ext.util.Format.dateRenderer(SSD.data.formatting['date_format'] + ' H:i:s')
        }, {
            text: T.__("Job"),
            dataIndex: 'jobname',
            flex: 1
        }, {
            text: T.__("Company"),
            dataIndex: 'company',
            flex: 1
        }, {
            text: T.__("Postcode"),
            dataIndex: 'postcode'
        }, {
            text: T.__("town"),
            dataIndex: 'town'
        }, {
            text: T.__("street"),
            dataIndex: 'street'
        }, {
            text: T.__("Contact"),
            dataIndex: 'contact'
        }, {
            text: T.__("Telephone"),
            dataIndex: 'telephone'
        }, {
            text: T.__("Fax"),
            dataIndex: 'fax'
        }, {
            text: T.__("Email"),
            dataIndex: 'email'
        }, {
            text: T.__("URL"),
            dataIndex: 'url'
        }
    ],

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});