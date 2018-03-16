/**
 * Created by benying.zou on 01.03.2018.
 */
Ext.define ('WWS.view.passkey.window.EditKeyWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'passkeywindoweditkey',

    requires: [
        'WWS.view.passkey.window.EditKeyWindowController',
        'WWS.view.passkey.window.EditKeyWindowViewModel'
    ],
    controller: 'passkeywindoweditkey',
    viewModel: {
        type: 'passkeywindoweditkey'
    },

    input: {
        url: Cake.api.path + '/passkeys/json/save'
    },

    config: {
        bind: {
            title: '{getTitle}'
        },
        icon: Cake.image.path + '/key.png',
        width: 500,

        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                bind: {
                    hidden: '{isNew}'
                },
                items: [
                    {
                        btnName: 'tbarDelete',
                        tooltip: Glb.btnSetting.deleteText,
                        iconCls: Glb.btnSetting.deleteIconCls2,
                        handler: 'onClickDelete'
                    },
                    {
                        btnName: 'tbarClone',
                        tooltip: T.__("Clone"),
                        icon: Cake.image.path+'/key_duplicate.png',
                        handler: 'onClickClone'
                    },
                    {
                        btnName: 'tbarOpenUrl',
                        tooltip: T.__("Open Url"),
                        icon: Cake.image.path+'/world_link.png',
                        bind: {
                            disabled: '{!hasUrl}'
                        },
                        handler: 'onClickOpenUrl'
                    },
                    {
                        btnName: 'tbarCopyUsername',
                        tooltip: T.__("Copy Username"),
                        icon: Cake.image.path+'/user_copy.png',
                        handler: 'onClickCopyUsername'
                    },
                    {
                        btnName: 'tbarCopyPassword',
                        tooltip: T.__("Copy Password"),
                        icon: Cake.image.path+'/key_copy.png',
                        handler: 'onClickCopyPassowrd'
                    }
                ]
            }
        ]
    },

    configForm: function () {
        return {
            autoEl: {
                autocomplete: 'off'
            },
            defaults: {
                width: 400,
                labelWidth: 100,
                defaults: {
                    labelWidth: 100
                }
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
                xtype: 'hiddenfield',
                name: 'group_id',
                bind: {
                    value: '{group_id}'
                }
            },
            {
                xtype: 'displayfield',
                fieldLabel: T.__("Path"),
                bind: {
                    value: '{path}'
                }
            },
            {
                xtype: 'textfield',
                name: 'title',
                fieldLabel: T.__("Title"),
                emptyText: T.__('Title'),
                allowBlank: false,
                bind: {
                    value: '{title}'
                },
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
                }
            },
            {
                xtype: 'textfield',
                name: 'username',
                fieldLabel: T.__("Username"),
                emptyText: T.__('Username'),
                allowBlank: false,
                bind: {
                    value: '{username}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                width: '100%'
            },
            {
                xtype: 'textfield',
                name: 'password2',
                fieldLabel: T.__("repeated"),
                emptyText: T.__('repeated'),
                inputType: 'password',
                bind: {
                    value: '{password2}'
                },
                allowBlank: false,
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'textfield',
                name: 'url',
                fieldLabel: T.__("URL"),
                emptyText: T.__('URL'),
                bind: {
                    value: '{url}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'textarea',
                name: 'notice',
                fieldLabel: T.__("Notice"),
                emptyText: T.__('Notice'),
                bind: {
                    value: '{notice}'
                },
                height: 200
            }
        ];
    }
});
