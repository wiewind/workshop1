/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.passkey.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.passkeygrid',

    setData: function (groupData) {
        var vm = this.getViewModel();
        vm.setData(groupData);
        vm.getStore('passkeygridstore').load();

        var view = this.getView(),
            btnParent = view.down('[btnName="parentDir"]');
        if (PKF.isRoot(groupData.id)) {
            btnParent.disable();
        } else {
            btnParent.enable();
        }
    },

    onItemDblclick: function (gridView, record) {
        if (record.get('isPasskey')) {
            PKF.keyOpen(Glb.Passkey.getKeyData(record));
        } else {
            this.setData(record.get('PasskeyGroup'));
        }
    },

    onSelectionchange: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection(),
            selectCount = records.length,
            tbarRename = view.down('[btnName="tbarRename"]'),
            tbarOpenUrl = view.down('[btnName="tbarOpenUrl"]'),
            tbarCopyUsername = view.down('[btnName="tbarCopyUsername"]'),
            tbarCopyPassword = view.down('[btnName="tbarCopyPassword"]'),
            tbarDelete = view.down('[btnName="tbarDelete"]'),
            tbarClone = view.down('[btnName="tbarClone"]');

        // delete can more, and not care key or group
        if (selectCount > 0) {
            tbarDelete.enable();
        } else {
            tbarDelete.disable();
        }

        // clone can more too, bat only for keys
        var allkeys = true;
        for (var i=0; i<selectCount; i++) {
            if (!records[i].get('isPasskey')) {
                allkeys = false;
                break;
            }
        }
        if (selectCount > 0 && allkeys) {
            tbarClone.enable();
        } else {
            tbarClone.disable();
        }

        // rename only for a group, key can rename in edit window
        if (selectCount === 1 && !records[0].get('isPasskey')) {
            tbarRename.enable();
        } else {
            tbarRename.disable();
        }

        // the buttons only for a key
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

    onRefresh: function () {
        this.getViewModel().getStore('passkeygridstore').reload();
    },

    onClickSearch: function (field) {
        var text = field.getValue();
        if (!text) {
            ABox.warning(
                T.__("Please enter your search text"),
                function() {
                    field.focus();
                }
            );
        } else {
            Ext.create('WWS.view.passkey.search.ResultWindow', {
                viewModel: {
                    data: {
                        text: text
                    }
                }
            });
        }
    },

    enterSearch: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.onClickSearch(field);
        }
    },

    onClickParentDir: function () {
        var me = this,
            vm = this.getViewModel(),
            parent_id = vm.get('parent_id');
        if (parent_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/passkeys/json/getGroupData',
                params: {
                    group_id: parent_id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    if (!Wiewind.isEmpty(data)) {
                        me.setData(data);
                    }
                }
            });
        } else {
            this.setData(SSD.data.user.passkeyRoot);
        }
    },

    onClickNewKey: function () {
        PKF.keyCreate(this.getViewModel().getData());
    },

    onClickNewGroup: function () {
        PKF.groupCreate(this.getViewModel().getData());
    },

    onClickDelete: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        PKF.onDelete(records);
    },

    onClickClone: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length > 0) {
            var keys = [];
            records.forEach(function (item) {
                if (item.get('isPasskey')) {
                    keys.push(item.get('PasskeyData.id'));
                }
            });
            PKF.clone(keys);
        }
    },

    onClickRename: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            PKF.rename(records[0]);
        }
    },

    onClickOpenUrl: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1 && records[0].get('isPasskey')) {
            var url = records[0].get('PasskeyData.url');
            if (url) {
                window.open(url, '_blank');
            }
        }
    },

    onClickCopyUsername: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1 && records[0].get('isPasskey')) {
            Wiewind.Action.setClipboardText(records[0].get('PasskeyData.username'));
        }
    },

    onClickCopyPassowrd: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1 && records[0].get('isPasskey')) {
            Wiewind.Action.setClipboardText(records[0].get('PasskeyData.password'));
        }
    },

    onContainerMouseUp: function (view) {
        PKF.events.containermouseup(view, this.getViewModel().getData());
    }
});
