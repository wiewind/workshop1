/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.search.SearchPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchpanel',

    init: function (view) {
        this.callParent(view);
        this.setData();
    },

    setData: function (id) {
        var vm = this.getViewModel();
        id = id || vm.get('id');
        Glb.Ajax({
            url: Cake.api.path + '/SearchPage/json/getContent',
            params: {
                id: id
            },
            success: function (response, options) {
                var resp = Ext.decode(response.responseText).data;
                vm.setData(resp);
            }
        });
    },

    onClickSelect: function () {
        SFns.openSelect();
    }
});