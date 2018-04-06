/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.view.search.EditContentController', {
    extend: 'WWS.view.search.BaseContentController',

    alias: 'controller.searcheditcontent',

    requires: [
        'WWS.view.search.BaseContentController'
    ],

    afterLoad: function () {
        var view = this.getView();
        view.buildCkeditor();
    },

    submitSuccess: function (form, action) {
        var res = Ext.decode(action.response.responseText).data;
        ABox.success(
            T.__('Successfully saved'),
            function () {
                SHF.showContent(res.id, true);
                SHF.refreshMenu();
            }
        );
    },

    onCancel: function () {
        var id = Number(this.getViewModel().get('id'));
        if (id === 0) {
            id = SHF.getErstContentId();
        }
        SHF.showContent(id, true);
    },

    onClickDelete: function () {
        var id = this.getViewModel().get('id');
        ABox.confirm(T.__('Are you sure you want to delete the Page?'), function () {
            Glb.Ajax({
                url: Cake.api.path + '/SearchPage/json/deletePage',
                params: {
                    id: id
                },
                success: function (response, options) {
                    ABox.success(T.__("The page has been deleted!"), function () {
                        SHF.refreshMenu(true);
                    });
                }
            });
        })
    }
});