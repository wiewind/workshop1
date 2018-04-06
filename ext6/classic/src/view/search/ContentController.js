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
    }
});