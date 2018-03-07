/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.view.search.BaseContentController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.searchbasecontent',

    afterRender: function () {
        var me = this,
            view = this.getView(),
            vm = view.getViewModel(),
            data = vm.getData();
        Glb.Ajax({
            url: Cake.api.path + '/SearchPage/json/getContent',
            params: {
                id: data.id
            },
            success: function (response, options) {
                var resp = Ext.decode(response.responseText).data;
                vm.setData(resp);
                me.afterLoad(resp);
            }
        });
    },

    afterLoad: function (data) {}
});