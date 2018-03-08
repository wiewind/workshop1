/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define ('WWS.view.school.SchoolPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'schoolpanel',

    requires: [
        'WWS.view.school.SchoolPanelController',
        'WWS.view.school.SchoolPanelViewModel'
    ],
    controller: 'schoolpanel',
    viewModel: {
        type: 'schoolpanel'
    },

    config: {
        title: T.__("School Timetable"),
        icon: Cake.image.path + '/board/school16.png',
        layout: 'border',
        margin: '1 0 0 0',
        closable: true
    },

    tbar: [
        {
            xtype: 'label',
            text: T.__("Class") + ':',
            margin: '0 20 0 0'
        },
        {
            xtype: 'triggerfield',
            name: 'class_name',
            emptyText : T.__("Unknown"),
            editable: false,
            onTriggerClick: 'onClickClass',
            bind: {
                value: '{class.name}'
            }
        },
        {
            xtype: 'label',
            text: T.__("Semester") + ':',
            margin: '0 20 0 50'
        },
        {
            xtype: 'combobox',
            name: 'semester_id',
            bind: {
                store: '{semesterStore}',
                value: '{semester.id}'
            },
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            triggerAction: 'all',
            emptyText: T.__("Please select a semester"),
            listeners: {
                change: 'onSelectSemester'
            }
        },
        {
            xtype: 'component',
            name: 'semester_date',
            margin: '0 0 0 20',
            bind: {
                html: '{displaySemesterDate}'
            }
        }
    ]
});