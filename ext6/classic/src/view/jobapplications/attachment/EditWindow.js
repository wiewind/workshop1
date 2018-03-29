/**
 * Created by benying.zou on 29.03.2018.
 */
Ext.define ('WWS.view.jobapplications.attachment.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'jobapplicationsattachmenteditwindow',

    requires: [
        'WWS.view.jobapplications.attachment.EditWindowController',
        'WWS.view.jobapplications.attachment.EditWindowViewModel'
    ],
    controller: 'jobapplicationsattachmenteditwindow',
    viewModel: {
        type: 'jobapplicationsattachmenteditwindow'
    },

    input: {
        url: Cake.api.path + '/jobapplications/json/saveAttachment'
    },

    config: {
        title: T.__("Attachment"),
        width: 500
    },

    configForm: function () {
        return {
            scrollable: true,
            defaults: {
                labelWidth: 60
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
                xtype: 'checkbox',
                name: 'default_send',
                fieldLabel: T.__("Default Send"),
                bind: {
                    value: '{default_send}'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: T.__("Name"),
                name: 'name',
                allowBlank: false,
                bind: {
                    value: '{name}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'filefield',
                name: 'file',
                fieldLabel: T.__("File"),
                width: '100%',
                buttonText: T.__("Select File") + '...',
                vtype: 'fileTypeAndSize'
            }
        ];
    }
});