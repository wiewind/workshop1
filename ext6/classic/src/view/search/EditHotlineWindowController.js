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
        if (id > 0) {
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
        }
    },

    submitSuccess: function (form, action) {
        var me = this;
        ABox.success(
            T.__('Successfully saved'),
            function () {
                me.closeView();
                SHF.refreshSearchPanel();
            }
        );
    },

    onClickDelete: function () {
        var me = this,
            id = this.getViewModel().get('id');
        ABox.confirm(T.__('Are you sure you want to delete the widget?'), function () {
            Glb.Ajax({
                url: Cake.api.path + '/SearchPage/json/deleteWidget',
                params: {
                    id: id
                },
                success: function (response, options) {
                    ABox.success(T.__("The widget has been deleted!"), function () {
                        me.closeView();
                        SHF.refreshSearchPanel();
                    });
                }
            });
        })
    }
});