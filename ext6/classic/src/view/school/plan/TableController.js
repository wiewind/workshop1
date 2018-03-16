/**
 * Created by benying.zou on 14.03.2018.
 */
Ext.define('WWS.view.school.plan.TableController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolplantable',

    afterRender: function () {
        this.drawPanel();
    },

    drawPanel: function () {


        var me = this,
            planCt = this.getView().down('[itemId="planCt"]'),
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

                planCt.removeAll();

                me.drawScale(planCt);
                me.drawCourses(plans, planCt);
            }
        });
    },

    drawScale: function (planCt) {
        var ct = {
                xtype: 'panel',
                layout: 'vbox',
                bind: {
                    width: '{scaleWidth}'
                },
                itemId: 'scaleCt',
                padding: '0 10',
                minHeight: 300,
                style: {
                    borderRight: '1px solid #ccc'
                },
                defaults: {
                    xtype: 'component',
                    width: '100%',
                    height: SCF.scaleOneMinute * 30
                },
                items: []
            },
            vm = this.getViewModel(),
            startScale = vm.get('startTimeScale'),
            endScale = vm.get('endTimeScale');
        for (var i = startScale; i < endScale; i++) {
            var h = Wiewind.Number.displayIntZerofill(i, 2);
            ct.items.push(
                {
                    html: '<b>' + h + ':00</b>'
                },
                {
                    html: h + ':30'
                }
            );
        }
        ct.items.push(
            {
                html: '<b>' + endScale + ':00</b>',
                height: 20
            }
        );
        planCt.add(ct);
    },

    drawCourses: function (plans, planCt) {
        var vm = this.getViewModel(),
            startTime = Wiewind.Number.displayIntZerofill(vm.get('startTimeScale'), 2)+':00',
            endTime = Wiewind.Number.displayIntZerofill(vm.get('endTimeScale'), 2)+':00',
            now = new Date(),
            weekdayOfToday = now.getDay();

        for (var i=1; i<=5; i++) {
            var beginn = startTime,
                bgColor = (i == weekdayOfToday) ? vm.get('dayBgColor') : vm.get('defaultBgColor'),
                ct = {
                    xtype: 'panel',
                    layout: 'vbox',
                    itemId: 'planCt_' + i,
                    padding: '10 0 10 0',
                    style: {
                        borderRight: '1px solid #ccc',
                        backgroundColor: bgColor
                    },
                    bodyStyle: {
                        backgroundColor: bgColor
                    },
                    flex: 1,
                    defaults: {
                        width: '100%'
                    },
                    items: []
                };

            if (plans[i]) {
                plans[i].forEach(function (p) {
                    var start = p['SchoolPlan']['start'],
                        end = p['SchoolPlan']['end'];
                    if (beginn < start) {
                        ct.items.push({
                            xtype: 'schoolplantablecell',
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
                        xtype: 'schoolplantablecell',
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
                    xtype: 'schoolplantablecell',
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
    },

    onClickNew: function () {
        SCF.openEditPlanWindow(0);
    },

    onClickRefresh: function () {
        this.drawPanel();
    },

    onClickCourse: function () {
        SCF.openCourseGridWindow();
    },

    onClickTeacher: function () {
        SCF.openTeacherGridWindow();
    },

    onClickRoom: function () {
        SCF.openRoomGridWindow();
    }
});