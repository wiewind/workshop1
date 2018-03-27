/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.dbmanager.window.RecordWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.admindbmanagerwindowrecord',

    data: {
        id: 0,
        name: ''
    },

    formulas: {
        getTitle: function (get) {
            return get('id') > 0 ? T.__("Record of %s") : T.__("New Record of %s");
        }
    }
});