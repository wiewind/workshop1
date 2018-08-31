/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.class.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolclasseditwindow',

    requires: [
        'WWS.view.school.class.EditWindowController',
        'WWS.view.school.class.EditWindowViewModel'
    ],
    controller: 'schoolclasseditwindow',
    viewModel: {
        type: 'schoolclasseditwindow'
    },

    setting: {
        url: Cake.api.path + '/school/json/saveClass'
    },

    config: {
        title: T.__("Class"),
        iconCls: 'x-fa fa-slideshare',
        width: 400
    },

    configForm: function () {
        return {
            defaults: {
                width: '100%',
                padding: 5,
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
