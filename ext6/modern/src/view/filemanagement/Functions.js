/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.Functions', {
    singleton: true,
    alternateClassName: ['FMF'],

    displayPath: function (path) {
        if (!path || path.indexOf('/') === -1) return T.__('Root');
        return path.substring(path.indexOf('/')+1);
    },

    showDetailTitle: function (xtype) {
        var view = Ext.ComponentQuery.query(xtype)[0],
            toolbar = view.down('toolbar[docked="top"]'),
            detailHeader = view.down('[itemId="detailHeader"]'),
            detailFooter = view.down('[itemId="detailFooter"]'),
            arrowCt = view.down('[itemId="arrowCt"]');
        toolbar.show();
        detailHeader.show();
        detailFooter.show();
        arrowCt.setHtml('<img src="' + Cake.image.path + '/arrow_up.png"  onclick="FMF.hideDetailTitle(\'' + xtype + '\')" />');
    },

    hideDetailTitle: function (xtype) {
        var view = Ext.ComponentQuery.query(xtype)[0],
            toolbar = view.down('toolbar[docked="top"]'),
            detailHeader = view.down('[itemId="detailHeader"]'),
            detailFooter = view.down('[itemId="detailFooter"]'),
            arrowCt = view.down('[itemId="arrowCt"]');
        toolbar.hide();
        detailHeader.hide();
        detailFooter.hide();
        arrowCt.setHtml('<img src="' + Cake.image.path + '/arrow_down.png" onclick="FMF.showDetailTitle(\'' + xtype + '\')" />');
    }
});