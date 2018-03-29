/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define('WWS.view.jobapplications.edit.PanelViewModel', {
    extend: 'WWS.ux.MusterFormViewModel',
    alias: 'viewmodel.jobapplicationseditpanel',

    data: {
        id: 0,
        jobname: ''
    },

    formulas: {
        showTitle: function (get) {
            if (get('id') > 0) {
                return get('jobname');
            }
            return T.__('New Job')
        }
    }
});