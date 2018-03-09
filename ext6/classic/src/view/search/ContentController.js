/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.view.search.ContentController', {
    extend: 'WWS.view.search.BaseContentController',

    alias: 'controller.searchcontent',

    requires: [
        'WWS.view.search.BaseContentController'
    ],

    onClickEdit: function () {
        SHF.showEditContent(this.getViewModel().get('id'));
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