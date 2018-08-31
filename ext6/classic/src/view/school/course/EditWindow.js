/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.course.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolcourseeditwindow',

    requires: [
        'WWS.view.school.course.EditWindowController',
        'WWS.view.school.course.EditWindowViewModel'
    ],
    controller: 'schoolcourseeditwindow',
    viewModel: {
        type: 'schoolcourseeditwindow'
    },

    setting: {
        url: Cake.api.path + '/school/json/saveCourse'
    },

    config: {
        title: T.__("Course"),
        iconCls: 'x-fa fa-graduation-cap',
        width: 600
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
        return [
            {
                xtype: 'hiddenfield',
                name: 'id',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: T.__("Name"),
                emptyText: T.__("Name"),
                allowBlank: false,
                bind: {
                    value: '{name}'
                },
                listeners: {
                    specialkey: 'submitOnEnter',
                    afterrender: 'fieldFocus'
                }
            },
            {
                xtype: 'textfield',
                name: 'default_teacher_name',
                fieldLabel : T.__("Teacher (default)"),
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
                name: 'default_teacher_id',
                bind: {
                    value: '{DefaultTeacher.id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'default_room_name',
                fieldLabel : T.__("Room (default)"),
                emptyText: T.__("Unknown"),
                editable: false,
                submitValue: false,
                bind: {
                    value: '{DefaultRoom.name}'
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
                name: 'default_room_id',
                bind: {
                    value: '{DefaultRoom.id}'
                }
            },
            {
                xtype: 'textarea',
                name: 'description',
                fieldLabel: T.__("Description"),
                emptyText: T.__("Description")
            }
        ];
    },

    callbackFn: function (data) {}
});
