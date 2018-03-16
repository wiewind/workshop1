/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.semester.EditWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'schoolsemestereditwindow',

    requires: [
        'WWS.view.school.semester.EditWindowController',
        'WWS.view.school.semester.EditWindowViewModel'
    ],
    controller: 'schoolsemestereditwindow',
    viewModel: {
        type: 'schoolsemestereditwindow'
    },

    input: {
        url: Cake.api.path + '/school/json/saveSemester'
    },

    config: {
        title: T.__("Semester"),
        iconCls: 'x-fa fa-diamond',
        width: 400
    },

    configForm: function () {
        return {
            defaults: {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                padding: 5,
                defaults: {
                    labelWidth: 70
                }
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
                items: [
                    {
                        xtype: 'combo',
                        name: 'semester',
                        fieldLabel: T.__("Name"),
                        emptyText: T.__("Semester"),
                        store: {
                            data: [
                                {value: 1, name: T.__("Winter Term")},
                                {value: 2, name: T.__("Summer Term")}
                            ]
                        },
                        queryMode: 'local',
                        valueField: 'value',
                        displayField: 'name',
                        editable: false,
                        forceSelection: true,
                        allowBlank: false,
                        bind: {
                            value: '{semester}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'school_year',
                        emptyText: T.__("School Year"),
                        allowBlank: false,
                        flex: 1,
                        bind: {
                            value: '{school_year}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter',
                            afterrender: 'fieldFocus'
                        }
                    }
                ]
            },
            {
                items: [
                    {
                        xtype: 'datefield',
                        name: 'start',
                        fieldLabel: T.__("Start"),
                        emptyText: T.__("Start"),
                        format: SSD.data.formatting.date_format,
                        submitFormat: 'Y-m-d',
                        flex: 1,
                        allowBlank: false,
                        bind: {
                            value: '{start}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    }
                ]
            },
            {
                items: [
                    {
                        xtype: 'datefield',
                        name: 'end',
                        fieldLabel: T.__("End"),
                        emptyText: T.__("End"),
                        format: SSD.data.formatting.date_format,
                        submitFormat: 'Y-m-d',
                        flex: 1,
                        allowBlank: false,
                        bind: {
                            value: '{end}'
                        },
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    }
                ]
            }
        ];
    },

    callbackFn: function (data) {}
});
