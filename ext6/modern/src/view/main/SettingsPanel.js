/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.SettingsPanel', {
    extend: 'Ext.Container',
    xtype: 'mainsettings',

    requires: [
        'WWS.view.main.SettingsPanelController'
    ],

    controller: 'mainsettings',

    config: {
        iconCls: 'x-fa fa-gear',
        layout: 'fit'
    },

    items: [
        {
            xtype: 'toolbar',
            itemId: 'buttonToolbar',
            docked: 'top',
            title: T.__('Settings'),
            items: [
                {
                    iconCls: 'x-fa fa-chevron-left',
                    handler: MGlb.common.goback
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'settingsCt',
            layout: 'vbox',
            scrollable: true,
            padding: 20

        }
    ],

    initialize: function (config) {
        this.callParent(arguments);
        this.initConfig(config);

        var ct = this.down('container[itemId="settingsCt"]'),
            langRecords = [];
        for (var key in SSD.config.languages) {
            var lang = SSD.config.languages[key];
            langRecords.push({
                value: Number(lang.id),
                name: lang.name,
                text: '<img src="'+Cake.image.path + '/' + lang.code + '.png'+'" /> ' + lang.name
            });
        }

        ct.add([
            {
                xtype: 'selectfield',
                name: 'language',
                label: T.__('Choose language'),
                displayTpl: '{name}',
                options: langRecords,
                value: Number(SSD.data.appLanguage.id),
                listeners: {
                    change: 'setLanguage'
                }
            },
            {
                style: 'height: 2em;'
            },
            {
                xtype: 'component',
                itemId: 'userDetai',
                html: '<table>' +
                '<tr><td>' + T.__("User") + ':</td><td>' + SSD.data.user.name + '</td></tr>' +
                '<tr><td>' + T.__("Username") + ':</td><td>' + SSD.data.user.username + '</td></tr>' +
                '<tr><td>' + T.__("Customer") + ':</td><td>' + SSD.data.customer.name + '</td></tr>' +
                '</table>'
            },
            {
                style: 'height: 2em;'
            },
            {
                xtype: 'button',
                text: Glb.btnSetting.logoutText,
                iconCls: Glb.btnSetting.logoutIconCls,
                ui: 'action',
                handler: 'onClickLogout'
            }
        ]);
    },

    listeners: {
        activate: Glb.History.add
    }
});