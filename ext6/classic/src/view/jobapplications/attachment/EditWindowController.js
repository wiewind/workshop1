/**
 * Created by benying.zou on 29.03.2018.
 */
Ext.define ('WWS.view.jobapplications.attachment.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.jobapplicationsattachmenteditwindow',

    init: function () {
        var vm = this.getViewModel(),
            id = vm.get('id');
        if (id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/jobapplications/json/loadAttachment',
                params: {
                    id: id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    vm.setData(data);
                }
            });
        }
    },

    submitSuccess: function (form, action) {
        JAF.refreshAllAttachments();
        ABox.success(T.__("Attachment is saved."));
        this.closeView();
    }
});