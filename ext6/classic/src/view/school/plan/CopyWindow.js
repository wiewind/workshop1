/**
 * Created by benying.zou on 15.03.2018.
 */
Ext.define ('WWS.view.school.plan.CopyWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolplancopywindow',

    requires: [
        'WWS.view.school.plan.CopyWindowController',
        'WWS.view.school.plan.CopyWindowViewModel'
    ],
    controller: 'schoolplancopywindow',
    viewModel: {
        type: 'schoolplancopywindow'
    },

    input: {
        url: Cake.api.path + '/school/json/copyPlans'
    },

    config: {
        title: T.__('Copy plan to...'),
        iconCls: 'x-fa fa-copy',
        width: 700
    },

    configForm: function () {
        return {
            layout: 'hbox',
            defaults: {
                xtype: 'fieldset',
                layout: 'vbox',
                margin: 5,
                flex: 1,
                height: 150,
                defaults: {
                    width: '100%',
                    labelWidth: 70
                }
            }
        };
    },

    buildFormItems: function () {
        return [
            {
                title: T.__('Source'),
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'from_class_id',
                        bind: {
                            value: '{from_class.id}'
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'from_semester_id',
                        bind: {
                            value: '{from_semester.id}'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel : T.__("Class"),
                        height: 20,
                        bind: {
                            value: '{from_class.name}'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel : T.__("Semester"),
                        height: 30,
                        bind: {
                            value: '{displayFromSemesterName}'
                        }
                    }
                ]
            },
            {
                title: T.__('Target'),
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'to_class_id',
                        bind: {
                            value: '{to_class.id}'
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'to_semester_id',
                        bind: {
                            value: '{to_semester.id}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'class_name',
                        fieldLabel: T.__("Class"),
                        emptyText : T.__("Unknown"),
                        editable: false,
                        submitValue: false,
                        bind: {
                            value: '{to_class.name}'
                        },
                        triggers: {
                            select: {
                                cls: 'x-form-trigger',
                                tooltip: T.__('Select'),
                                handler: 'onClickSelectClass'
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'semester_name',
                        fieldLabel: T.__("Semester"),
                        emptyText : T.__("Unknown"),
                        editable: false,
                        submitValue: false,
                        bind: {
                            value: '{displayToSemesterName}'
                        },
                        triggers: {
                            select: {
                                cls: 'x-form-trigger',
                                tooltip: T.__('Select'),
                                handler: 'onClickSelectSemester'
                            }
                        }
                    }
                ]
            }
        ];
    }
});