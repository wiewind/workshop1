/**
 * Created by benying.zou on 01.03.2018.
 */

Ext.define ('WWS.view.passkey.window.EditGroupWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'passkeywindoweditgroup',

    requires: [
        'WWS.view.passkey.window.EditGroupWindowController',
        'WWS.view.passkey.window.EditGroupWindowViewModel'
    ],
    controller: 'passkeywindoweditgroup',
    viewModel: {
        type: 'passkeywindoweditgroup'
    },

    config: {
        bind: {
            title: '{getTitle}'
        },
        iconCls: 'x-fa fa-edit',
        width: 500
    },

    input: {
        url: Cake.api.path + '/passkeys/json/saveGroup'
    },

    configForm: function () {
        return {
            defaults: {
                labelWidth: 100
            }
        };
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'displayfield',
                name: 'path',
                fieldLabel: T.__("Path"),
                width: '100%',
                bind: {
                    value: '{path}'
                }
            },
            {
                xtype: 'displayfield',
                name: 'oldname',
                fieldLabel: T.__("Current name"),
                width: '100%',
                submitValue: true,
                bind: {
                    value: '{oldname}',
                    disabled: '{isNew}',
                    hidden: '{isNew}'
                }
            },
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: T.__("Name"),
                width: '100%',
                bind: {
                    value: '{name}'
                },
                allowBlank:false,
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
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
                name: 'parent_id',
                bind: {
                    value: '{parent_id}'
                }
            }
        ]
    }
});