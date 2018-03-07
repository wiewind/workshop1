/**
 * Created by benying.zou on 02.03.2018.
 */
Ext.define ('WWS.view.passkey.Detail', {
    extend: 'Ext.Container',
    xtype: 'passkeydetail',

    requires: [
        'WWS.view.passkey.DetailController',
        'WWS.view.passkey.DetailViewModel'
    ],
    controller: 'passkeydetail',
    viewModel: {
        type: 'passkeydetail'
    },

    config: {
        layout: 'vbox',
        showAnimation: 'pop',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                bind: {
                    title: '{title}'
                },
                showAnimation: 'fade',
                hideAnimation: 'fadeOut',
                hidden: true,
                items: [
                    {
                        iconCls: 'x-fa fa-chevron-left',
                        handler: MGlb.common.goback
                    }
                ]
            },
            {
                xtype: 'component',
                itemId: 'arrowCt',
                cls: 'fm_path',
                style: 'text-align: center;',
                height: 16,
                margin: 0,
                padding: 0,
                showAnimation: 'fade',
                hideAnimation: 'fadeOut',
                html: '<img src="' + Cake.image.path + '/arrow_down.png" onclick="PKF.showDetailTitle(\'passkeydetail\')" />'
            },
            {
                xtype: 'container',
                itemId: 'keyCtn',
                layout: 'vbox',
                padding: 20,
                flex: 1,
                defaults: {
                    xtype: 'component'
                },
                items: [
                    {
                        cls: 'recLabel',
                        html: T.__("Path")
                    },
                    {
                        cls: 'recValue',
                        bind: {
                            html: '{path}'
                        }
                    },
                    {
                        cls: 'recLabel',
                        html: T.__("Title")
                    },
                    {
                        cls: 'recValue',
                        bind: {
                            html: '{title}'
                        }
                    },
                    {
                        cls: 'recLabel',
                        html: T.__("Username")
                    },
                    {
                        cls: 'recValue',
                        bind: {
                            html: '{username}'
                        }
                    },
                    {
                        xtype: 'container',
                        cls: 'recValue',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'component',
                                        cls: 'recLabel',
                                        html: T.__("Password")
                                    },
                                    {
                                        itemId: 'passwordField',
                                        bind: {
                                            html: '{showPassword}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                pwdVisible: false,
                                icon: Cake.image.path + '/eye.png',
                                handler: 'onShowPasswordText'
                            }
                        ]
                    },
                    {
                        cls: 'recLabel',
                        html: T.__("URL")
                    },
                    {
                        cls: 'recValue',
                        bind: {
                            html: '{showUrl}'
                        }
                    },
                    {
                        cls: 'recLabel',
                        html: T.__("Notice")
                    },
                    {
                        cls: 'recValue',
                        bind: {
                            html: '{notice}'
                        }
                    }
                ]
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }

});