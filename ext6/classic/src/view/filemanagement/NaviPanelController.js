/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.NaviPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementnavipanel',

    onClickRefresh: function () {
        var view = this.getView();
        view.getStore().load({
            node: view.getRootNode(),
            callback: function () {
                view.expandedPaths.forEach(function(item) {
                    view.expandPath(item);
                });
            }
        })
    },

    onClickUndoMove: function () {
        FMF.changeMoveHistoryIndex(-1);
    },

    onClickRedoMove: function () {
        FMF.changeMoveHistoryIndex(+1);
    },

    containerContextMenu: function (view, e) {
        e.preventDefault();
        e.stopEvent();

        FMF.containerContextMenu().showAt(e.getXY());
    },

    itemContextMenu: function (view, record, item, index, e) {
        e.preventDefault();
        e.stopEvent();

        var menu = (record.get('isFile')) ? FMF.filecontextmenu(record) : FMF.foldercontextmenu(record);
        menu.showAt(e.getXY());
    },

    onItemClick: function (view, record, item, index, e) {
        e.preventDefault();
        e.stopEvent();
        if (record.get('isFile')) {
            FMF.fileOpen(record.data.FilemanagementFile);
        } else {
            FMF.folderOpen(record.data.FilemanagementFolder);
        }
    },

    onItemExpand: function (node) {
        if (!node.isRoot()) {
            var view = this.getView(),
                path = node.getPath(),
                tmp = [];
            view.expandedPaths.forEach(function (p) {
                if (path.indexOf(p) === -1) {
                    tmp.push(p);
                }
            });
            tmp.push(path);
            view.expandedPaths = tmp;
        }
    },

    onItemCollapse: function (node) {
        var view = this.getView(),
            path = node.getPath(),
            tmp = [],
            arr = path.split('/'),
            level = arr.length,
            parentPath = path.substring(0, path.lastIndexOf('/')),
            pushParent = level > 3;
        view.expandedPaths.forEach(function (p) {
            if (p.indexOf(path) === -1) {
                tmp.push(p);
            }
            if (pushParent && p !== path) {
                if (p.indexOf(parentPath) >= 0) {
                    pushParent = false;
                }
            }
        });
        // format of path is so: "/tree_dNode_0/tree_dNode_59"
        if (pushParent) {
            tmp.push(parentPath);
        }

        view.expandedPaths = tmp;
    },

    onContainerMouseUp: function (view) {
        FMF.events.containermouseup(view, Glb.Filemanagement.folderRoot);
    }
});