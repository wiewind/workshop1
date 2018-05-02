/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FileUploadWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.filemanagementwindowfileupload',

    afterRender: function () {
        var box = document.getElementById('drop_area');
        box.addEventListener("dragenter",function(e){
            box.style.background = '#eeeeee';
        });
        box.addEventListener("dragleave",function(e){
            box.style.background = '#ffffff';
        });
        box.addEventListener("drop", this.onDrop, false);
    },

    onDrop: function (e) {
        e.preventDefault();
        var box = document.getElementById('drop_area'),
            ctr = Ext.ComponentQuery.query('filemanagementwindowfileupload')[0].getController(),
            fileList = e.dataTransfer.files;

        box.style.background = '#ffffff';

        // var uploadField = view.down('multifilefield');
        // uploadField.addFiles(fileList);

        if(fileList.length == 0) {
            return false;
        }

        ctr.addFilesToWM(fileList);
    },

    addFilesToWM: function (files) {
        var view = Ext.ComponentQuery.query('filemanagementwindowfileupload')[0],
            vm = view.getViewModel(),
            store = vm.getStore('uploadFiles'),
            vmFiles = vm.get('files');

        for (var i=0; i<files.length; i++) {
            var filename = files[i].name,
                size = files[i].size,
                message = '',
                suffix = Wiewind.File.getFileSuffix(filename),
                fid = btoa(Date.now() + '::' + SSD.data.user.username + '::' + Math.floor(Math.random() * 10000000000) + '::' + i);

            if (size == 0) continue;

            var fileInArray = false;
            for(var j=0; j<vmFiles.length; j++) {
                if (vmFiles[j].name == filename && vmFiles[j].size == size && vmFiles[j].lastModified == files[i].lastModified) {
                    fileInArray = true;
                    break;
                }
            }

            if (fileInArray) continue;

            if (Wiewind.Array.in_array(suffix, Cake.filemanagement.notAllowdTypes)) {
                message += '* ' + T.__("This File ist not allowed type to upload.") + '<br />';
            }
            if (size > Cake.filemanagement.maxFileSize) {
                message += '* ' + T.__("This File ist too large.") +
                    Wiewind.String.sprintf(T.__("The limit is %s."), Ext.util.Format.fileSize(Cake.filemanagement.maxFileSize)) + '<br />';
            }

            files[i].fid = fid;
            files[i].message = message;
            vmFiles.push(files[i]);
        }

        vm.setData({files: vmFiles});

        store.loadData(vmFiles);
    },

    onDelete: function(grid, rowIndex, colIndex) {
        var vm = this.getViewModel();
        ABox.confirm(
            T.__("Are you sure you want to delete the file?"),
            function () {
                var store = grid.getStore(),
                    rec = store.getAt(rowIndex),
                    fid = rec.get('fid'),
                    data = [],
                    files = vm.get('files');
                store.remove(rec);

                for (var i=0; i<files.length; i++) {
                    if (files[i].fid !== fid) {
                        data.push(files[i]);
                    }
                }
                vm.setData({files: data});
            }
        );
    },

    onSave: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            files = vm.get('files'),
            folderId = vm.get('id'),
            fd = new FormData();

        for (var i=0; i<files.length; i++) {
            if (files[i].message) {
                ABox.error(T.__('Some files do not conform to the upload rules.'));
                return;
            }
            fd.append('documents[]', files[i]);
        }
        fd.append('folderId', folderId);

        Glb.common.mask(T.__("Uploading your file(s)..."));
        $.ajax({
            type: "POST",
            url: Cake.api.path + '/filemanagement/json/filesUpload',
            data: fd,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000,
            success: function (data, status, xhr) {
                var res = JSON.parse(data);
                Glb.common.unmask();
                if (res.success) {
                    FMF.refreshAll();
                    view.close();
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr, status, eror);
                Glb.common.unmask();
            }
        });
    },

    onCancel: function () {
        this.closeView();
    },

    afterFileChange: function (files) {
        this.addFilesToWM(files);
        var filefield = this.getView().down('multifilefield');
        filefield.fileInputEl.dom.value = null;
        Ext.form.field.File.superclass.setValue.call(filefield, '');
    }
});