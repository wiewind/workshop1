/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.worknotes.show.EditPanel', {
    extend: 'WWS.ux.MusterForm',
    xtype: 'worknotesshoweditpanel',

    requires: [
        'WWS.view.worknotes.show.EditPanelController',
        'WWS.view.worknotes.show.EditPanelViewModel'
    ],
    controller: 'worknotesshoweditpanel',
    viewModel: {
        type: 'worknotesshoweditpanel'
    },

    input: {
        url: Cake.api.path + '/worknotes/json/save'
    },

    config: {
        border: 1,
        margin: 5,
        layout: 'border',
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
        var projectsStore = Ext.ComponentQuery.query('worknotesprojectsgrid')[0].getStore();
        return [
            {
                xtype: 'fieldcontainer',
                region: 'north',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id',
                        bind: {
                            value: '{id}'
                        }
                    },
                    {
                        xtype: 'clearcombo',
                        name: 'worknote_project_id',
                        hiddenName: 'worknote_project_id',
                        fieldLabel: T.__("Project"),
                        labelStyle: 'font-weight: bold; padding: 5px',
                        labelAlign: 'top',
                        padding: '5',
                        store: projectsStore,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        bind: {
                            value: '{worknote_project_id}'
                        },
                        emptyText : T.__("Unknown"),
                        editable: false,
                        forceSelection: true,
                        allowBlank: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'title',
                        fieldLabel: T.__("Title"),
                        labelStyle: 'font-weight: bold; padding: 5px',
                        labelAlign: 'top',
                        flex: 1,
                        padding: '5',
                        bind: {
                            value: '{title}'
                        },
                        allowBlank:false
                    },
                    {
                        xtype: 'datefield',
                        name: 'date',
                        fieldLabel: T.__("Date"),
                        labelStyle: 'font-weight: bold; padding: 5px',
                        labelAlign: 'top',
                        padding: '5',
                        format: SSD.data.formatting.date_format,
                        submitFormat: 'Y-m-d',
                        bind: {
                            value: '{displayDate}'
                        }
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                region: 'center',
                layout: 'fit'
            }
        ];
    },

    buildCkeditor: function () {
        var cp = {
            xtype: 'ckeditor',
            name: 'text',
            border: 0,
            fieldLabel: null,
            padding: '5',
            fieldStyle: 'padding: 5px;',
            inputAttrTpl: 'wrap="off"',
            CKConfig: {
                baseFloatZIndex: 99999,
                value: this.getViewModel().get('text')
            }
        };

        this.down('fieldcontainer[region="center"]').add(cp);
    }
});