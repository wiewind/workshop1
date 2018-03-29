/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.jobapplications.Functions', {
    singleton: true,
    alternateClassName: ['JAF'],

    getJobStatusImageId: function (status_id) {
        switch (status_id) {
            case 2:
            case 3:
            case 4:
                return 2;
            case 5:
            case 6:
                return 3;
            case 7:
                return 7;
            case 8:
                return 8;
            case 9:
                return 9;
            default:
                return 1;
        }
    },

    setBassData: function (data) {
        var vm = Ext.ComponentQuery.query('jobapplicationspanel')[0].getViewModel();
        vm.setData(data);
    },

    openEditAttachmentWindow: function (attachment_id) {
        Ext.create('WWS.view.jobapplications.attachment.EditWindow', {
            viewModel: {
                data: {
                    id: attachment_id
                }
            }
        });
    },

    refreshAllAttachments: function () {
        var vm = Ext.ComponentQuery.query('jobapplicationspanel')[0].getViewModel();
        vm.getStore('allAttachmentsStore').reload();
    }
});