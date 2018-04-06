/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.view.search.MenuController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.searchmenu',

    onAdd: function () {
        SHF.showEditContent(0);
    },

    onItemClick: function (dataview, record) {
        alert('click ' + record.get('id'));
    }
});