/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.worknotes.ListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.worknoteslist',

    stores: {
        worknoteslist: {
            type: 'worknoteslist',
            autoLoad: true
        }
    }
});