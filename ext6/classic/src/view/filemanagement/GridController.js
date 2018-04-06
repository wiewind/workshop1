/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementgrid',

    afterRender: function () {
        this.setFolderData(Glb.Filemanagement.folderRoot);
    },

    setFolderData: function (folderData) {
        var vm = this.getViewModel();
        vm.setData(folderData);
        vm.getStore('folderItems').loadFolderItems(folderData.id);

        var view = this.getView(),
            btnUpload = view.down('[btnName="upload"]'),
            btnParent = view.down('[btnName="parentDir"]');
        if (folderData.id > 0) {
            btnUpload.enable();
            btnParent.enable();
        } else {
            btnUpload.disable();
            btnParent.disable();
        }
    },

    onClickRefresh: function () {
        var me = this,
            vm = this.getViewModel(),
            folderId = vm.get('id');
        Glb.Ajax({
            url: Cake.api.path + '/filemanagement/json/getFolderData',
            params: {
                folderId: folderId
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText).data;
                if (!Wiewind.isEmpty(data)) {
                    me.setFolderData(data);
                } else {
                    me.setFolderData(Glb.Filemanagement.folderRoot);
                }
            }
        });
    },

    onSelectionchange: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection(),
            selectCount = records.length,
            btnCopy = view.down('[btnName="copyurl"]'),
            btnDelete = view.down('[btnName="delete"]'),
            btnRename = view.down('[btnName="rename"]'),
            btnDownload = view.down('[btnName="download"]'),
            btnToWorklist = view.down('[btnName="toworklist"]');
        if (selectCount > 0) {
            btnDelete.enable();
            var allFiles = true;
            for (var i=0; i<selectCount; i++) {
                if (!records[i].get('isFile')) {
                    allFiles = false;
                    break;
                }
            }
            if (allFiles) {
                btnToWorklist.enable();
                btnDownload.enable();
            } else {
                btnToWorklist.disable();
                btnDownload.disable();
            }
        } else {
            btnDelete.disable();
            btnToWorklist.disable();
            btnDownload.disable();
        }
        if (selectCount === 1) {
            btnRename.enable();
            if (records[0].get('isFile')) {
                btnCopy.enable();
            } else {
                btnCopy.disable();
            }
        } else {
            btnCopy.disable();
            btnRename.disable();
        }
    },

    itemDblClick: function (gridView, record) {
        if (record.get('isFile')) {
            FMF.fileOpen(record.data.FilemanagementFile);
        } else {
            FMF.folderOpen(record.data.FilemanagementFolder);
        }
    },

    onClickParentDir: function () {
        var me = this,
            vm = this.getViewModel(),
            parent_id = vm.get('parent_id');
        if (parent_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/filemanagement/json/getFolderData',
                params: {
                    folderId: parent_id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    if (!Wiewind.isEmpty(data)) {
                        me.setFolderData(data);
                    }
                }
            });
        } else {
            this.setFolderData(Glb.Filemanagement.folderRoot);
        }
    },

    onClickNewFolder: function () {
        var data = this.getViewModel().getData();
        FMF.folderCreate(data);
    },

    onClickDelete: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length > 0) {
            var selectedItems = {
                folders: [],
                files: []
            };
            records.forEach(function (item) {
                if (item.get('isFile')) {
                    selectedItems.files.push(item.get('FilemanagementFile.id'));
                } else {
                    selectedItems.folders.push(item.get('FilemanagementFolder.id'));
                }
            });
            FMF.mixDelete(selectedItems.folders, selectedItems.files);
        }
    },

    onClickCopyUrl: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            FMF.copyFileUrl(records[0].get('FilemanagementFile.id'))
        }
    },

    onClickRename: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            var isFile = records[0].get('isFile'),
                data = isFile ? records[0].get('FilemanagementFile') : records[0].get('FilemanagementFolder');
            FMF.renameItem(data, isFile);
        }
    },

    onClickDownload: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length > 0) {
            for (var i=0; i<records.length; i++) {
                if (records[i].get('isFile')) {
                    FMF.fileDownload(records[i].get('FilemanagementFile.id'), records[i].get('FilemanagementFile.name'));
                }
            }
        }
    },

    onClickWorklist: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection(),
            fileIds = [];
        if (records.length > 0) {
            for (var i=0; i<records.length; i++) {
                if (records[i].get('isFile')) {
                    fileIds.push(records[i].get('FilemanagementFile.id'));
                }
            }
            if (fileIds) {
                FMF.fileToWorklist(fileIds);
            }
        }
    },

    onClickUpload: function () {
        FMF.fileUpload(this.getViewModel().getData());
    },

    onClickSearch: function (field, event) {
        var text = field.getValue();
        if (!text) {
            ABox.warning(
                T.__("Please enter your search text"),
                function() {
                    Ext.getCmp('filemanagementSearchText').focus();
                }
            );
        } else {
            Ext.create('WWS.view.filemanagement.search.ResultWindow', {
                viewModel: {
                    data: {
                        text: text,
                        folderId: this.getViewModel().get('id')
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

    onClickCancel: function (field) {
        field.setValue('');
    },

    onContainerMouseUp: function (view) {
        var data = this.getViewModel().getData();
        FMF.events.containermouseup(view, data);
    }
});
