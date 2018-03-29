/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('WWS.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.Carousel',

        'WWS.utils.ModernFns',
        'WWS.ux.List',
        'WWS.view.main.MainContainer',
        'WWS.view.main.ModulePanel',
        'WWS.view.main.GooglePanel',
        'WWS.view.main.SettingsPanel',
        'WWS.view.main.LoginPanel'
    ],

    controller: 'main',
    viewModel: 'main',

    wtype: 'modern',

    config: {
        id: 'appmain',
        // fullscreen: true,
        tabBarPosition: 'bottom',

        defaults: {
            tab: {
                iconAlign: 'top'
            }
        }
    },

    initialize: function (config) {
        this.callParent(arguments);
        this.initConfig(config);

        var items = [
            {
                xtype: 'maincontainer'
            },
            {
                xtype: 'mainmodule'
            },
            {
                xtype: 'maingoogle'
            }
        ];
        if (Glb.common.checkLogin()) {
           items.push({
               xtype: 'mainsettings'
           });
        } else {
            items.push({
                xtype: 'mainlogin'
            });
        }

        this.add(items);
    }
});
