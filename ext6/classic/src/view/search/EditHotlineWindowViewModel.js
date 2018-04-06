/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.view.search.EditHotlineWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.searchedithotlinewindow',

    data: {
        id: 0
    },

    formulas: {
        showTitle: function (get) {
            return get('id') > 0 ? T.__('Edit Widget') : T.__('Add a new widget');
        }
    }
});