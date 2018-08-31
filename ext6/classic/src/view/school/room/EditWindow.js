/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.room.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolroomeditwindow',

    requires: [
        'WWS.view.school.room.EditWindowController',
        'WWS.view.school.room.EditWindowViewModel'
    ],
    controller: 'schoolroomeditwindow',
    viewModel: {
        type: 'schoolroomeditwindow'
    },

    setting: {
        url: Cake.api.path + '/school/json/saveRoom'
    },

    config: {
        title: T.__("Room"),
        iconCls: 'x-fa fa-institution',
        width: 600
    },

    configForm: function () {
        return {
            defaults: {
                width: '100%',
                labelWidth: 70
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
                xtype: 'textfield',
                name: 'name',
                fieldLabel: T.__("Name"),
                allowBlank: false,
                bind: {
                    value: '{name}'
                },
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
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
                xtype: 'textarea',
                name: 'description',
                fieldLabel: T.__("Description"),
                bind: {
                    value: '{description}'
                }
            }
        ];
    },

    callbackFn: function (data) {}
});
