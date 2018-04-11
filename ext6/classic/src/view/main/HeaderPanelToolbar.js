/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define('WWS.view.main.HeaderPanelToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    xtype: 'appheadertoolbar',

    config: {
        dock: 'top'
    },

    initComponent: function () {
        this.items = this.buildButtons();
        this.callParent();
    },

    buildButtons: function () {
        var items = [
                {
                    xtype: 'image',
                    height: 50,
                    alt: 'logo',
                    src: Cake.image.path + '/logo_mit_schriftung.png'
                },
                '->'
            ];

        for (var key in SSD.data.userModules) {
            var module = SSD.config.modules[SSD.data.userModules[key]];
            if (module.visible) {
                if (module.name !== 'admin') {
                    items.push({
                        text: module.text,
                        tooltip: module.text,
                        icon: Cake.image.path+'/board/' + module.name + '.png',
                        scale: 'large',
                        split: false,
                        iconAlign: 'top',
                        hideBorders:'false',
                        margin:5,
                        module: module.name,
                        handler: 'openModule'
                    });
                } else {
                    items.push({
                        text: T.__("Admin"),
                        tooltip: T.__("Admin"),
                        icon: Cake.image.path+'/board/admin.png',
                        scale: 'large',
                        split: false,
                        iconAlign: 'top',
                        hideBorders:'false',
                        margin:5,
                        menu: [
                            {
                                text: T.__("Customer Management"),
                                tooltip: T.__("Customer Management"),
                                icon: Cake.image.path+'/customer.png',
                                module: 'admin/customer',
                                handler: 'openModule'
                            },
                            {
                                text: T.__("DB Management"),
                                tooltip: T.__("DB Management"),
                                icon: Cake.image.path+'/dbmanager.png',
                                module: 'admin/dbmanager',
                                handler: 'openModule'
                            },
                            {
                                text: T.__("Backup"),
                                tooltip: T.__("Backup"),
                                icon: Cake.image.path+'/backup.png',
                                module: 'admin/backup',
                                handler: 'openModule'
                            }
                        ]
                    });
                }
            }
        }

        if (Glb.common.checkLogin()) {
            var langsMenu = [];
            for (var key in SSD.config.languages) {
                var lang = SSD.config.languages[key];
                langsMenu.push(
                    {
                        text: lang.name,
                        icon: Cake.image.path + '/' + lang.code + '.png',
                        lang_id: lang.id,
                        handler: 'setLanguage'
                    }
                );
            }

            items.push({
                text: T.__("Settings"),
                tooltip: T.__("Settings"),
                icon: Cake.image.path + '/board/setup.png',
                scale: 'large',
                split: false,
                iconAlign: 'top',
                hideBorders:'false',
                margin: 5,
                menu: [
                    {
                        text: T.__("Language"),
                        tooltip: T.__("Language"),
                        iconCls: 'x-fa fa-language',
                        menu: langsMenu
                    },
                    {
                        text: T.__("Update"),
                        tooltip: T.__("Update"),
                        iconCls: 'x-fa fa-retweet',
                        hidden: Number(SSD.data.user.id) !== 1,
                        handler: 'onClickUpdate'
                    },
                    '-',
                    {
                        text:  SSD.data.user.name + '[' + SSD.data.user.username + ']',
                        tooltip: T.__("User profile"),
                        icon: Cake.image.path + '/user.png',
                        handler: 'onClickUserInfo'
                    },
                    {
                        text: T.__("Logout"),
                        tooltip: T.__("Logout"),
                        icon: Cake.image.path + '/logout.png',
                        handler: 'onClickLogout'
                    }
                ]
            });
        } else {
            items.push({
                text: T.__("Login"),
                icon: Cake.image.path + '/board/setup.png',
                scale: 'large',
                split: false,
                iconAlign: 'top',
                hideBorders:'false',
                margin:5,
                handler: 'openLoginWindow'
            });
        }

        return items;
    }
});