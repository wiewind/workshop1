/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define ('WWW.view.school.Table', {
    extend: 'Ext.panel.Panel',
    xtype: 'schooltable',

    config: {
        title: T.__("Home"),
        iconCls: 'x-fa fa-home',
        layout: 'border',
        width: '100%',
        border: 0,
        closable: false,
        defaults: {
            defaults: {
                border: 0,
                defaults: {
                    margin: 1,
                    bodyPadding: 5,
                    layout: 'vbox',
                    width: '100%',
                    autoScroll: true
                }
            }
        }
    },
    tbar: [
        {
            text: T.__("Resource"),
            icon: Cake.image.path + '/dbmanager.png',
            menu: [
                {
                    text: T.__("Coursetimes"),
                    icon: Cake.image.path + '/clock.png',
                    handler: 'onClickCoursetime'
                },
                {
                    text: T.__("Courses"),
                    icon: Cake.image.path + '/study.png',
                    handler: 'onClickCourse'
                },
                {
                    text: T.__("Teachers"),
                    icon: Cake.image.path + '/teacher.png',
                    handler: 'onClickTeacher'
                },
                {
                    text: T.__("Rooms"),
                    icon: Cake.image.path + '/location.png',
                    handler: 'onClickRoom'
                }
            ]
        },
        '-',
        {
            text: Glb.btnSetting.refreshText,
            iconCls: Glb.btnSetting.refreshIconCls,
            handler: 'onClickRefresh'
        }
    ],

    initComponent: function () {
        var me = this,
            weekdayPanels=[
                {
                    title: '&nbsp;<br />&nbsp;',
                    width: 120
                }
            ];

        var now = new Date(Ext.Date.format(new Date(), 'Y-m-d')),
            curWeekday = now.getDay(),
            timestampOfDay = 1000*60*60*24,
            lastSundayDate = new Date(+(now) - curWeekday * timestampOfDay);
        for (var d=1; d<6; d++) {
            var cellDate = Ext.Date.format(new Date(+lastSundayDate + d * timestampOfDay), APP.formatting['date_format']);
            weekdayPanels.push({
                title: '<div style="width: 100%; text-align: center;">' + SCF.config.weekdays[d-1] + '<br />' + cellDate + '</div>',
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
                    items: weekdayPanels
                },
                {
                    xtype: 'container',
                    region: 'center',
                    itemId: 'plans',
                    layout: 'hbox',
                    autoScroll: true
                }
            ]
        });

        me.callParent();
    },

    loadPlans: function () {
        var me = this,
            container = me.down('container[itemId="plans"]');
        APP.AjaxRequest({
            method: 'POST',
            url: 'School/getPlans',
            params: {
                class_id: SchoolConfig.class.id,
                semester_id: SchoolConfig.semester.id
            },
            success: function(response, options) {
                var rp = Ext.decode(response.responseText).data;
                courseTimes = rp.courseTimes;

                var items = [];
                for (var d=0; d<6; d++) {
                    var col = [];

                    for (var t in courseTimes) {
                        var ct = courseTimes[t].SchoolCoursetime,
                            time = ct.start.replace(':00', '') + ' - ' + ct.end.replace(':00', '');
                        if (d > 0) {
                            var course = [];
                            if (rp.courses.hasOwnProperty(d)) {
                                if (rp.courses[d].hasOwnProperty(ct.id)) {
                                    course = rp.courses[d][ct.id];
                                }
                            }
                            col.push({
                                xtype: 'schoolTableCellPanel',
                                data: {
                                    weekday: d,
                                    coursetime: ct,
                                    course: course
                                }
                            });
                        } else {
                            col.push({
                                height: SchoolConfig.cellHeight,
                                layout: 'fit',
                                html: time,
                                bodyPadding: '40 0 0 0',
                                bodyStyle: {
                                    'text-align': 'center',
                                    'font-weight': 'bold',
                                    'background-color': 'transparent'
                                }
                            });
                        }
                    }

                    var colP = {
                        padding: 1,
                        border: 0,
                        items: col
                    };
                    if (d > 0) {
                        colP.flex = 1;
                    } else {
                        colP.width = 120;
                    }

                    items.push(colP);
                }

                container.add(items);
            }
        });
    }
});