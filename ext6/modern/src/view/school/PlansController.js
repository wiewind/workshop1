/**
 * Created by benying.zou on 19.03.2018.
 */
Ext.define('WWS.view.school.PlansController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolplans',

    init: function () {
        this.drawPanel();
    },

    drawPanel: function () {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            class_id = vm.get('class.id'),
            semester_id = vm.get('semester.id');
        Glb.Ajax({
            url: Cake.api.path + '/school/json/getPlans',
            params: {
                class_id: class_id,
                semester_id: semester_id
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText).data,
                    plans = {},
                    startTimeScale = vm.get('startTimeScale'),
                    endTimeScale = vm.get('endTimeScale');

                data.forEach(function (item) {
                    var start = parseInt(item.SchoolPlan.start),
                        endArr = item.SchoolPlan.start.split(':'),
                        endH = parseInt(endArr[0]),
                        endM = parseInt(endArr[1]);
                    if (startTimeScale > start) {
                        startTimeScale = start;
                    }
                    if (endTimeScale <= endH) {
                        endTimeScale = (endM > 0) ? (endH + 1) : endH;
                    }

                    var weekday = item.SchoolPlan.weekday;
                    if (Wiewind.isEmpty(plans[weekday])) {
                        plans[weekday] = [];
                    }
                    plans[weekday].push(item);
                });

                vm.setData({
                    startTimeScale: startTimeScale,
                    endTimeScale: endTimeScale
                });

                view.removeAll();
                me.drawCourses(plans, view);
            }
        });
    },

    drawCourses: function (plans, planCt) {
        var vm = this.getViewModel(),
            startTime = Wiewind.Number.displayIntZerofill(vm.get('startTimeScale'), 2)+':00',
            endTime = Wiewind.Number.displayIntZerofill(vm.get('endTimeScale'), 2)+':00',
            now = new Date(),
            weekdayOfToday = now.getDay(),
            timestampOfDay = 1000*60*60*24,
            lastSundayDate = new Date(+(now) - weekdayOfToday * timestampOfDay);

        for (var i=1; i<=5; i++) {
            var beginn = startTime,
                bgColor = (i == weekdayOfToday) ? vm.get('dayBgColor') : vm.get('defaultBgColor'),
                cellDate = Glb.Date.displayDateFromTimestamp(new Date(+lastSundayDate + i * timestampOfDay), '', true),
                ct = {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: {
                        backgroundColor: bgColor
                    },
                    flex: 1,
                    defaults: {
                        header: false,
                        bodyPadding: 10,
                        width: '100%'
                    },
                    items: [{
                        xtype: 'panel',
                        bodyStyle: {
                            'text-align': 'center',
                            backgroundColor: '#4E88BB',
                            color: 'white'
                        },
                        html: Glb.weekdays[i-1] + '<br />' + cellDate,
                        bind: {
                            height: '{scaleHeight}'
                        }
                    }]
                };

            if (plans[i]) {
                plans[i].forEach(function (p) {
                    var start = p['SchoolPlan']['start'],
                        end = p['SchoolPlan']['end'];
                    if (beginn < start) {
                        ct.items.push({
                            xtype: 'schoolcell',
                            viewModel: {
                                parent: vm,
                                data: {
                                    start: beginn,
                                    end: start,
                                    weekday: i
                                }
                            }
                        });
                    }

                    var cellData = Ext.apply(p, p['SchoolPlan']);
                    delete cellData.SchoolPlan;
                    ct.items.push({
                        xtype: 'schoolcell',
                        viewModel: {
                            parent: vm,
                            data: cellData
                        }
                    });
                    beginn = end;
                });
            }

            if (beginn < endTime) {
                ct.items.push({
                    xtype: 'schoolcell',
                    viewModel: {
                        parent: vm,
                        data: {
                            start: beginn,
                            end: endTime,
                            weekday: i
                        }
                    }
                });
            }

            planCt.add(ct);
        }
    }
});