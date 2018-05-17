/**
 * Created by benying.zou on 27.03.2018.
 */
Ext.define ('WWS.view.jobapplications.JobapplicationsPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'jobapplicationspanel',

    requires: [
        'WWS.view.jobapplications.Functions',
        'WWS.view.jobapplications.JobsGrid',
        'WWS.view.jobapplications.mailsetting.Panel',
        'WWS.view.jobapplications.attachment.Grid',
        'WWS.view.jobapplications.attachment.EditWindow',
        'WWS.view.jobapplications.edit.Panel',

        'WWS.view.jobapplications.JobapplicationsPanelController',
        'WWS.view.jobapplications.JobapplicationsPanelViewModel'
    ],
    controller: 'jobapplicationspanel',
    viewModel: {
        type: 'jobapplicationspanel'
    },

    config: {
        title: T.__m("jobapplications"),
        icon: Cake.image.path + '/board/jobapplications16.png',
        padding: '1 0 0 0',
        closable: true
    },

    addToHistory: false,

    items: [],

    listeners: {
        activate: Glb.History.add
    }
});