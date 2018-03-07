/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.worknotes.List', {
    extend: 'WWS.ux.List',
    xtype: 'worknoteslist',

    requires: [
        'WWS.view.worknotes.ListController',
        'WWS.view.worknotes.ListViewModel'
    ],
    controller: 'worknoteslist',
    viewModel: {
        type: 'worknoteslist'
    },

    bind: '{worknoteslist}',

    config: {
        disableSelection: true,
        itemTpl: new Ext.XTemplate(
            '<div>',
                '<div><b>{title}</b></div>',
                '<div class="noticeText">{[this.showDate(values.date)]} - {[this.showProject(values.project)]}</div>',
            '</div>',
            {
                showProject: function (project) {
                    return project ? project : T.__('Unknown');
                },
                showDate: function (date) {
                    return Glb.Date.displayDateFromString(date);
                }
            }
        )
    },

    listeners: {
        itemtap: 'onItemTap'
    }
});