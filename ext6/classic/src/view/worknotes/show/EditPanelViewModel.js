/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define('WWS.view.worknotes.show.EditPanelViewModel', {
    extend: 'WWS.ux.MusterFormViewModel',

    alias: 'viewmodel.worknotesshoweditpanel',

    data: {
        id: 0,
        date: 0
    },

    formulas: {
        displayDate: function (get) {
            var date = get('date');
            if (!date) date = new Date();
            return date;
        },

        hiddenSaveButton: function (get) {
            return get('id') == 0
        }
    }
});