/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define ('WWS.view.search.EditHotlineWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.searchedithotlinewindow',

    afterRender: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            id = vm.get('id');
        view.setTitle(SSD.config.modules.search.text);
        Glb.Ajax({
            url: Cake.api.path + '/SearchPage/json/getHotlink',
            params: {
                id: id
            },
            success: function (response, options) {
                var resp = Ext.decode(response.responseText).data;
                vm.setData(resp);
            }
        });
    },

    submitSuccess: function (form, action) {
        var me = this;
        ABox.success(
            T.__('Successfully saved'),
            function () {
                var data = Ext.decode(action.response.responseText).data;
                SHF.refreshWidgets(data);
                me.closeView();
            }
        );
    }
});