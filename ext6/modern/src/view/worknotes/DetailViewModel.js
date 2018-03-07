/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.worknotes.DetailViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.worknotesdetail',

    data: {
        id: 0
    },

    formulas: {
        displayDate: function (get) {
            return Glb.Date.displayDateFromString(get('date'));
        },

        displayCreated: function (get) {
            return Glb.Date.displayDateFromString(get('created'), 'H:i:s');
        },

        displayModified: function (get) {
            return Glb.Date.displayDateFromString(get('modified'), 'H:i:s');
        },

        getProjectName: function (get) {
            return get('worknote_project_name') ? get('worknote_project_name') : T.__('Unknown');
        }
    }
});