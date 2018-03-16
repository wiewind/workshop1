/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.Functions', {
    singleton: true,
    alternateClassName: ['FMF'],

    config: {
        draggedNode: null,
        moveHistory: [],
        currentMoveHistoryIndex: 0
    },

    displayPath: function (path) {
        if (!path || path.indexOf('/') === -1) return T.__('Root');
        return path.substring(path.indexOf('/')+1);
    },

    refreshTree: function () {
        Ext.ComponentQuery.query('filemanagementnavipanel')[0].getController().onClickRefresh();
    },

    refreshGrid: function () {
        Ext.ComponentQuery.query('filemanagementgrid')[0].getController().onClickRefresh();
    },

    refreshWorklist: function () {
        Ext.ComponentQuery.query('filemanagementworklistgrid')[0].getStore().reload();
    },

    refreshSearchResult: function () {
        var window = Ext.ComponentQuery.query('filemanagementsearchresultwindow');
        if (!Wiewind.isEmpty(window)) {
            window[0].getStore().load();
        }
    },

    refreshAll: function () {
        FMF.refreshTree();
        FMF.refreshGrid();
        FMF.refreshWorklist();
        FMF.refreshSearchResult();
    },

    containerContextMenu: function () {
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            items: [
                {
                    text: T.__("New Folder"),
                    tooltip: T.__("New Folder"),
                    iconCls: Glb.btnSetting.addIconCls,
                    handler: function () {
                        FMF.folderCreate();
                    }
                },
                '-',
                {
                    text: Glb.btnSetting.refreshText,
                    iconCls: Glb.btnSetting.refreshIconCls,
                    handler: function () {
                        FMF.refreshTree();
                    }
                }
            ]
        });
    },

    filecontextmenu: function(record) {
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            items: [
                {
                    text: T.__("Open"),
                    tooltip: T.__("Open"),
                    iconCls: 'x-fa fa-file-text-o',
                    handler: function () {
                        FMF.fileOpen(record.get('FilemanagementFile'));
                    }
                },
                {
                    text: T.__("Download"),
                    tooltip: T.__("Download"),
                    iconCls: 'x-fa fa-download',
                    handler: function () {
                        FMF.fileDownload(record.get('FilemanagementFile.id'), record.get('FilemanagementFile.name'));
                    }
                },
                '-',
                {
                    text: T.__("Delete"),
                    tooltip: T.__("Delete"),
                    iconCls: Glb.btnSetting.deleteIconCls2,
                    handler: function () {
                        ABox.confirm(
                            T.__("Are you sure you want to delete the file?"),
                            function () {
                                FMF.fileDelete(record.get('FilemanagementFile.id'));
                            }
                        );
                    }
                },
                {
                    text: T.__("Worklist"),
                    tooltip: T.__("add to worklist"),
                    iconCls: 'x-fa fa-ge',
                    handler: function () {
                        FMF.fileToWorklist([record.get('FilemanagementFile.id')]);
                    }
                },
                '-',
                {
                    text: T.__("Rename"),
                    tooltip: T.__("Rename"),
                    iconCls: 'x-fa fa-edit',
                    handler: function () {
                        FMF.renameItem(record.get('FilemanagementFile'), 1);
                    }
                },
                {
                    text: T.__("Copy URL"),
                    tooltip: T.__("Copy URL"),
                    iconCls: 'x-fa fa-copy',
                    handler: function () {
                        FMF.copyFileUrl(record.get('FilemanagementFile.id'));
                    }
                }
            ]
        });
    },

    foldercontextmenu: function(record) {
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            items: [
                {
                    text: T.__("Open"),
                    tooltip: T.__("Open"),
                    iconCls: 'x-fa fa-folder-open-o',
                    handler: function () {
                        FMF.folderOpen(record.get('FilemanagementFolder'));
                    }
                },
                '-',
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: Glb.btnSetting.deleteIconCls2,
                    handler: function () {
                        ABox.confirm(
                            T.__("Are you sure you want to delete the Folder?"),
                            function (btn) {
                                FMF.folderDelete(record.get('FilemanagementFolder'))
                            }
                        );
                    }
                },
                '-',
                {
                    text: T.__("Rename"),
                    tooltip: T.__("Rename"),
                    iconCls: 'x-fa fa-edit',
                    handler: function () {
                        FMF.renameItem(record.get('FilemanagementFolder'), 0);
                    }
                }
            ]
        });
    },

    copyFileUrl: function (fileId) {
        Wiewind.Action.setClipboardText(FMF.getFileUrl(fileId));
    },

    getFileUrl: function (fileId) {
        var dd = new Date(),
            expire = Number(Cake.filemanagement.expire),
            tt = '99999999999999';
        if (expire > 0) {
            dd.setDate(dd.getDate() + expire);
            tt = Ext.Date.format(dd, "YmdHis");
        }
        return Cake.projUrl + '/' + Cake.api.dirname + '/filemanagement/getFile/co' + btoa(btoa(Cake.filemanagement.chip) + fileId + ':' + tt + ':' + Math.floor(Math.random() * 10000000000));
    },

    folderCreate: function (parentFolder) {
        if (!parentFolder) parentFolder = Glb.Filemanagement.folderRoot;
        Ext.create('WWS.view.filemanagement.window.FolderCreateWindow', {
            viewModel: {
                data: parentFolder
            }
        });
    },

    folderOpen: function (data) {
        var grid = Ext.ComponentQuery.query('filemanagementgrid')[0],
            tabpanel = Ext.ComponentQuery.query('filemanagementpanel')[0].down('tabpanel[itemId="fmTabpanel"]');
        grid.getController().setFolderData(data);
        tabpanel.setActiveTab(grid);
    },

    folderDelete: function (data) {
        ABox.confirm(
            T.__("Are you sure you want to delete the folder?"),
            function () {
                Glb.Ajax({
                    url: Cake.api.path + '/filemanagement/json/folderDelete',
                    params: {
                        folderId: data.id
                    },
                    success: function(response, options){
                        FMF.refreshAll();
                        ABox.success(Wiewind.String.sprintf(T.__("The folder [%s] has been deleted."), FMF.displayPath(data.path)));
                    }
                });
            }
        );
    },

    fileOpen: function (data) {
        var suffix = Wiewind.File.getFileSuffix(data.name);
        if (Wiewind.Array.in_array(suffix, Cake.filemanagement.allowView)) {
            Ext.create('WWS.view.filemanagement.window.FileViewerWindow', {
                viewModel: {
                    data: data
                }
            });
        } else {
            ABox.info(
                T.__("There is not preview for this file, but you can download it."),
                function () {
                    FMF.fileDownload(data.id, data.name);
                }
            );
        }
    },

    fileDelete: function (fileId) {
        ABox.confirm(
            T.__("Are you sure you want to delete the file?"),
            function () {
                Glb.Ajax({
                    url: Cake.api.path + '/filemanagement/json/fileDelete',
                    params: {
                        fileId: fileId
                    },
                    success: function(response, options){
                        FMF.refreshAll();
                        ABox.success(T.__("The file has been deleted."));
                    }
                });
            }
        );
    },

    fileDownload: function (fileId, filename) {
        var url = Cake.api.path + '/filemanagement/getFile/' + fileId + '/1';
        Wiewind.Action.click({
            url: url,
            download: '[WSFM]_' + filename.replace(/ /g, "_")
        })
    },

    renameItem: function (data, isFile, callbackFn) {
        callbackFn = callbackFn || false;
        var p = Ext.create('WWS.view.filemanagement.window.RenameWindow', {
            viewModel: {
                data: Ext.apply(data, {
                    isFile: isFile ? 1 : 0
                })
            },
            callbackFn: callbackFn
        });
    },

    mixDelete: function (folderIdss, fileIds) {
        folderIds = folderIdss || [];
        fileIds = fileIds || [];
        ABox.confirm(
            T.__("Are you sure you want to delete the selected records?"),
            function () {
                var items = {folders: folderIdss, files: fileIds};
                Glb.Ajax({
                    url: Cake.api.path + '/filemanagement/transjson/mixDelete',
                    params: {
                        items: Ext.encode(items)
                    },
                    success: function(response, options){
                        FMF.refreshAll();
                        ABox.success(T.__("The selected records are deleted."));
                    }
                });
            }
        );
    },

    fileToWorklist: function (fileIds) {
        Glb.Ajax({
            url: Cake.api.path + '/filemanagement/json/addToWorklist',
            params: {
                fileIds: Ext.encode(fileIds)
            },
            success: function () {
                ABox.success(
                    T.__('Successfully added to worklist!'),
                    FMF.refreshWorklist()
                );
            }
        });
    },

    fileRemoveFromWorklist: function (fileIds) {
        if (fileIds.length > 0) {
            ABox.confirm(
                T.__("Are you sure you want to remove the selected files from worklist?"),
                function () {
                    Glb.Ajax({
                        url: Cake.api.path + '/filemanagement/json/removeFromWorklist',
                        params: {
                            fileIds: Ext.encode(fileIds)
                        },
                        success: function () {
                            ABox.success(
                                T.__('Successfully removed from worklist!'),
                                FMF.refreshWorklist()
                            );
                        }
                    });
                }
            );
        }
    },

    fileUpload: function (forderData) {
        if (forderData.id === 0) {
            ABox.failure(T.__("You can not upload to the root!"));
        } else {
            Ext.create('WWS.view.filemanagement.window.FileUploadWindow', {
                viewModel: {
                    data: forderData
                }
            });
        }
    },

    events: {
        itemmouseenter: function (view, record, item) {
            if (record.get('isFile')) {
                Ext.fly(item).set({
                    'data-qtip': '<b>'+record.get('FilemanagementFile.name')+'</b><br />'+
                    '<b>'+T.__("Path")+':</b> '+FMF.displayPath(record.get('FilemanagementFolder.path'))+'<br />'+
                    '<b>'+T.__("Size")+':</b> '+Ext.util.Format.fileSize(record.get('FilemanagementFile.size'))+'<br />'+
                    '<b>'+T.__("Public")+':</b> '+((record.get('FilemanagementFolder.customer_id') > 0)? ''+T.__("no") : ''+T.__("yes"))+'<br />'+
                    '<b>'+T.__("Created")+':</b> '+Glb.Date.displayDateFromString(record.get('FilemanagementFile.created'), ' H:i')+'<br />'+
                    '<b>'+T.__("Created by")+':</b> '+record.get('FilemanagementFile.created_by_name')+'<br />'+
                    '<b>'+T.__("Modified")+':</b> '+Glb.Date.displayDateFromString(record.get('FilemanagementFile.modified'), ' H:i')+'<br />' +
                    '<b>'+T.__("Modified by")+':</b> '+record.get('FilemanagementFile.modified_by_name')+'<br />'
                });
            } else {
                Ext.fly(item).set({
                    'data-qtip': '<b>'+record.get('FilemanagementFolder.name')+'</b><br />'+
                    '<b>'+T.__("Path")+':</b> '+FMF.displayPath(record.get('FilemanagementFolder.path'))+'<br />'+
                    '<b>'+T.__("Public")+':</b> '+((record.get('FilemanagementFolder.customer_id') > 0)? ''+T.__("no") : ''+T.__("yes"))+'<br />'+
                    '<b>'+T.__("Created")+':</b> '+Glb.Date.displayDateFromString(record.get('FilemanagementFolder.created'), ' H:i')+'<br />'+
                    '<b>'+T.__("Created by")+':</b> '+record.get('FilemanagementFolder.created_by_name')+'<br />'+
                    '<b>'+T.__("Modified")+':</b> '+Glb.Date.displayDateFromString(record.get('FilemanagementFolder.modified'), ' H:i')+'<br />' +
                    '<b>'+T.__("Modified by")+':</b> '+record.get('FilemanagementFolder.modified_by_name')+'<br />'
                });
            }
        },

        itemmousedown: function (view, record) {
            FMF.config.draggedNode = record;
            var imgurl, text;
            if (record.get('isFile')) {
                imgurl = Cake.api.path + '/filetypes/icon/' + Wiewind.File.getFileSuffix(record.get('FilemanagementFile.name'));
                text = record.get('FilemanagementFile.name');
            } else {
                imgurl ='';
                text = record.get('FilemanagementFolder.name');
            }
            var text = (imgurl) ? '<img class="iconBox" src="'+imgurl+'" /> ' + text : '<span class="x-fa fa-folder-o iconBox"></span>' + text;
            var ev = event || window.event;
            Wiewind.Action.showTrackMauseComponent(text, ev);
        },

        itemmouseup: function (view, record) {
            if (FMF.config.draggedNode) {
                FMF.move(FMF.config.draggedNode, record);
                FMF.config.draggedNode = null;
            }
        },

        containermouseup: function (view, data) {
            var record = FMF.buildFolderRecord(data);
            FMF.events.itemmouseup(view, record);
        }
    },

    move: function (draggedNode, tagertNode) {
        var isFile = (draggedNode.get('isFile')) ? 1 : 0,
            draggedId, fromId = 0;
        if (isFile) {
            draggedId = draggedNode.get('FilemanagementFile.id');
            fromId = draggedNode.get('FilemanagementFile.folder_id');
        } else {
            draggedId = draggedNode.get('FilemanagementFolder.id');
            fromId = draggedNode.get('FilemanagementFolder.parent_id');
        }
        var tagertId = tagertNode.get('FilemanagementFolder.id');

        if (isFile) {
            if (tagertId === 0) {
                ABox.failure(T.__("The file can not be moved to the root!"));
                return;
            }
            if (draggedNode.get('FilemanagementFile.folder_id') === tagertId) {
                return;
            }
        }

        if (!isFile) {
            if (draggedId === tagertId) {
                return;
            }
            if (draggedNode.get('FilemanagementFolder.parent_id') === tagertId) {
                return;
            }
            if (tagertNode.get('FilemanagementFolder.path').indexOf(draggedNode.get('FilemanagementFolder.path')) === 0) {
                ABox.failure(T.__("The Folder kann not move into itself or its subfolder"));
                return;
            }
        }

        // console.log(draggedNode);

        FMF.moveEvent(isFile, draggedId, tagertId, 0, fromId);
    },

    moveEvent: function (isFile, draggedId, tagertId, step, fromId) {
        Glb.Ajax({
            url: Cake.api.path + '/filemanagement/json/move',
            params: {
                isFile: isFile,
                draggedId: draggedId,
                tagertId: tagertId
            },
            success: function(response, options) {
                FMF.refreshAll();
                if (step === 0) {
                    FMF.config.moveHistory.splice(FMF.config.currentMoveHistoryIndex, FMF.config.moveHistory.length - FMF.config.currentMoveHistoryIndex);
                    FMF.config.moveHistory.push({
                        isFile: isFile,
                        draggedId: draggedId,
                        tagertId: tagertId,
                        fromId: fromId
                    });
                    FMF.config.currentMoveHistoryIndex = FMF.config.moveHistory.length;
                } else {
                    FMF.config.currentMoveHistoryIndex = FMF.config.currentMoveHistoryIndex + step;
                }

                var tree =  Ext.ComponentQuery.query('filemanagementnavipanel')[0];
                if (FMF.config.currentMoveHistoryIndex >= FMF.config.moveHistory.length) {
                    tree.down('[itemId="redoBtn"]').disable(true);
                } else {
                    tree.down('[itemId="redoBtn"]').enable(true);
                }
                if (FMF.config.currentMoveHistoryIndex <= 0 || FMF.config.moveHistory.length === 0) {
                    tree.down('[itemId="undoBtn"]').disable(true);
                } else {
                    tree.down('[itemId="undoBtn"]').enable(true);
                }
            },
            failure: function (response, options) {
                FMF.refreshTree();
            }
        });
    },

    changeMoveHistoryIndex: function (step) {
        var historyLength = FMF.config.moveHistory.length,
            history;
        if (historyLength===0) return;

        if (step > 0) {
            if (FMF.config.currentMoveHistoryIndex > historyLength) return;
            history = FMF.config.moveHistory[FMF.config.currentMoveHistoryIndex];
            FMF.moveEvent(history.isFile, history.draggedId, history.tagertId, step);
        } else {
            if (FMF.config.currentMoveHistoryIndex <= 0) return;
            history = FMF.config.moveHistory[FMF.config.currentMoveHistoryIndex -1];
            FMF.moveEvent(history.isFile, history.draggedId, history.fromId, step);
        }
    },

    buildFolderRecord: function (data) {
        var r = {};
        for (key in data) {
            r['FilemanagementFolder.'+key] = data[key];
        }
        return Ext.create('WWS.model.FilemanagementGridItem', r);
    }
});