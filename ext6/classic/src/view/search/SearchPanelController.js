/**
 * Created by benying.zou on 05.02.2018.
 */
Ext.define('WWS.view.search.SearchPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.searchpanel',

    afterRender: function () {
        var view = this.getView();
        // view.setTitle(SSD.config.modules.search.text);
        Glb.Ajax({
            url: Cake.api.path + '/SearchPage/json/getHotlinks',
            success: function (response, options) {
                var resp = Ext.decode(response.responseText).data;
                view.add(view.buildItems(resp));
            }
        });
    },

    onEditWidget: function (hotId) {
        Ext.create('WWS.view.search.EditHotlineWindow', {
            viewModel: {
                data: {
                    id: hotId
                }
            }
        })
    }
});