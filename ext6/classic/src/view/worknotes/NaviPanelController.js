/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define ('WWS.view.worknotes.NaviPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesnavipanel',

    renderDate: function (date) {
        return Glb.Date.displayDateFromString(date, '', 'shot');
    },

    renderProject: function (value, metaData) {
        if (value) {
            metaData.tdAttr = 'data-qtip="' + value.replace(/"/g, '&quot;') + '"';
            return value;
        }
        return '-';
    },

    renderStatus: function (value, metaData, record) {
        // var imgPath = '';
        // if (!record.get('hasRelease')) {
        //     imgPath = Cake.image.path + '/star_empty_14.png';
        // } else if (record.get('waitRelease')) {
        //     imgPath = Cake.image.path + '/star_half_14.png';
        // } else {
        //     imgPath = Cake.image.path + '/star_full_14.png';
        // }
        // if (record.get('id') == 256) {
        //     console.log(record);
        //     console.log(imgPath);
        // }
        // return (imgPath) ? '<img src="' + imgPath + '" />' : '';

        if (!record.get('hasRelease')) {
            return 'x-fa fa-star-o';
        } else if (record.get('waitRelease')) {
            return 'x-fa fa-star-half-empty';
        } else {
            return 'x-fa fa-star';
        }
    },

    renderTitle: function (value, metaData, record) {
        metaData.tdAttr = 'data-qtip="' + value.replace(/"/g, '&quot;') + '"';
        return value;
    },

    onClickItem: function(dv, record, item, index, e) {
        var id = record.get('id');
        WNF.showWorknote(id);
    },

    onClickNew: function () {
        WNF.showWorknote(0);
    },

    onClickSearch: function () {
        var win = Ext.getCmp('worknotesSearchWindow');
        if (!win) {
            win = Ext.create('WWS.view.worknotes.SearchWindow');
        }
        win.show();
    },

    onClickReset: function () {
        var store = this.getViewModel().getStore('liststore');
        store.proxy.extraParams = null;
        store.load(function () {
            Ext.getCmp('worknotesSearchWindow').destroy();
        });
    },

    reloadStore: function (worknoteId) {
        var store = this.getViewModel().getStore('liststore');
        store.load();
    }
});