/**
 * Created by benying.zou on 15.02.2018.
 */
Ext.define ('WWS.view.filemanagement.window.RenameWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'filemanagementwindowrename',

    requires: [
        'WWS.view.filemanagement.window.RenameWindowController',
        'WWS.view.filemanagement.window.RenameWindowViewModel'
    ],
    controller: 'filemanagementwindowrename',
    viewModel: {
        type: 'filemanagementwindowrename'
    },

    config: {
        title: T.__('Rename'),
        iconCls: 'x-fa fa-edit',
        width: 500
    },

    input: {
        url: Cake.api.path + '/filemanagement/transjson/rename'
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
                name: 'oldname1',
                fieldLabel: T.__("Current name"),
                width: '100%',
                // bind: {
                //     value: '{name}'
                // },
                disabled: true
            },
            {
                xtype: 'textfield',
                name: 'newname',
                fieldLabel: T.__("New name"),
                allowBlank:false,
                vtype: 'foldername',
                width: '100%',
                bind: {
                    value: '{name}'
                },
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'itemId',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'isFile',
                bind: {
                    value: '{isFile}'
                }
            }
        ]
    }
});