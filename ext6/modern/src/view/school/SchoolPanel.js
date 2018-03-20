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

        'WWS.view.school.ChildrenList',
        'WWS.view.school.Settings',

        'WWS.view.school.SchoolPanelController',
        'WWS.view.school.SchoolPanelViewModel'
    ],
    controller: 'schoolpanel',
    viewModel: {
        type: 'schoolpanel'
    },

    config: {
        layout: 'card',
        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                title: T.__m('school'),
                items: [
                    '->',
                    {
                        iconCls: 'x-fa fa-bars',
                        cls: 'toolbar-button',
                        menu: [
                            {
                                text: T.__("Time Plan"),
                                iconCls: 'x-fa fa-clock-o',
                                handler: 'onClickTimePlan'
                            },
                            {
                                text: T.__('List of Children'),
                                iconCls: 'x-fa fa-child',
                                handler: 'onClickChildren'
                            },
                            {
                                text: T.__('Settings'),
                                iconCls: 'x-fa fa-wrench',
                                handler: 'onClickSettings'
                            }
                        ]
                    }
                ]
            }
        ]

    }
});