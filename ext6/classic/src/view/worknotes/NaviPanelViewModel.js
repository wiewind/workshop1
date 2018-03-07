/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define('WWS.view.worknotes.NaviPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.worknotesnavipanel',

    stores: {
        liststore: {
            type: 'worknoteslist',
            autoLoad: true
        }
    }
});