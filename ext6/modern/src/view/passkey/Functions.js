/**
 * Created by benying.zou on 02.03.2018.
 */
Ext.define('WWS.view.passkey.Functions', {
    singleton: true,
    alternateClassName: ['PKF'],

    showDetailTitle: function (xtype) {
        var view = Ext.ComponentQuery.query(xtype)[0],
            toolbar = view.down('toolbar[docked="top"]'),
            arrowCt = view.down('[itemId="arrowCt"]');
        toolbar.show();
        arrowCt.setHtml('<img src="' + Cake.image.path + '/arrow_up.png"  onclick="PKF.hideDetailTitle(\'' + xtype + '\')" />');
    },

    hideDetailTitle: function (xtype) {
        var view = Ext.ComponentQuery.query(xtype)[0],
            toolbar = view.down('toolbar[docked="top"]'),
            arrowCt = view.down('[itemId="arrowCt"]');
        toolbar.hide();
        arrowCt.setHtml('<img src="' + Cake.image.path + '/arrow_down.png" onclick="PKF.showDetailTitle(\'' + xtype + '\')" />');
    }
});