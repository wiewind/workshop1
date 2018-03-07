/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.view.filemanagement.window.ShareWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.filemanagementwindowshare',

    data: {},
    stores: {
        limitDays: {
            type: 'filesharelimitdays'
        }
    }
});