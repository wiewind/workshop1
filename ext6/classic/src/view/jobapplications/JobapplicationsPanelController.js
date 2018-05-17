/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define('WWS.view.jobapplications.JobapplicationsPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jobapplicationspanel',

    afterRender: function () {
        var vm = this.getViewModel(),
            view = this.getView();
        Glb.Ajax({
            url: Cake.api.path + '/jobapplications/json/getMailsetting',
            success: function (response, options) {
                var resp = Ext.decode(response.responseText);
                vm.setData({
                    mailsetting: resp.data
                });
                view.add([
                    {
                        xtype: 'jobapplicationsjobsgrid',
                        viewModel: {
                            parent: vm
                        }
                    }
                ]);
                Glb.History.add(view.items.items[0]);
            }
        });
    }
});
