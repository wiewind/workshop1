/**
 * Created by benying.zou on 15.03.2018.
 */
Ext.define ('WWS.view.school.plan.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolplaneditwindow',

    requires: [
        'WWS.view.school.plan.EditWindowController',
        'WWS.view.school.plan.EditWindowViewModel'
    ],
    controller: 'schoolplaneditwindow',
    viewModel: {
        type: 'schoolplaneditwindow'
    },

    setting: {
        url: Cake.api.path + '/school/json/savePlan'
    },

    config: {
        bind: {
            title: '{displayTitle}'
        },
        iconCls: 'x-fa fa-clock-o',
        width: 500
    },

    configForm: function () {
        return {
            defaults: {
                width: '100%',
                labelWidth: 70
            }
        };
    },

    buildFormItems: function () {
        var weekdays = [];
        for (var i=0; i<Glb.weekdays.length; i++) {
            weekdays.push({
                value: i+1,
                name: Glb.weekdays[i]
            });
        }
        return [
            {
                xtype: 'hiddenfield',
                name: 'id',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'class_id',
                bind: {
                    value: '{class.id}'
                }
            },
            {
                xtype: 'displayfield',
                fieldLabel : T.__("Class"),
                height: 20,
                bind: {
                    value: '{class.name}'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'semester_id',
                bind: {
                    value: '{semester.id}'
                }
            },
            {
                xtype: 'displayfield',
                fieldLabel : T.__("Semester"),
                height: 30,
                bind: {
                    value: '{displaySemesterName}'
                }
            },
            {
                xtype: 'component',
                height: 20,
                html: '<hr />'
            },
            {
                xtype: 'textfield',
                name: 'course_name',
                fieldLabel : T.__("Course"),
                emptyText: T.__("Unknown"),
                editable: false,
                submitValue: false,
                allowBlank: false,
                bind: {
                    value: '{SchoolCourse.name}'
                },
                triggers: {
                    cancel: {
                        cls: 'x-form-clear-trigger',
                        tooltip: Glb.btnSetting.cancelText,
                        handler: 'onClickCancelCourse'
                    },
                    select: {
                        cls: 'x-form-trigger',
                        tooltip: T.__('Select'),
                        handler: 'onClickSelectCourse'
                    }
                },
                listeners: {
                    afterrender: 'checkCancelTrigger',
                    change: 'checkCancelTrigger'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'course_id',
                bind: {
                    value: '{SchoolCourse.id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'teacher_name',
                fieldLabel : T.__("Teacher"),
                emptyText: T.__("Unknown"),
                editable: false,
                submitValue: false,
                bind: {
                    value: '{displayTeacherName}'
                },
                triggers: {
                    cancel: {
                        cls: 'x-form-clear-trigger',
                        tooltip: Glb.btnSetting.cancelText,
                        handler: 'onClickCancelTeacher'
                    },
                    select: {
                        cls: 'x-form-trigger',
                        tooltip: T.__('Select'),
                        handler: 'onClickSelectTeacher'
                    }
                },
                listeners: {
                    afterrender: 'checkCancelTrigger',
                    change: 'checkCancelTrigger'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'teacher_id',
                bind: {
                    value: '{SchoolTeacher.id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'room_name',
                fieldLabel : T.__("Room"),
                emptyText: T.__("Unknown"),
                editable: false,
                submitValue: false,
                bind: {
                    value: '{SchoolRoom.name}'
                },
                triggers: {
                    cancel: {
                        cls: 'x-form-clear-trigger',
                        tooltip: Glb.btnSetting.cancelText,
                        handler: 'onClickCancelRoom'
                    },
                    select: {
                        cls: 'x-form-trigger',
                        tooltip: T.__('Select'),
                        handler: 'onClickSelectRoom'
                    }
                },
                listeners: {
                    afterrender: 'checkCancelTrigger',
                    change: 'checkCancelTrigger'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'room_id',
                bind: {
                    value: '{SchoolRoom.id}'
                }
            },
            {
                xtype: 'component',
                height: 20,
                html: '<hr />'
            },
            {
                xtype: 'combo',
                name: 'weekday',
                fieldLabel: T.__("Weekday"),
                emptyText:  T.__("Please select..."),
                store: {
                    data: weekdays
                },
                queryMode: 'local',
                valueField: 'value',
                displayField: 'name',
                editable: false,
                forceSelection: true,
                allowBlank: false,
                bind: {
                    value: '{weekday}'
                }
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'timenumberfield',
                        dataType: 'hour',
                        name: 'start_hour',
                        fieldLabel: T.__("Start"),
                        labelWidth: 70,
                        allowBlank: false,
                        width: 260,
                        bind: {
                            value: '{displayStartHour}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        padding: '0 10',
                        fieldLabel: ' ',
                        width: 5

                    },
                    {
                        xtype: 'timenumberfield',
                        name: 'start_minute',
                        dataType: 'minute',
                        allowBlank: false,
                        flex: 1,
                        bind: {
                            value: '{displayStartMinute}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'timenumberfield',
                        name: 'end_hour',
                        dataType: 'hour',
                        fieldLabel: T.__("End"),
                        labelWidth: 70,
                        allowBlank: false,
                        width: 260,
                        bind: {
                            value: '{displayEndHour}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        padding: '0 10',
                        fieldLabel: ' ',
                        width: 5

                    },
                    {
                        xtype: 'timenumberfield',
                        name: 'end_minute',
                        dataType: 'minute',
                        allowBlank: false,
                        flex: 1,
                        bind: {
                            value: '{displayEndMinute}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    }
                ]
            },
            {
                xtype: 'combo',
                name: 'period',
                fieldLabel: T.__("Period"),
                emptyText:  T.__("Please select..."),
                store: {
                    data: Glb.coursePeriods
                },
                queryMode: 'local',
                valueField: 'value',
                displayField: 'name',
                editable: false,
                forceSelection: true,
                allowBlank: false,
                bind: {
                    value: '{period}'
                }
            },
            {
                xtype: 'cleardate',
                name: 'first_date',
                fieldLabel: T.__("First Date"),
                emptyText:  T.__("First Date"),
                format: SSD.data.formatting.date_format,
                submitFormat: 'Y-m-d',
                editable: false,
                bind: {
                    value: '{first_date}',
                    disabled: '{disabledFirstDate}'
                }
            },
            {
                xtype: 'component',
                height: 20,
                html: '<hr />'
            },
            {
                xtype: 'textarea',
                name: 'description',
                fieldLabel: T.__("Description"),
                emptyText: T.__("Description"),
                height: 100,
                bind: {
                    value: '{description}'
                }
            }
        ];
    },

    callbackFn: function (data) {}
});