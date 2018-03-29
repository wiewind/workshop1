/**
 * Created by benying.zou on 28.03.2018.
 */
Ext.define('WWS.view.jobapplications.JobapplicationsPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.jobapplicationspanel',

    data: {
        mailsetting: {}
    },

    stores: {
        allStatusStore: {
            type: 'joballstatusstore',
            autoLoad: true
        },

        allAttachmentsStore: {
            type: 'joballattachmentsstore',
            autoLoad: true
        }
    }
});