/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define ('WWS.view.jobapplications.edit.Panel', {
    extend: 'WWS.ux.MusterForm',
    xtype: 'jobapplicationseditpanel',

    requires: [
        'WWS.view.jobapplications.edit.JobAttachmentsGrid',
        'WWS.view.jobapplications.edit.JobStatusGrid',

        'WWS.view.jobapplications.edit.PanelController',
        'WWS.view.jobapplications.edit.PanelViewModel'
    ],
    controller: 'jobapplicationseditpanel',
    viewModel: {
        type: 'jobapplicationseditpanel'
    },

    job_id: 0,

    input: {
        url: Cake.api.path + '/jobapplications/transjson/saveJob'
    },

    config: {
        bind: {
            title: '{showTitle}'
        },
        iconCls: 'x-fa fa-black-tie',
        layout: 'hbox',
        closable: true,
        scrollable: true,
        defaults: {
            margin: 5,
            flex: 1,
            border: 1
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
    
    buildItems: function () {
        var vm = this.getViewModel();
        this.add([
            {
                xtype: 'panel',
                title: T.__("Job Information"),
                layout: 'vbox',
                bodyPadding: 5,
                defaults: {
                    xtype: 'textfield',
                    width: '100%',
                    layout: 'hbox',
                    padding: 5,
                    labelWidth: 70,
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 70
                    }
                },
                items: this.buildFormItems()
            }
        ]);

        var eastPanelItems = [];

        if (this.job_id > 0) {
            eastPanelItems = [
                this.buildAttachments(),
                this.buildStatus()
            ];
        } else {
            var checkboxItems = [];
            Ext.ComponentQuery.query('jobapplicationspanel')[0].getViewModel().getStore('allAttachmentsStore').each(function (rec, index) {
                var record = rec.getData();
                checkboxItems.push({
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    minWidth: 300,
                    padding: '5 10',
                    items: [
                        {
                            xtype: 'checkbox',
                            width: 30,
                            name      : 'attc[' + record.id + ']',
                            inputValue: record.id,
                            checked: record.default_send == 1
                        },
                        {
                            xtype: 'component',
                            padding: '5px 0 0 0',
                            width: 24,
                            html: '<img src="' + Cake.api.path + '/filetypes/icon/'+Wiewind.File.getFileSuffix(record.file) + '" /> '
                        },
                        {
                            xtype: 'component',
                            padding: '5px 0 0 0',
                            flex: 1,
                            html: '<a href="'+ Cake.jobattachment.root +'/' + record.user_id + '/' + record.file + '" target="_blank">' + record.name + '</a>'
                        }
                    ]
                });
            });

            eastPanelItems = {
                xtype: 'panel',
                title: T.__("Attachments"),
                width: '100%',
                minWidth: 300,
                frame: true,
                items: checkboxItems
            }
        }

        this.add({
            xtype: 'container',
            layout: 'vbox',
            flex: 1,
            border: 0,
            defaults: {
                padding: '0 0 20px 0'
            },
            items: eastPanelItems
        });
    },

    buildFormItems: function () {
        var me = this,
            items = [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    bind: {
                        value: '{id}'
                    }
                },
                {
                    fieldLabel: T.__("Job"),
                    name: 'jobname',
                    allowBlank: false,
                    bind: {
                        value: '{jobname}'
                    },
                    listeners: {
                        specialkey: 'submitOnEnter'
                    }
                },
                {
                    fieldLabel: T.__("Company"),
                    name: 'company',
                    allowBlank: false,
                    bind: {
                        value: '{company}'
                    },
                    listeners: {
                        specialkey: 'submitOnEnter'
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            fieldLabel: T.__("Email"),
                            name: 'email',
                            vtype: 'email',
                            flex: 1,
                            bind: {
                                value: '{email}'
                            },
                            listeners: {
                                specialkey: 'submitOnEnter'
                            }
                        },
                        {
                            xtype: 'component',
                            width: 50
                        },
                        {
                            fieldLabel: T.__("Contact Person"),
                            name: 'contact',
                            flex: 1,
                            bind: {
                                value: '{contact}'
                            },
                            listeners: {
                                specialkey: 'submitOnEnter'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            fieldLabel: T.__("Postcode"),
                            name: 'postcode',
                            bind: {
                                value: '{postcode}'
                            },
                            flex: 1,
                            listeners: {
                                specialkey: 'submitOnEnter'
                            }
                        },
                        {
                            xtype: 'component',
                            width: 50
                        },
                        {
                            fieldLabel: T.__("Town"),
                            name: 'town',
                            bind: {
                                value: '{town}'
                            },
                            flex: 1,
                            listeners: {
                                specialkey: 'submitOnEnter'
                            }
                        }
                    ]
                },
                {
                    fieldLabel: T.__("Street"),
                    name: 'street',
                    bind: {
                        value: '{street}'
                    },
                    listeners: {
                        specialkey: 'submitOnEnter'
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            fieldLabel: T.__("Telephone"),
                            name: 'telephone',
                            bind: {
                                value: '{telephone}'
                            },
                            flex: 1,
                            listeners: {
                                specialkey: 'submitOnEnter'
                            }
                        },
                        {
                            xtype: 'component',
                            width: 50
                        },
                        {
                            fieldLabel: T.__("Fax"),
                            name: 'fax',
                            bind: {
                                value: '{fax}'
                            },
                            flex: 1,
                            listeners: {
                                specialkey: 'submitOnEnter'
                            }
                        }
                    ]
                },
                {
                    fieldLabel: T.__("URL"),
                    name: 'url',
                    bind: {
                        value: '{url}'
                    },
                    listeners: {
                        specialkey: 'submitOnEnter'
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: T.__("Comment"),
                    name: 'comment',
                    bind: {
                        value: '{comment}'
                    },
                    height: 100
                }
            ];
        return items;
    },

    buildAttachments: function () {
        var vm = this.getViewModel();
        return Ext.create('WWS.view.jobapplications.edit.JobAttachmentsGrid', {
            viewModel: {
                parent: vm
            }
        });
    },

    buildStatus: function () {
        var vm = this.getViewModel();
        return Ext.create('WWS.view.jobapplications.edit.JobStatusGrid', {
            viewModel: {
                parent: vm
            }
        });
    }
});
