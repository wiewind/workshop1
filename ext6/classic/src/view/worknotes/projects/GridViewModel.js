/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define('WWS.view.worknotes.projects.GridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.worknotesprojectsgrid',

    stores: {
        projects: {
            type: 'worknoteprojects',
            autoLoad: true
        }
    }
});