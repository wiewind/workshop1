/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.passkey.search.ResultWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.passkeysearchresultwindow',

    onSelectionChange: function () {
        var view = this.getView().down('grid'),
            records = view.getSelectionModel().getSelection(),
            selectCount = records.length,
            tbarRename = view.down('[btnName="tbarRename"]'),
            tbarOpenUrl = view.down('[btnName="tbarOpenUrl"]'),
            tbarCopyUsername = view.down('[btnName="tbarCopyUsername"]'),
            tbarCopyPassword = view.down('[btnName="tbarCopyPassword"]'),
            tbarDelete = view.down('[btnName="tbarDelete"]');

        if (selectCount > 0) {
            tbarDelete.enable();
        } else {
            tbarDelete.disable();
        }

        if (selectCount === 1 && records[0].get('isPasskey')) {
            tbarCopyUsername.enable();
            tbarCopyPassword.enable();
        } else {
            tbarCopyUsername.disable();
            tbarCopyPassword.disable();
        }

        if (selectCount === 1 && records[0].get('isPasskey') && records[0].get('PasskeyData.url')) {
            tbarOpenUrl.enable();
        } else {
            tbarOpenUrl.disable();
        }
    },

    onItemDblclick: function (gridView, record) {
        PKF.keyOpen(Glb.Passkey.getKeyData(record));
    },

    onClickDelete: function () {
        var view = this.getView().down('grid'),
            records = view.getSelectionModel().getSelection();
        PKF.onDelete(records);
    },

    onClickOpenUrl: function () {
        var view = this.getView().down('grid'),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1 && records[0].get('isPasskey')) {
            var url = records[0].get('PasskeyData.url');
            if (url) {
                window.open(url, '_blank');
            }
        }
    },

    onClickCopyUsername: function () {
        var view = this.getView().down('grid'),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1 && records[0].get('isPasskey')) {
            Wiewind.Action.setClipboardText(records[0].get('PasskeyData.username'));
        }
    },

    onClickCopyPassowrd: function () {
        var view = this.getView().down('grid'),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1 && records[0].get('isPasskey')) {
            Wiewind.Action.setClipboardText(records[0].get('PasskeyData.password'));
        }
    }
});
