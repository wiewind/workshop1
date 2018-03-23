/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.customer.window.ChangeUsernameWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'admincustomerwindowchangeusername',

    requires: [
        'WWS.view.admin.customer.window.ChangeUsernameWindowController',
        'WWS.view.admin.customer.window.ChangeUsernameWindowViewModel'
    ],
    controller: 'admincustomerwindowchangeusername',
    viewModel: {
        type: 'admincustomerwindowchangeusername'
    },

    input: {
        url: Cake.api.path + '/users/json/changeUsername'
    },

    config: {
        title: T.__("Change Username"),
        iconCls: 'x-fa fa-pencil-square-o',
        width: 400,
        scrollable: true
    },

    // configForm: function () {
    //     return {
    //         defaults: {
    //             width: '100%',
    //             labelWidth: 70,
    //             padding: 5
    //         }
    //     };
    // },

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
                xtype: 'displayfield',
                fieldLabel: T.__("Old Username"),
                emptyText: T.__("Old Username"),
                bind: {
                    value: '{username}'
                }
            },
            {
                xtype: 'textfield',
                name: 'username',
                fieldLabel: T.__("New Username"),
                emptyText: T.__("New Username"),
                allowBlank: false,
                bind: {
                    value: '{new_username}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            }
        ];
    }
});