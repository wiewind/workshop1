/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define('WWS.view.addressbook.ContactPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'addressbookcontactpanel',

    requires: [
        'WWS.view.addressbook.ContactPanelController',
        'WWS.view.addressbook.ContactPanelViewModel'
    ],
    controller: 'addressbookcontactpanel',
    viewModel: {
        type: 'addressbookcontactpanel'
    },

    config: {
        bind: {
            title: '{name}'
        },
        iconCls: 'x-fa fa-phone',
        closable: true,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        padding: 10,
        border: 1,
        bodyBorder: 1,
        tbar: [
            {
                text: Glb.btnSetting.deleteText,
                tooltip: Glb.btnSetting.deleteText,
                iconCls: Glb.btnSetting.deleteIconCls2,
                hidden: this.person_id === 0,
                handler: 'onClickDeletePerson'
            }
        ]
    },

    items: [
        {
            xtype: 'panel',
            flex: 1,
            layout: 'vbox',
            autoScroll: true,
            padding: 10,
            bodyPadding: 10,
            border: 1,
            bodyBorder: 1,
            itemId: 'infoBox',
            tbar: [
                '<b>' + T.__('Person Information') + '</b>',
                '->',
                {
                    text: Glb.btnSetting.editText,
                    tooltip: Glb.btnSetting.editText,
                    iconCls: Glb.btnSetting.editIconCls,
                    bind: {
                        hidden: '{id==0}'
                    },
                    handler: 'onClickEditPersonInfo'
                }
            ],
            defaults: {
                xtype: 'displayfield',
                labelWidth: 100,
                width: '100%'
            },
            items: [
                {
                    fieldLabel: T.__("Name of Person"),
                    bind: {
                        value: '{showPersonName}'
                    }

                },
                {
                    fieldLabel: T.__("Other Name"),
                    bind: {
                        value: '{showPersonName2}'
                    }

                },
                {
                    fieldLabel: T.__("Birthday"),
                    bind: {
                        value: '{showBirthday}'
                    }

                },
                {
                    fieldLabel: T.__("Company"),
                    bind: {
                        value: '{showCompany}'
                    }

                },
                {
                    fieldLabel: T.__("Notice"),
                    bind: {
                        value: '{showNotice}'
                    }

                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'vbox',
            autoScroll: true,
            defaults: {
                width: '100%',
                padding: 10
            },
            items: [
                {
                    xtype: 'grid',
                    gridType: 'telephone',
                    bind: {
                        store: '{telephoneStore}'
                    },
                    height: 300,
                    emptyText: T.__("Empty"),
                    forceFit: true,
                    scrollable: true,
                    border: 1,
                    tbar: [
                        '<b>' + T.__("Telephone") + '</b>',
                        '->',
                        {
                            text: Glb.btnSetting.addText,
                            tooltip: Glb.btnSetting.addText,
                            iconCls: Glb.btnSetting.addIconCls,
                            bind: {
                                hidden: '{id==0}'
                            },
                            handler: 'onClickAddTelephone'
                        }
                    ],
                    listeners: {
                        itemdblclick: 'onGridItemDblClick'
                    },
                    columns: [
                        {
                            text: T.__("Title"),
                            dataIndex: 'title',
                            width: 100
                        },
                        {
                            text: T.__("Number"),
                            dataIndex: 'number',
                            flex: 1,
                            renderer: function (v) {
                                return '<a href="tel: ' + v + '">' + v + '</a>';
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            items: [
                                {
                                    tooltip: Glb.btnSetting.deleteText,
                                    iconCls: Glb.btnSetting.deleteIconCls,
                                    handler: 'onClickDeleteGridItem'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    gridType: 'email',
                    bind: {
                        store: '{emailStore}'
                    },
                    height: 300,
                    emptyText: T.__("Empty"),
                    forceFit: true,
                    scrollable: true,
                    border: 1,
                    tbar: [
                        '<b>' + T.__("Email") + '</b>',
                        '->',
                        {
                            text: Glb.btnSetting.addText,
                            tooltip: Glb.btnSetting.addText,
                            iconCls: Glb.btnSetting.addIconCls,
                            bind: {
                                hidden: '{id==0}'
                            },
                            handler: 'onClickAddEmail'
                        }
                    ],
                    listeners: {
                        itemdblclick: 'onGridItemDblClick'
                    },
                    columns: [
                        {
                            text: T.__("Title"),
                            dataIndex: 'title',
                            width: 100
                        },
                        {
                            text: T.__("Email"),
                            dataIndex: 'email',
                            flex: 1,
                            renderer: function (v) {
                                return '<a href="mailto: ' + v + '">' + v + '</a>';
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            items: [
                                {
                                    tooltip: Glb.btnSetting.deleteText,
                                    iconCls: Glb.btnSetting.deleteIconCls,
                                    handler: 'onClickDeleteGridItem'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    gridType: 'address',
                    bind: {
                        store: '{addressStore}'
                    },
                    height: 300,
                    emptyText: T.__("Empty"),
                    forceFit: true,
                    scrollable: true,
                    border: 1,
                    tbar: [
                        '<b>' + T.__("Address") + '</b>',
                        '->',
                        {
                            text: Glb.btnSetting.addText,
                            tooltip: Glb.btnSetting.addText,
                            iconCls: Glb.btnSetting.addIconCls,
                            bind: {
                                hidden: '{id==0}'
                            },
                            handler: 'onClickAddAddress'
                        }
                    ],
                    listeners: {
                        itemdblclick: 'onGridItemDblClick'
                    },
                    columns: [
                        {
                            text: T.__("Title"),
                            dataIndex: 'title',
                            width: 100
                        },
                        {
                            text: T.__("Address"),
                            dataIndex: 'address',
                            flex: 1,
                            renderer: function(v, meta, rec){
                                return Wiewind.String.nl2br(v);
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            items: [
                                {
                                    tooltip: Glb.btnSetting.deleteText,
                                    iconCls: Glb.btnSetting.deleteIconCls,
                                    handler: 'onClickDeleteGridItem'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    listeners: {
        activate: Glb.History.add
    }
});