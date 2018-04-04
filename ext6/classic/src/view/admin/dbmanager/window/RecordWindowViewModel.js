/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.dbmanager.window.RecordWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.admindbmanagerwindowrecord',

    data: {
        name: '',
        newRocord: true
    },

    formulas: {
        getTitle: function (get) {
            $muster = get('newRocord') ?  T.__("New Record of %s") : T.__("Record of %s");
            return Wiewind.String.sprintf($muster, get('tablename'));
        }
    }
});