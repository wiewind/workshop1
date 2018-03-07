/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.NaviPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementnavipanel',

    stores: {
        treeStore: {
            type: 'filemanagementtreestore',
            autoLoad: true
        }
    }
});