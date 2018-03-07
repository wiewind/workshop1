/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.window.EditGridItemWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'addressbookwindoweditgriditem',

    requires: [
        'WWS.view.addressbook.window.EditGridItemWindowController',
        'WWS.view.addressbook.window.EditGridItemWindowViewModel'
    ],
    controller: 'addressbookwindoweditgriditem',
    viewModel: {
        type: 'addressbookwindoweditgriditem'
    },

    input: {
        url: Cake.api.path + '/addressbook/json/saveRecord'
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
                name: 'datatype',
                bind: {
                    value: '{datatype}'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'id',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'person_id',
                bind: {
                    value: '{person_id}'
                }
            },
            {
                fieldLabel: T.__("Title"),
                emptyText: T.__("Title"),
                name: 'title',
                bind: {
                    value: '{title}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                fieldLabel: T.__("Number"),
                emptyText: T.__("Number"),
                name: 'number',
                bind: {
                    value: '{number}',
                    hidden: '{!isTelephone}',
                    disabled: '{!isTelephone}'
                },
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                fieldLabel: T.__("Email"),
                emptyText: T.__("Email"),
                name: 'email',
                vtype: 'email',
                bind: {
                    value: '{email}',
                    hidden: '{!isEmail}',
                    disabled: '{!isEmail}'
                },
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'textareafield',
                fieldLabel: T.__("Address"),
                emptyText: T.__("Address"),
                name: 'address',
                bind: {
                    value: '{address}',
                    hidden: '{!isAddress}',
                    disabled: '{!isAddress}'
                },
                allowBlank: false,
                height: 200,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            }
        ];
    }
});