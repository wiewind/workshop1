/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define ('WWS.view.addressbook.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addressbooklist',

    onItemTap: function (list, index, target, record) {
        MGlb.common.identicalShow({
            xtype: 'addressbookdetail',
            todo: function (panel) {
                panel.getController().setData(record.get('id'));
            }
        })
    }
});