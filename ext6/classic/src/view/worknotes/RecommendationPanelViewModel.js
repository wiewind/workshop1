/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define('WWS.view.worknotes.RecommendationPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.worknotesrecommendationpanel',

    stores: {
        newNotes: {
            type: 'worknoteslist',
            autoLoad: false,
            proxy: {
                url: Cake.api.path + '/Worknotes/json/getNewNotes'
            }
        }
    }
});