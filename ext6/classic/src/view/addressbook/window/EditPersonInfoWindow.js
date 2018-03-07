/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.window.EditPersonInfoWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'addressbookwindoweditpersoninfo',

    requires: [
        'WWS.view.addressbook.window.EditPersonInfoWindowController',
        'WWS.view.addressbook.window.EditPersonInfoWindowViewModel'
    ],
    controller: 'addressbookwindoweditpersoninfo',
    viewModel: {
        type: 'addressbookwindoweditpersoninfo'
    },

    input: {
        url: Cake.api.path + '/addressbook/json/savePerson'
    },

    config: {
        bind: {
            title: '{showWindowTitle}'
        },
        iconCls: 'x-fa fa-edit',
        width: 600
    },

    configForm: function () {
        return {
            defaults: {
                xtype: 'textfield',
                width: '100%',
                forceFit: true,
                layout: 'hbox',
                padding: 5,
                labelWidth: 100
            }
        };
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'hiddenfield',
                name: 'person_id',
                bind: {
                    value: '{id}'
                }
            },
            {
                name: 'name',
                fieldLabel: T.__("Name of Person"),
                emptyText: T.__("Name of Person"),
                bind: {
                    value: '{name}'
                },
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                name: 'pinyin',
                fieldLabel: T.__("Pin Yin"),
                emptyText: T.__("Pin Yin"),
                bind: {
                    value: '{pinyin}'
                },
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                name: 'name2',
                fieldLabel: T.__("Other Name"),
                emptyText: T.__("Other Name"),
                bind: {
                    value: '{name2}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'cleardate',
                name: 'birthday',
                fieldLabel: T.__("Birthday"),
                emptyText: T.__("Birthday"),
                editable: false,
                format: SSD.data.formatting.date_format,
                submitFormat: 'Y-m-d',
                bind: {
                    value: '{birthday}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                name: 'company',
                fieldLabel: T.__("Company"),
                emptyText: T.__("Company"),
                bind: {
                    value: '{company}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'textarea',
                name: 'notice',
                fieldLabel: T.__("Notice"),
                emptyText: T.__("Notice"),
                height: 200,
                bind: {
                    value: '{notice}'
                }
            }
        ];
    }
});