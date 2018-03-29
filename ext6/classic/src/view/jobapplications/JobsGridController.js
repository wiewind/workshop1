/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.view.jobapplications.JobsGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jobapplicationsjobsgrid',

    onItemSelect: function (grid, record) {
        var grid = this.getView();
        grid.down('[itemId="editBtn"]').enable();
        if (record.get('statustype_id') > 1) {
            grid.down('[itemId="sendBtn"]').disable();
        } else {
            grid.down('[itemId="sendBtn"]').enable();
        }
        grid.down('[itemId="deleteBtn"]').enable();
    },

    onItemDblClick: function () {
        this.onClickEdit();
    },

    onClickNew: function () {
        this.openEditJobPanel(0);
    },

    onClickEdit: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            this.openEditJobPanel(records[0].get('id'));
        }
    },

    openEditJobPanel: function (id) {
        var view = this.getView(),
            vm = this.getViewModel(),
            tabpanel = view.up('tabpanel'),
            panel = tabpanel.down('jobapplicationseditpanel[job_id="' + id + '"]');
        if (!panel) {
            panel = Ext.create('WWS.view.jobapplications.edit.Panel', {
                viewModel: {
                    parent: vm,
                    data: {
                        id: id
                    }
                },
                job_id: id,
                callbackFn: function () {
                    view.getStore().reload();
                }
            });
            tabpanel.add(panel);
        }
        tabpanel.setActiveTab(panel);
    },

    onClickSendEmail: function () {

    },

    onClickDelete: function () {

    },

    onClickEmailSetting: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            tabpanel = view.up('tabpanel'),
            panel = tabpanel.down('jobapplicationsmailsetting');
        if (!panel) {
            panel = Ext.create('WWS.view.jobapplications.mailsetting.Panel', {
                viewModel: {
                    parent: vm
                }
            });
            tabpanel.add(panel);
        }
        tabpanel.setActiveTab(panel);

    },

    onClickAttachments: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            tabpanel = view.up('tabpanel'),
            panel = tabpanel.down('jobapplicationsattachmentgrid');
        if (!panel) {
            panel = Ext.create('WWS.view.jobapplications.attachment.Grid', {
                viewModel: {
                    parent: vm
                }
            });
            tabpanel.add(panel);
        }
        tabpanel.setActiveTab(panel);
    }
});