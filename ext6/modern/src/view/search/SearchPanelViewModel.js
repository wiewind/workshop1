/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.view.search.SearchPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.searchpanel',

    data: {
        id: 1
    },

    formulas: {
        showModified: function (get) {
            return T.__('Modified') + ': ' + Glb.Date.displayDateFromString(get('modified'));
        }
    }
});