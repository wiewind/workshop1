/**
 * Created by benying.zou on 16.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.FileViewerWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementwindowfileviewer',

    afterRender: function () {
        var vm = this.getViewModel();
        this.getView().add([
            {
                xtype: 'component',
                border: 0,
                autoEl: {
                    tag: 'iframe',
                    src: Cake.api.path + '/filemanagement/getFile/'+vm.get('id')
                }
            }
        ]);
    },

    onClickDelete: function () {
        var fileId = this.getViewModel().get('id');
        FMF.fileDelete(fileId);
        this.closeView();
    },

    onClickRename: function () {
        var vm = this.getViewModel();
        FMF.renameItem(this.getViewModel().getData(), 1, function (form, action) {
            vm.setData(action.result.data);
        });
    },

    onClickCopyUrl: function () {
        FMF.copyFileUrl(this.getViewModel().get('id'));
    },

    onClickDownload: function () {
        FMF.fileDownload(this.getViewModel().get('id'), this.getViewModel().get('name'));
    },

    onClickWorklist: function () {
        FMF.fileToWorklist([this.getViewModel().get('id')]);
    }
});