/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.ModulePanel', {
    extend: 'Ext.Container',
    xtype: 'mainmodule',

    requires: [
        'WWS.view.main.ModulePanelController'
    ],
    controller: 'mainmodule',

    config: {
        iconCls: 'x-fa fa-cubes',
        layout: 'vbox',
        scrollable: true
    },

    items: [
        {
            xtype: 'toolbar',
            itemId: 'buttonToolbar',
            docked: 'top',
            title: T.__('Modules'),
            items: [
                {
                    iconCls: 'x-fa fa-chevron-left',
                    handler: MGlb.common.goback
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'modulesCt',
            defaults: {
                margin: 20,
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    xtype: 'button',
                    flex: 1,
                    margin:10,
                    ui: 'round',
                    iconAlign: 'top',
                    hideBorders:'false',
                    handler: 'openModule'
                }
                // defaults: {
                //     xtype: 'container',
                //     flex: 1,
                //     margin:10,
                //     layout: 'vbox'
                // }
            }
        }
    ],

    initialize: function (config) {
        this.callParent(arguments);
        this.initConfig(config);

        var moduleCount = 0,
            hContainer = [],
            items = [];

        for (var key in SSD.data.userMobileModules) {
            var module = SSD.config.modules[SSD.data.userMobileModules[key]];
            if (module.visible) {
                hContainer.push({
                    text: '<div style="text-align: center;"><img src="'+Cake.image.path+'/board/' + module.name + '64.png" /><br />' + module.text + '</div>',
                    tooltip: module.text,
                    // icon: Cake.image.path+'/board/' + module.name + '.png',
                    module: module.name
                });
                if (moduleCount % 2 === 1) {
                    items.push({
                        items: hContainer
                    });
                    hContainer = []
                }
                moduleCount++;
            }
        }
        if (!Wiewind.isEmpty(hContainer)) {
            hContainer.push({
                xtype: 'component'
            });
            items.push({
                items: hContainer
            })
        }
        this.down('container[itemId="modulesCt"]').add(items);
    },

    listeners: {
        activate: Glb.History.add
    }
});