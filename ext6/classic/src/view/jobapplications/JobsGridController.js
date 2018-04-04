/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define('WWS.view.jobapplications.JobsGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jobapplicationsjobsgrid',

    onItemSelect: function (grid, record) {
        var grid = this.getView();
        grid.down('[itemId="editBtn"]').enable();
        if (record.get('statustype_id') > 1 || !record.get('email')) {
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
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            var rec = records[0];
            if (rec.get('email_applied')) {
                ABox.error(T.__('This mail was send'));
            } else if (rec.get('statustype_id') > 1) {
                APP.MBox.error(T.__("The mail applied was gone."));
            } else {
                Glb.Ajax({
                    url: Cake.api.path + '/jobapplications/json/sendMail',
                    params: {
                        job_id: rec.get('id')
                    },
                    success: function(response){
                        view.getStore().reload();
                        ABox.success(T.__("Mail sended."));
                    }
                });
            }
        }
    },

    onClickDelete: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            ABox.confirm(
                T.__("Are you sure you want to delete the job?"),
                function () {
                        Glb.Ajax({
                            url: Cake.api.path + '/jobapplications/json/deleteJob',
                            params: {
                                job_id: records[0].get('id')
                            },
                            success: function(response){
                                view.getStore().reload();
                                ABox.success(T.__("Job deleted."));
                            }
                        });
                }
            );
        }
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