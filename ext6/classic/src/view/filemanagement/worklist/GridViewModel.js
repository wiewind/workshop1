/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.filemanagement.worklist.GridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.filemanagementworklistgrid',

    data: {},

    stores: {
        fmWorklist: {
            type: 'filemanagementworklist',
            autoLoad: true
        }
    }
});