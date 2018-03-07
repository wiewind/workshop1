/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.filemanagement.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementlist',

    init: function () {
        this.setFolderData(Glb.Filemanagement.folderRoot);
    },

    setFolderData: function (folderData) {
        var vm = this.getViewModel(),
            filemanagementpanel = this.getView().up('filemanagementpanel'),
            pathCmp = filemanagementpanel.down('[itemId="pathCmp"]'),
            levelUpBtn = filemanagementpanel.down('button[itemId="levelUpBtn"]');
        vm.setData(folderData);
        vm.getStore('folderItems').loadFolderItems(folderData.id, function () {
            pathCmp.setHtml(vm.get('showPath'));
        });
        if (Number(folderData.id) === 0) {
            levelUpBtn.hide();
        } else {
            levelUpBtn.show();
        }
    },

    onItemTap: function (list, index, target, record) {
        if (record.get('isFile')) {
            MGlb.common.identicalShow({
                xtype: 'filemanagementfile',
                todo: function (panel) {
                    panel.getController().setData(Glb.Filemanagement.getFileData(record));
                }
            });
        } else {
            this.setFolderData(Glb.Filemanagement.getFolderData(record))
        }
    }
});