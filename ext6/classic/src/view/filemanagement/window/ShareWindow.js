/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.ShareWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'filemanagementwindowshare',

    requires: [
        'WWS.view.filemanagement.window.ShareWindowController',
        'WWS.view.filemanagement.window.ShareWindowViewModel'
    ],
    controller: 'filemanagementwindowshare',
    viewModel: {
        type: 'filemanagementwindowshare'
    },

    config: {
        title: T.__("Share"),
        iconCls: 'x-fa fa-share-alt',
        width: 500
    },

    input: {
        url: Cake.api.path + '/filemanagement/json/sendFile',
        submitText: Glb.btnSetting.sendText,
        submitIconCls: Glb.btnSetting.saveIconCls
    },

    buildFormItems: function () {
        var languages = [],
            files = this.getViewModel().get('files'),
            fileIds = [];
        for (var key in SSD.config.languages) {
            languages.push(SSD.config.languages[key]);
        }
        for (var key in files) {
            fileIds.push(files[key]['id']);
        }
        fileIds = fileIds.join(',');

        return [
            {
                xtype: 'textfield',
                name: 'mailto',
                fieldLabel: T.__("Email Address"),
                emptyText: T.__("Email Address"),
                width: '100%',
                allowBlank: false,
                vtype: 'email',
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
                }
            },
            {
                xtype: 'textfield',
                name: 'salutation',
                fieldLabel: T.__("Salutation"),
                emptyText: T.__("Salutation"),
                width: '100%',
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'combo',
                name: 'language',
                fieldLabel: T.__("Language of Mail"),
                emptyText: T.__("Language of Mail"),
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                editable: false,
                forceSelection: true,
                store: Ext.create('Ext.data.Store', {
                    fields: [
                        {name: 'id'},
                        {name: 'name'}
                    ],
                    data: languages
                }),
                width: '100%',
                value: SSD.data.appLanguage.id
            },
            {
                xtype: 'combo',
                name: 'limit',
                fieldLabel: T.__("Time Limit"),
                emptyText: T.__("Time Limit"),
                queryMode: 'local',
                valueField: 'limit',
                displayField: 'text',
                editable: false,
                forceSelection: true,
                bind: {
                    store: '{limitDays}'
                },
                width: '100%',
                value: Cake.filemanagement.expire
            },
            {
                xtype: 'hiddenfield',
                name: 'fileIds',
                value: fileIds
            },
            {
                xtype: 'grid',
                border: 1,
                store: Ext.create('Ext.data.Store', {
                    fields: [
                        {name: 'id'}, {name: 'name'}, {name: 'size'}
                    ],
                    data: files
                }),
                columns: [
                    {
                        text: T.__('File'),
                        dataIndex: 'name',
                        flex: 1
                    },
                    {
                        text: T.__('File'),
                        dataIndex: 'size',
                        width: 100,
                        renderer: function (v, meta, rec) {
                            return Ext.util.Format.fileSize(v);
                        }
                    }
                ]
            }
        ]
    }
});