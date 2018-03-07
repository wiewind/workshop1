/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define('WWS.view.addressbook.PersonGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addressbookpersongrid',

    onClickSearch: function (field) {
        var grid = this.getView(),
            text = field.getValue();
        if (text) {
            var store = grid.getStore();
            store.getProxy().setExtraParam('searchtext', text);
            store.loadPage(1);
        } else {
            ABox.warning(T.__("Please enter your text!"));
        }
    },

    onClickSearchUndo: function (field) {
        var grid = this.getView(),
            store = grid.getStore(),
            proxy = store.getProxy(),
            params = proxy.getExtraParams();

        if ('searchtext' in params && params['searchtext'].length > 0) {
            store.getProxy().setExtraParam('searchtext', '');
            store.loadPage(1);
        }

        field.setValue('');
    },

    enterSearch: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.onClickSearch(field);
        }
    },

    onClickNew: function () {
        ABF.openContact(0);
    },

    onSelect: function (view, record) {
        ABF.openContact(record.get('id'));
    }
});