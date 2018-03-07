/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.search.Functions', {
    singleton: true,
    alternateClassName: ['SFns'],

    openSelect: function () {
        MGlb.common.identicalShow({
            xtype: 'searchselect'
        });
    },

    openPage: function (id) {
        MGlb.common.identicalShow({
            xtype: 'searchpanel',
            todo: function (activePanel, container) {
                activePanel.getController().setData(id);
            }
        });
    }
});