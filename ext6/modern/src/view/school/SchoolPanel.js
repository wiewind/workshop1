/**
 * Created by benying.zou on 19.03.2018.
 */
Ext.define('WWS.view.school.SchoolPanel', {
    extend: 'Ext.Container',
    xtype: 'schoolpanel',

    requires: [
        'WWS.view.school.Functions',
        'WWS.view.school.Plans',
        'WWS.view.school.Cell',

        'WWS.view.school.SchoolPanelController',
        'WWS.view.school.SchoolPanelViewModel'
    ],
    controller: 'schoolpanel',
    viewModel: {
        type: 'schoolpanel'
    },

    config: {
        layout: 'vbox',
        scrollable: true,
        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                title: T.__m('school')
                // items: [
                //     '->',
                //     {
                //         iconCls: 'x-fa fa-search',
                //         cls: 'toolbar-button',
                //         handler: 'onClickSearch'
                //     }
                // ]
            }
        ]

    }
});