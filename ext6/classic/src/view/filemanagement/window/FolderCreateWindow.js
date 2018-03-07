/**
 * Created by benying.zou on 15.02.2018.
 */
Ext.define ('WWS.view.filemanagement.window.FolderCreateWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'filemanagementwindowfoldercreate',

    requires: [
        'WWS.view.filemanagement.window.FolderCreateWindowController',
        'WWS.view.filemanagement.window.FolderCreateWindowViewModel'
    ],
    controller: 'filemanagementwindowfoldercreate',
    viewModel: {
        type: 'filemanagementwindowfoldercreate'
    },

    config: {
        bind: {
            title: '{showWindowTitle}'
        },
        iconCls: Glb.btnSetting.addIconCls,
        width: 500
    },

    input: {
        url: Cake.api.path + '/filemanagement/json/folderCreate'
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
                xtype: 'textfield',
                name: 'name',
                fieldLabel: T.__("Name"),
                emptyText: T.__("Name"),
                allowBlank:false,
                vtype: 'foldername',
                width: '100%',
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'parentId',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'checkbox',
                fieldLabel: T.__("Public"),
                name: 'isPublic',
                inputValue: 1,
                uncheckedValue: 0,
                bind: {
                    value: '{isPublish}',
                    hidden: '{hideCheckbox}'
                }
            }
        ];
    }
});