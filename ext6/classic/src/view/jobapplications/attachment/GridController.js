/**
 * Created by benying.zou on 29.03.2018.
 */
Ext.define('WWS.view.jobapplications.attachment.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jobapplicationsattachmentgrid',

    onItemSelect: function (grid, record) {
        var grid = this.getView();
        grid.down('[itemId="editBtn"]').enable();
        grid.down('[itemId="deleteBtn"]').enable();
    },

    onItemDblClick: function () {
        this.onClickEdit();
    },

    onClickNew: function () {
        JAF.openEditAttachmentWindow(0);
    },

    onClickEdit: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            JAF.openEditAttachmentWindow(records[0].get('id'));
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            record = view.getSelection();
        if (record.length > 0) {
            ABox.confirm(
                T.__("Are you sure you want to delete the Attachment?"),
                function () {
                    Glb.Ajax({
                        url: Cake.api.path + '/jobapplications/transjson/deleteAttachment',
                        params: {
                            id: record[0].get('id')
                        },
                        success: function(response){
                            JAF.refreshAllAttachments();
                            ABox.success(T.__("Attachment was deleted."));
                        }
                    });
                }
            );
        }
    }
});