/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define('WWS.view.worknotes.release.GridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.worknotesreleasegrid',

    data: {
        worknoteId: 0
    },

    stores: {
        releases: {
            type: 'worknotesrelease',
            autoLoad: true,
            proxy: {
                extraParams: {
                    worknoteId: '{worknoteId}'
                }
            }
        }
    }
});