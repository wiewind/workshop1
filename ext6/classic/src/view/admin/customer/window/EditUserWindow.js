/**
 * Created by benying.zou on 22.03.2018.
 */
/**
 * Created by benying.zou on 06.12.2016.
 */
Ext.define ('WWS.view.admin.customer.window.EditUserWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'adminuserwindowedituser',

    requires: [
        'WWS.view.admin.customer.window.EditUserWindowController',
        'WWS.view.admin.customer.window.EditUserWindowViewModel'
    ],
    controller: 'adminuserwindowedituser',
    viewModel: {
        type: 'adminuserwindowedituser'
    },

    input: {
        url: Cake.api.path + '/users/json/save'
    },

    config: {
        bind: {
            title: '{getTitle}'
        },
        iconCls: 'x-fa fa-users',
        width: 800
    },

    configForm: function () {
        return {
            defaults: {
                xtype: 'fieldset',
                width: '100%',
                layout: 'vbox'
            }
        };
    },

    buildFormItems: function () {
        var languageData = [];
        for (var key in SSD.config.languages) {
            languageData.push(SSD.config.languages[key]);
        }

        return [
            {
                title: T.__("Generals"),
                bodyPadding: 5,
                layout: 'hbox',
                defaults: {
                    xtype: 'fieldcontainer',
                    margin: 10,
                    width: '50%',
                    layout: 'vbox',
                    defaults: {
                        bodyPadding: 5,
                        width: '100%'
                    }
                },
                items: [
                    {
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'id',
                                bind: {
                                    value: '{id}'
                                }
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'customer_id',
                                bind: {
                                    value: '{customer_id}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'name',
                                fieldLabel: T.__("Name of User"),
                                emptyText: T.__("Name of User"),
                                allowBlank: false,
                                bind: {
                                    value: '{name}'
                                },
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'username',
                                fieldLabel: T.__("Username"),
                                emptyText: T.__("Username"),
                                allowBlank: false,
                                bind: {
                                    value: '{username}',
                                    disabled: '{id > 0}'
                                },
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'email',
                                fieldLabel: T.__("Email"),
                                emptyText: T.__("Email"),
                                allowBlank: false,
                                vtype: 'email',
                                bind: {
                                    value: '{email}'
                                },
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            },
                            {
                                xtype: 'combobox',
                                name: 'language_id',
                                fieldLabel: T.__("Language"),
                                emptyText: T.__("Language"),
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
                                    data: languageData
                                }),
                                bind: {
                                    value: '{language_id}'
                                }
                            }
                        ]
                    },
                    {
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'wechatname',
                                fieldLabel: T.__("WeChat Name"),
                                emptyText: T.__("WeChat Name"),
                                bind: {
                                    value: '{wechatname}'
                                },
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'telephone',
                                fieldLabel: T.__("Telephone"),
                                emptyText: T.__("Telephone"),
                                bind: {
                                    value: '{telephone}'
                                },
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'fax',
                                fieldLabel: T.__("Fax"),
                                emptyText: T.__("Fax"),
                                bind: {
                                    value: '{fax}'
                                },
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                title: T.__("Modules"),
                itemId: 'modulesCt',
                maxHeight: 500,
                autoScroll: true,
                layout: {
                    type: 'table',
                    columns: 5,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    },
                    tdAttrs: {
                        width: '20%',
                        align: 'center'
                    }
                }
            }
        ];
    },

    buildModulesFormItems: function () {
        var me = this,
            vm = this.getViewModel(),
            items = [],
            userModuleIds = vm.get('module_ids').split(';');

        for (var key in SSD.config.modules) {
            if (!SSD.config.modules[key].visible) continue;

            var module = SSD.config.modules[key],
                hide1 = true,
                hide2 = false,
                valModel = 0;
            if (vm.get('id') > 0 && Wiewind.Array.in_array(module.id, userModuleIds)) {
                hide1 = false;
                hide2 = true;
                valModel = 1;
            }

            if (!module.authorizable) {
                items.push({
                    xtype: 'container',
                    layout: 'hbox',
                    margin: 5,
                    width: 120,
                    defaults: {
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: SSD.config.modules[key].text,
                            icon: Cake.image.path+'/board/' + module.name + '.png',
                            scale: 'large',
                            split: false,
                            iconAlign: 'top',
                            width: '100%',
                            style: {
                                background: 'green'
                            },
                            handler: function (btn) {
                                ABox.info(T.__('This module is available for all users.'), null, -1);
                            }
                        }
                    ]
                });
                continue;
            }

            items.push({
                xtype: 'container',
                layout: 'hbox',
                margin: 5,
                width: 120,
                defaults: {
                    xtype: 'button'
                },
                items: [
                    {
                        text: SSD.config.modules[key].text,
                        icon: Cake.image.path+'/board/' + module.name + '.png',
                        itemId: 'btn_yes',
                        scale: 'large',
                        split: false,
                        iconAlign: 'top',
                        width: '100%',
                        hidden: hide1,
                        handler: function (btn) {
                            var container = btn.up();
                            container.down('hiddenfield').setValue(0);
                            container.getComponent('btn_no').show();
                            btn.hide();
                        }
                    },
                    {
                        text: SSD.config.modules[module.name].text,
                        icon: Cake.image.path+'/board/' + module.name + '_bw.png',
                        itemId: 'btn_no',
                        scale: 'large',
                        split: false,
                        iconAlign: 'top',
                        hideBorders:'false',
                        style: {
                            background: '#ccc'
                        },
                        width: '100%',
                        hidden: hide2,
                        handler: function (btn) {
                            var container = btn.up();
                            container.down('hiddenfield').setValue(1);
                            container.getComponent('btn_yes').show();
                            btn.hide();
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'modules[' + module.id + ']',
                        value: valModel
                    }
                ]
            });
        }

        return items;
    },

    callbackFn: function (data) {}
});