/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.ModulePanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainmodule',

    openModule: function (btn) {
        var module = btn.module;
        MGlb.common.identicalShow({
            xtype: module + 'panel'
        });
        MGlb.common.identicalShow({
            xtype: 'maincontainer'
        }, 'appmain');
    }
});
