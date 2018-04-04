/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define('WWS.view.jobapplications.edit.JobStatusGridController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.jobapplicationseditjobstatusgrid',

    onItemSelect: function () {
        var view = this.getView();
        view.down('[itemId="deleteBtn"]').enable();
    },

    onCellEdit: function (editor, context) {
        var vm = this.getViewModel(),
            rec = context.record;
        cont = context;
        Glb.Ajax({
            url: Cake.api.path + '/jobapplications/json/saveJobStatus',
            params: rec.getData(),
            success: function () {
                vm.getStore('jobStatusStore').reload();
            }
        });
    },

    onClickAdd: function () {
        var vm = this.getViewModel();
        Ext.create('WWS.view.jobapplications.edit.JobStatusWindow', {
            viewModel: {
                parent: vm,
                data: {
                    job_id: vm.get('id')
                }
            },
            callbackFn: function () {
                vm.getStore('jobStatusStore').reload();
            }
        });
    },

    onClickDelete: function () {
        var view = this.getView(),
            records = view.getSelectionModel().getSelection();
        if (records.length === 1) {
            ABox.confirm(
                T.__("Are you sure you want to delete the status?"),
                function () {
                    var id = records[0].get('id');
                    Glb.Ajax({
                        url: Cake.api.path + '/jobapplications/json/deleteJobStatus/',
                        params: {
                            track_id: id
                        },
                        success: function(response){
                            view.getStore().reload();
                        }
                    });
                }
            );
        }
    }
});