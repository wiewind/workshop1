/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define ('WWS.view.school.plan.Table', {
    extend: 'Ext.panel.Panel',
    xtype: 'schoolplantable',

    requires: [
        'WWS.view.school.plan.TableController',
        'WWS.view.school.plan.TableViewModel'
    ],
    controller: 'schoolplantable',
    viewModel: {
        type: 'schoolplantable'
    },

    config: {
        title: T.__("Time Plan"),
        iconCls: 'x-fa fa-clock-o',
        layout: 'border',
        border: 1,
        closable: false
    },

    tbar: [
        {
            text: Glb.btnSetting.newText,
            tooltip: Glb.btnSetting.newText,
            iconCls: Glb.btnSetting.newIconCls,
            handler: 'onClickNew'
        },
        '-',
        {
            text: T.__('Clear'),
            tooltip: T.__('Clear the table'),
            iconCls: 'x-fa fa-remove',
            handler: 'onClickDeleteAll'
        },
        {
            text: T.__('Copy plan to...'),
            tooltip: T.__('Copy plan to...'),
            iconCls: 'x-fa fa-copy',
            handler: 'onClickCopy'
        },
        '-',
        {
            text: Glb.btnSetting.refreshText,
            tooltip: Glb.btnSetting.refreshText,
            iconCls: Glb.btnSetting.refreshIconCls,
            handler: 'onClickRefresh'
        },
        '->',
        {
            text: T.__("Resource"),
            iconCls: 'x-fa fa-bars',
            menu: [
                {
                    text: T.__("Courses"),
                    iconCls: 'x-fa fa-graduation-cap',
                    handler: 'onClickCourse'
                },
                {
                    text: T.__("Teachers"),
                    iconCls: 'x-fa fa-user-secret',
                    handler: 'onClickTeacher'
                },
                {
                    text: T.__("Rooms"),
                    iconCls: 'x-fa fa-institution',
                    handler: 'onClickRoom'
                }
            ]
        }
    ],

    initComponent: function () {
        var weekdayPanels=[
                {
                    title: '&nbsp;<br />&nbsp;',
                    bind: {
                        width: '{scaleWidth}'
                    }
                }
            ];

        var now = new Date(Ext.Date.format(new Date(), 'Y-m-d')),
            curWeekday = now.getDay(),
            timestampOfDay = 1000*60*60*24,
            lastSundayDate = new Date(+(now) - curWeekday * timestampOfDay);
        for (var d=1; d<6; d++) {
            var cellDate = Glb.Date.displayDateFromTimestamp(new Date(+lastSundayDate + d * timestampOfDay));
            weekdayPanels.push({
                title: '<div style="width: 100%; text-align: center;">' + Glb.weekdays[d-1] + '<br />' + cellDate + '</div>',
                flex: 1
            });
        }

        Ext.apply(this, {
            items: [
                {
                    xtype: 'container',
                    region: 'north',
                    itemId: 'title',
                    layout: 'hbox',
                    scrollable: false,
                    items: weekdayPanels
                },
                {
                    xtype: 'container',
                    region: 'center',
                    layout: 'hbox',
                    scrollable: true,
                    itemId: 'planCt'
                }
            ]
        });

        this.callParent();
    }
});