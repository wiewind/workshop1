/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define ('WWS.view.jobapplications.mailsetting.Panel', {
    extend: 'WWS.ux.MusterForm',
    xtype: 'jobapplicationsmailsetting',

    requires: [
        'WWS.view.jobapplications.mailsetting.PanelController',
        'WWS.view.jobapplications.mailsetting.PanelViewModel'
    ],
    controller: 'jobapplicationsmailsetting',
    viewModel: {
        type: 'jobapplicationsmailsetting'
    },


    input: {
        url: Cake.api.path + '/jobapplications/json/saveMailsetting'
    },

    config: {
        title: T.__("Mailsetting"),
        iconCls: 'x-fa fa-envelope-o',
        layout: 'vbox',
        closable: true,
        scrollable: true,
        defaults: {
            width: '100%'
        },
        tbar: [
            {
                text: Glb.btnSetting.saveText,
                tooltip: Glb.btnSetting.saveText,
                iconCls: Glb.btnSetting.saveIconCls,
                handler: 'onSubmit'
            },
            {
                text: Glb.btnSetting.cancelText,
                tooltip: Glb.btnSetting.cancelText,
                iconCls: Glb.btnSetting.cancelIconCls,
                handler: 'onClickCancel'
            }
        ]
    },
    
    initComponent: function () {
        this.items = this.buildFormItems();
        this.callParent();
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'hiddenfield',
                name: 'id',
                bind: {
                    value: '{mailsetting.id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: T.__("your email"),
                labelStyle: 'font-weight: bold; padding: 5px',
                labelAlign: 'top',
                allowBlank:false,
                vtype: 'email',
                bind: {
                    value: '{mailsetting.email}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'ckeditor',
                name: 'message',
                fieldLabel: T.__("Message of Email"),
                labelStyle: 'font-weight: bold; padding: 5px',
                labelAlign: 'top',
                flex: 1,
                inputAttrTpl: 'wrap="off"',
                allowBlank:false,
                CKConfig: {
                    baseFloatZIndex: 99999
                },
                bind: {
                    value: '{mailsetting.message}'
                }
            }
        ];
    },

    listeners: {
        activate: Glb.History.add
    }
});
