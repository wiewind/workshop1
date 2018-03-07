/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.main.MainContainerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.maincontainer',

    init: function (view) {
        view.add({
            xtype: SSD.data.userMobileModules[0] + 'panel'
        });
    }
});
