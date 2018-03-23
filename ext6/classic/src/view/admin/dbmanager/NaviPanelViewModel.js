/**
 * Created by benying.zou on 23.03.2018.
 */
Ext.define('WWS.view.admin.dbmanager.NaviPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.admindbmanagernavipanel',

    stores: {
        tablesStore: {
            type: 'dbtables'
        }
    }
});