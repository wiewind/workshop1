/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.view.search.ContentViewModel', {
    extend: 'WWS.ux.MusterFormViewModel',

    alias: 'viewmodel.searchcontent',

    data: {
        id: 0,
        title: '',
        text: '',
        modified: '',
        sort: 0,
        publish: false
    },

    formulas: {
        showModified: function (get) {
            return T.__('Modified') + ': ' + Glb.Date.displayDateFromString(get('modified'));
        }
    }
});