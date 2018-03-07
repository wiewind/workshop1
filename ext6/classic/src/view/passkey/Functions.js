/**
 * Created by benying.zou on 28.02.2018.
 */
Ext.define('WWS.view.passkey.Functions', {
    singleton: true,
    alternateClassName: ['PKF'],

    config: {
        draggedNode: null,
        moveHistory: [],
        currentMoveHistoryIndex: 0
    },

    isRoot: function (group_id) {
        return Number(group_id) === Number(SSD.data.user.passkeyRoot.id)
    },

    refreshTree: function () {
        Ext.ComponentQuery.query('passkeytree')[0].getController().onClickRefresh();
    },

    refreshGrid: function () {
        Ext.ComponentQuery.query('passkeygrid')[0].getStore().load();
    },

    refreshSearchResult: function () {
        var window = Ext.ComponentQuery.query('passkeysearchresultwindow');
        if (!Wiewind.isEmpty(window)) {
            window[0].getStore().load();
        }
    },

    refreshAll: function () {
        PKF.refreshTree();
        PKF.refreshGrid();
        PKF.refreshSearchResult();
    },

    keyOpen: function (data) {
        if ('password' in data) {
            data.password2 = data.password;
        }
        Ext.create('WWS.view.passkey.window.EditKeyWindow', {
            viewModel: {
                data: data
            }
        });
    },

    groupOpen: function (data) {
        Ext.ComponentQuery.query('passkeygrid')[0].getController().setData(data);
    },

    keyCreate: function (parentData) {
        var data = {
            path: parentData.path,
            group_id: parentData.id
        };
        PKF.keyOpen(data);
    },

    groupCreate: function (parentData) {
        var data = {
            name: '',
            path: parentData.path,
            parent_id: parentData.id
        };
        Ext.create('WWS.view.passkey.window.EditGroupWindow', {
            viewModel: {
                data: data
            }
        });
    },

    rename: function (record) {
        var groupData = record.get('PasskeyGroup');
        groupData.oldname = groupData.name;
        Ext.create('WWS.view.passkey.window.EditGroupWindow', {
            viewModel: {
                data: groupData
            }
        });
    },

    keyDelete: function (keyIds) {
        this.mixDelete([], keyIds);
    },

    groupIds: function (groupIds) {
        this.mixDelete(groupIds, []);
    },

    onDelete: function (records) {
        if (records.length > 0) {
            var selectedItems = {
                groups: [],
                keys: []
            };
            records.forEach(function (item) {
                if (item.get('isPasskey')) {
                    selectedItems.keys.push(item.get('PasskeyData.id'));
                } else {
                    selectedItems.groups.push(item.get('PasskeyGroup.id'));
                }
            });
            PKF.mixDelete(selectedItems.groups, selectedItems.keys);
        }
    },

    mixDelete: function (groupIds, keyIds, fn) {
        groupIds = groupIds || [];
        keyIds = keyIds || [];
        fn = fn || false;
        ABox.confirm(
            T.__('Are you sure you want to delete the selected records?'),
            function () {
                var items = {groups: groupIds, keys: keyIds};
                Glb.Ajax({
                    url: Cake.api.path + '/passkeys/transjson/mixDelete',
                    params: {
                        items: Ext.encode(items)
                    },
                    success: function(response, options) {
                        if (fn) fn();
                        PKF.refreshAll();
                        ABox.success(T.__("The selected records are deleted."));
                    }
                });
            }
        );
    },

    clone: function (keyIds) {
        Glb.Ajax({
            url: Cake.api.path + '/passkeys/json/clonePasskey',
            params: {
                keys: Ext.encode(keyIds)
            },
            success: function(response, options){
                PKF.refreshAll();
                ABox.success(T.__("Clone success!"));
            }
        });
    },

    containerContextMenu: function () {
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            items: [
                {
                    text: T.__("New Key"),
                    tooltip: T.__("New Key"),
                    icon: Cake.image.path+'/key_add.png',
                    handler: function () {
                        PKF.keyCreate(SSD.data.user.passkeyRoot);
                    }
                },
                {
                    text: T.__("New Group"),
                    tooltip: T.__("New Group"),
                    icon: Cake.image.path+'/folder_add.png',
                    handler: function () {
                        PKF.groupCreate(SSD.data.user.passkeyRoot);
                    }
                },
                '-',
                {
                    text: Glb.btnSetting.refreshText,
                    iconCls: Glb.btnSetting.refreshIconCls,
                    handler: function () {
                        PKF.refreshTree();
                    }
                }
            ]
        });
    },

    keycontextmenu: function (record) {
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            items: [
                {
                    text: Glb.btnSetting.editText,
                    tooltip: Glb.btnSetting.editText,
                    iconCls: Glb.btnSetting.editIconCls,
                    handler: function () {
                        Glb.Passkey.getKeyData(record);
                    }
                },
                '-',
                {
                    text: T.__("Open Url"),
                    tooltip: T.__("Open Url"),
                    icon: Cake.image.path+'/world_link.png',
                    hidden: record.get('PasskeyData.url').length <= 0,
                    handler: function () {
                        var url = record.get('PasskeyData.url');
                        if (url) {
                            window.open(url, '_blank');
                        }
                    }
                },
                {
                    text: T.__("Copy Username"),
                    tooltip: T.__("Copy Username"),
                    icon: Cake.image.path+'/user_copy.png',
                    handler: function () {
                        Wiewind.Action.setClipboardText(record.get('PasskeyData.username'));
                    }
                },
                {
                    text: T.__("Copy Password"),
                    tooltip: T.__("Copy Password"),
                    icon: Cake.image.path+'/key_copy.png',
                    handler: function () {
                        Wiewind.Action.setClipboardText(record.get('PasskeyData.password'));
                    }
                },
                '-',
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: 'x-fa fa-trash',
                    handler: function () {
                        PKF.onDelete([record]);
                    }
                },
                {
                    text: T.__("Clone"),
                    tooltip: T.__("Clone"),
                    icon: Cake.image.path+'/key_duplicate.png',
                    handler: function () {
                        PKF.clone([record.get('PasskeyData.id')]);
                    }
                }
            ]
        });
    },

    groupcontextmenu: function (record) {
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            items: [
                {
                    text: T.__('Open') + ' / ' + Glb.btnSetting.refreshText,
                    tooltip: T.__('Open') + ' / ' + Glb.btnSetting.refreshText,
                    iconCls: Glb.btnSetting.refreshIconCls,
                    handler: function () {
                        PKF.groupOpen(record.get('PasskeyGroup'));
                        PKF.refreshTree();
                    }
                },
                {
                    text: T.__("Rename"),
                    tooltip: T.__("Rename"),
                    iconCls: 'x-fa fa-edit',
                    handler: function () {
                        PKF.rename(record);
                    }
                },
                '-',
                {
                    text: T.__("New Key"),
                    tooltip: T.__("New Key"),
                    icon: Cake.image.path+'/key_add.png',
                    handler: function () {
                        PKF.keyCreate(record.get('PasskeyGroup'));
                    }
                },
                {
                    text: T.__("New Group"),
                    tooltip: T.__("New Group"),
                    icon: Cake.image.path+'/folder_add.png',
                    handler: function () {
                        PKF.groupCreate(record.get('PasskeyGroup'));
                    }
                },
                '-',
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: 'x-fa fa-trash',
                    handler: function () {
                        PKF.onDelete([record]);
                    }
                }
            ]
        });
    },

    buildGroupRecord: function (data) {
        var r = {};
        for (key in data) {
            r['PasskeyGroup.'+key] = data[key];
        }
        return Ext.create('WWS.model.PasskeyGridItem', r);
    },

    events: {
        itemmousedown: function (view, record) {
            PKF.config.draggedNode = record;
            var imgurl, text;
            if (record.get('isPasskey')) {
                if (record.get('PasskeyData.url')) {
                    imgurl = Cake.image.path+'/key_go.png';
                } else {
                    imgurl = Cake.image.path+'/key.png';
                }
                text = record.get('PasskeyData.title');
            } else {
                text = '<span class="x-fa fa-folder-o iconBox"></span>' + record.get('PasskeyGroup.name');
            }
            if (imgurl) {
                text = '<img class="iconBox" src="' + imgurl + '" />' + text;
            }
            var ev = event || window.event;
            Wiewind.Action.showTrackMauseComponent(text, ev);
        },

        itemmouseup: function (view, record) {
            if (PKF.config.draggedNode) {
                PKF.move(PKF.config.draggedNode, record);
                PKF.config.draggedNode = null;
            }
        },

        containermouseup: function (view, data) {
            PKF.events.itemmouseup(view, PKF.buildGroupRecord(data));
        }
    },

    move: function (draggedNode, tagertNode) {
        var draggedNodeId, fromId,
            targetNodeId = Number(tagertNode.get('PasskeyGroup.id')),
            isPasskey = draggedNode.get('isPasskey');

        if (isPasskey) {
            fromId = Number(tagertNode.get('PasskeyData.group_id'));
            draggedNodeId = Number(draggedNode.get('PasskeyData.id'));

            // key can not move into root
            if (tagertNode.get('PasskeyGroup.parent_id') == 0) {
                return;
            }
            // for key: always when unequal path than move it
            if (draggedNode.get('PasskeyGroup.id') === targetNodeId) {
                return;
            }
        } else {
            fromId = Number(tagertNode.get('PasskeyGroup.parent_id'));
            draggedNodeId = Number(draggedNode.get('PasskeyGroup.id'));

            // for group:
            // 1. unequal node (id)
            if (draggedNodeId === targetNodeId) {
                return;
            }
            // 2. don't be moved into same parent
            if (Number(draggedNode.get('PasskeyGroup.parent_id')) === Number(targetNodeId)) {
                return;
            }
            // 3. don't be moved into self children node
            if (tagertNode.get('PasskeyGroup.path').indexOf(draggedNode.get('PasskeyGroup.path')) === 0) {
                return;
            }
        }
        PKF.moveEvent(isPasskey, draggedNodeId, targetNodeId, 0, fromId);
    },

    moveEvent: function (isPasskey, draggedId, tagertId, step, fromId) {
        var msg, draggedNodeType;
        if (isPasskey) {
            draggedNodeType = 'key';
            msg = T.__("Are you sure you want to move the key?");
        } else {
            draggedNodeType = 'group';
            msg = T.__("Are you sure you want to move the Group?");
        }
        ABox.confirm(
            msg,
            function () {
                Glb.Ajax({
                    url: Cake.api.path + '/passkeys/json/move',
                    params: {
                        draggedNodeId: draggedId,
                        targetNodeId: tagertId,
                        draggedNodeType: draggedNodeType
                    },
                    success: function(response, options){
                        PKF.refreshAll();

                        if (step === 0) {
                            PKF.config.moveHistory.splice(PKF.config.currentMoveHistoryIndex, PKF.config.moveHistory.length - PKF.config.currentMoveHistoryIndex);
                            PKF.config.moveHistory.push({
                                isPasskey: isPasskey,
                                draggedId: draggedId,
                                tagertId: tagertId,
                                fromId: fromId
                            });
                            PKF.config.currentMoveHistoryIndex = PKF.config.moveHistory.length;
                        } else {
                            PKF.config.currentMoveHistoryIndex = PKF.config.currentMoveHistoryIndex + step;
                        }

                        var tree =  Ext.ComponentQuery.query('passkeytree')[0];
                        if (PKF.config.currentMoveHistoryIndex >= PKF.config.moveHistory.length) {
                            tree.down('[itemId="redoBtn"]').disable(true);
                        } else {
                            tree.down('[itemId="redoBtn"]').enable(true);
                        }
                        if (PKF.config.currentMoveHistoryIndex <= 0 || PKF.config.moveHistory.length === 0) {
                            tree.down('[itemId="undoBtn"]').disable(true);
                        } else {
                            tree.down('[itemId="undoBtn"]').enable(true);
                        }

                        ABox.success(T.__("A Passkey has been moved."));
                    }
                });
            }
        );
    },

    changeMoveHistoryIndex: function (step) {
        var historyLength = PKF.config.moveHistory.length,
            history;
        if (historyLength===0) return;

        if (step > 0) {
            if (PKF.config.currentMoveHistoryIndex > historyLength) return;
            history = PKF.config.moveHistory[PKF.config.currentMoveHistoryIndex];
            PKF.moveEvent(history.isFile, history.draggedId, history.tagertId, step);
        } else {
            if (PKF.config.currentMoveHistoryIndex <= 0) return;
            history = PKF.config.moveHistory[PKF.config.currentMoveHistoryIndex -1];
            PKF.moveEvent(history.isFile, history.draggedId, history.fromId, step);
        }
    }
});