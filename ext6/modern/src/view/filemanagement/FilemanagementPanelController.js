/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.filemanagement.FilemanagementPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementpanel',

    onClickParentDir: function () {
        var me = this,
            view = this.getView(),
            listView = view.down('filemanagementlist'),
            vm = listView.getViewModel(),
            ctr = listView.getController(),
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
                        ctr.setFolderData(data);
                    }
                }
            });
        } else {
            ctr.setFolderData(Glb.Filemanagement.folderRoot);
        }
    }
});