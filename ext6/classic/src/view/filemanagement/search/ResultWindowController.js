/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.filemanagement.search.ResultWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementsearchresultwindow',

    onSelectionchange: function () {
        var view = this.getView().down('grid'),
            records = view.getSelectionModel().getSelection(),
            selectCount = records.length,
            btnCopy = view.down('[btnName="copyurl"]'),
            btnDownload = view.down('[btnName="download"]'),
            btnToWorklist = view.down('[btnName="toworklist"]');
        if (selectCount > 0) {
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
            btnToWorklist.disable();
            btnDownload.disable();
        }
        if (selectCount === 1) {
            if (records[0].get('isFile')) {
                btnCopy.enable();
            } else {
                btnCopy.disable();
            }
        } else {
            btnCopy.disable();
        }
    },

    onItemdblclick: function (view, record) {
        if (record.get('isFile')) {
            // open file
            FMF.fileOpen(record.get('FilemanagementFile'));
        } else {
            // open folder
            FMF.folderOpen(record.get('FilemanagementFolder'));
            this.closeView();
        }
    },

    onClickCopyUrl: function () {
        var view = this.getView(),
            records = view.down('grid').getSelectionModel().getSelection();
        if (records.length === 1) {
            FMF.copyFileUrl(records[0].get('FilemanagementFile.id'))
        }
    },

    onClickDownload: function () {
        var view = this.getView(),
            records = view.down('grid').getSelectionModel().getSelection();
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
            records = view.down('grid').getSelectionModel().getSelection(),
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
    }
});
