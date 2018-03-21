/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.child.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolchildeditwindow',

    requires: [
        'WWS.view.school.child.EditWindowController',
        'WWS.view.school.child.EditWindowViewModel'
    ],
    controller: 'schoolchildeditwindow',
    viewModel: {
        type: 'schoolchildeditwindow'
    },

    input: {
        url: Cake.api.path + '/school/transjson/saveChild'
    },

    config: {
        title: T.__("Child"),
        iconCls: 'x-fa fa-child',
        width: 800
    },

    configForm: function () {
        return {
            defaults: {
                xtype: 'container',
                padding: 5,
                labelWidth: 70,
                layout: 'hbox',
                width: '100%',
                defaults: {
                    labelWidth: 70
                }
            }
        };
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'hiddenfield',
                name: 'id',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'class_id',
                bind: {
                    value: '{class_id}'
                }
            },
            {
                xtype: 'container',
                flex:1,
                items: [
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                text: T.__("Delete photo"),
                                tooltip: T.__("Delete photo"),
                                iconCls: Glb.btnSetting.deleteIconCls2,
                                margin: '5 0 0 0',
                                width: '100%',
                                bind: {
                                    hidden: '{hiddenDeletePhotoBtn}'
                                },
                                handler: 'onDeletePhoto'
                            },
                            {
                                xtype: 'image',
                                width: 150,
                                height: 150,
                                alt: 'photo',
                                bind: {
                                    src: '{showPhoto}'
                                }
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'new_photo',
                                bind: {
                                    value: '{new_photo}'
                                }
                            },
                            {
                                xtype: 'button',
                                text: T.__("Upload photo"),
                                tooltip: T.__("Upload photo"),
                                iconCls: 'x-fa fa-upload',
                                margin: '5 0 0 0',
                                width: '100%',
                                handler: 'onUploadPhoto'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        flex:1,
                        defaults: {
                            xtype: 'container',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                flex: 1,
                                margin: '5 0 5 10',
                                labelWidth: 70
                            }
                        },
                        items: [
                            {
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'firstname',
                                        fieldLabel: T.__("Firstname"),
                                        emptyText: T.__("Firstname"),
                                        allowBlank: false,
                                        bind: {
                                            value: '{firstname}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter',
                                            afterrender: 'fieldFocus'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'lastname',
                                        fieldLabel: T.__("Lastname"),
                                        emptyText: T.__("Lastname"),
                                        allowBlank: false,
                                        bind: {
                                            value: '{lastname}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter'
                                        }
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        xtype: 'combo',
                                        name: 'sex',
                                        fieldLabel: T.__("Sex"),
                                        emptyText: T.__("Sex"),
                                        store: Ext.create('Ext.data.Store', {
                                            fields: ['name', 'value'],
                                            data: [
                                                {value: 'f', name: T.__("Girl")},
                                                {value: 'm', name: T.__("Boy")}
                                            ]
                                        }),
                                        queryMode: 'local',
                                        valueField: 'value',
                                        displayField: 'name',
                                        editable: false,
                                        forceSelection: true,
                                        allowBlank: false,
                                        bind: {
                                            value: '{sex}'
                                        }
                                    },
                                    {
                                        xtype: 'cleardate',
                                        name: 'birthday',
                                        fieldLabel: T.__("Birthday"),
                                        emptyText: T.__("Birthday"),
                                        format: SSD.data.formatting.date_format,
                                        submitFormat: 'Y-m-d',
                                        // editable: false,
                                        bind: {
                                            value: '{birthday}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter'
                                        }
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        xtype: 'textarea',
                                        name: 'notice',
                                        flex:1,
                                        height: 100,
                                        padding: 5,
                                        emptyText: T.__("Notice"),
                                        bind: {
                                            value: '{notice}'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'telephoneCtn',
                title: T.__("Telephone"),
                collapsible: false,
                bordyPadding: 5,
                layout: 'vbox',
                maxHeight: 150,
                scrollable: true,
                defaults: {
                    xtype: 'container',
                    width: '100%',
                    layout: 'hbox',
                    defaultType: 'textfield'
                },
                items :[
                    {
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: T.__("Description"),
                                value: '',
                                height: 20,
                                width: 200
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: T.__("Number"),
                                value: '',
                                height: 20,
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                tooltip: T.__("add a new telephone"),
                                iconCls: Glb.btnSetting.addIconCls,
                                handler: 'addTelephoneLine'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'emailCtn',
                title: T.__("Email"),
                collapsible: false,
                bordyPadding: 5,
                layout: 'vbox',
                maxHeight: 150,
                scrollable: true,
                defaults: {
                    xtype: 'container',
                    width: '100%',
                    layout: 'hbox',
                    defaultType: 'textfield'
                },
                items :[
                    {
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: T.__("Description"),
                                height: 20,
                                width: 200
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: T.__("Email"),
                                height: 20,
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                style: {
                                    'text-align': 'right'
                                },
                                tooltip: T.__("add a new Email"),
                                iconCls: Glb.btnSetting.addIconCls,
                                handler: 'addEmailLine'
                            }
                        ]
                    }
                ]

            },
            {
                xtype: 'fieldset',
                itemId: 'addressCtn',
                title: T.__("Address"),
                collapsible: false,
                bordyPadding: 5,
                layout: 'vbox',
                maxHeight: 150,
                scrollable: true,
                defaults: {
                    xtype: 'container',
                    width: '100%',
                    layout: 'hbox',
                    defaultType: 'textfield'
                },
                items :[
                    {
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: T.__("Description"),
                                height: 20,
                                width: 200
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: T.__("Address"),
                                height: 20,
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                style: {
                                    'text-align': 'right'
                                },
                                tooltip: T.__("add a new Address"),
                                iconCls: Glb.btnSetting.addIconCls,
                                handler: 'addAddressLine'
                            }
                        ]
                    }
                ]

            }
        ];
    },

    callbackFn: function (data) {}
});
