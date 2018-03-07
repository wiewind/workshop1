/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.worklist.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementworklistgrid',

    onSelectionchange: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection(),
            selectCount = records.length,
            btnCopy = view.down('[btnName="copyurl"]'),
            btnDelete = view.down('[btnName="delete"]'),
            btnRename = view.down('[btnName="rename"]'),
            btnDownload = view.down('[btnName="download"]'),
            btnShare = view.down('[btnName="share"]');
        if (selectCount > 0) {
            btnDelete.enable();
            btnShare.enable();
            btnDownload.enable();
        } else {
            btnDelete.disable();
            btnShare.disable();
            btnDownload.disable();
        }
        if (selectCount === 1) {
            btnRename.enable();
            btnCopy.enable();
        } else {
            btnCopy.disable();
            btnRename.disable();
        }
    },

    itemDblClick: function (gridView, record) {
        FMF.fileOpen(record.get('FilemanagementFile'));
    },

    onClickDelete: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length > 0) {
            var fileIds = [];
            for (var i=0; i<records.length; i++) {
                fileIds.push(records[i].get('FilemanagementFile.id'));
            }
            FMF.fileRemoveFromWorklist(fileIds);
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
                FMF.fileDownload(records[i].get('FilemanagementFile.id'), records[i].get('FilemanagementFile.name'));
            }
        }
    },

    onClickShare: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection(),
            files = [];
        if (records.length > 0) {
            for (var i=0; i<records.length; i++) {
                files.push(records[i].get('FilemanagementFile'));
            }
            Ext.create('WWS.view.filemanagement.window.ShareWindow', {
                viewModel: {
                    data: {
                        files: files
                    }
                }
            });
        }
    }
});
