/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.teacher.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolteachereditwindow',

    requires: [
        'WWS.view.school.teacher.EditWindowController',
        'WWS.view.school.teacher.EditWindowViewModel'
    ],
    controller: 'schoolteachereditwindow',
    viewModel: {
        type: 'schoolteachereditwindow'
    },

    input: {
        url: Cake.api.path + '/school/transjson/saveTeacher'
    },

    config: {
        bind: {
            title: T.__("Teacher")
        },
        iconCls: 'x-fa fa-user-secret',
        width: 600
    },

    configForm: function () {
        return {
            layout: 'hbox',
            defaults: {
                xtype: 'container',
                layout: 'vbox',
                defaults: {
                    width: '100%',
                    labelWidth: 70,
                    padding: 0
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
                flex: 1,
                items: [

                    {
                        xtype: 'combo',
                        name: 'sex',
                        fieldLabel: T.__("Sex"),
                        store: {
                            data: [
                                {value: 'f', name: T.__("Ms.")},
                                {value: 'm', name: T.__("Mr.")}
                            ]
                        },
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
                        xtype: 'textfield',
                        name: 'lastname',
                        fieldLabel: T.__("Lastname"),
                        allowBlank: false,
                        bind: {
                            value: '{lastname}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter',
                            afterrender: 'fieldFocus'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'firstname',
                        fieldLabel: T.__("Firstname"),
                        bind: {
                            value: '{firstname}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'cleardate',
                        name: 'birthday',
                        fieldLabel: T.__("Birthday"),
                        format: SSD.data.formatting.date_format,
                        submitFormat: 'Y-m-d',
                        editable: false,
                        bind: {
                            value: '{birthday}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'telephone',
                        fieldLabel: T.__("Telephone"),
                        bind: {
                            value: '{telephone}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'fax',
                        fieldLabel: T.__("Fax"),
                        bind: {
                            value: '{fax}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: T.__("Email"),
                        vtype: 'email',
                        bind: {
                            value: '{email}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'textarea',
                        name: 'description',
                        fieldLabel: T.__("Description"),
                        bind: {
                            value: '{description}'
                        }
                    }
                ]
            },
            {
                margin: '0 0 0 20',
                items: [
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
                        text: T.__("Photo upload"),
                        tooltip: T.__("Photo upload"),
                        iconCls: 'x-fa fa-upload',
                        margin: '5 0 0 0',
                        width: '100%',
                        handler: 'onUploadPhoto'
                    }
                ]
            }
        ];
    },

    callbackFn: function (data) {}
});
