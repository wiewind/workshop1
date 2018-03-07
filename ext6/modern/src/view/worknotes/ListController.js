/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.worknotes.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknoteslist',

    onItemTap: function (list, index, target, record) {
        MGlb.common.identicalShow({
            xtype: 'worknotesdetail',
            todo: function (panel) {
                panel.getController().setData(record.get('id'));
            }
        });
    }
});