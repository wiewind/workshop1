/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define ('WWS.view.school.SchoolPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'schoolpanel',

    requires: [
        'WWS.view.school.Functions',
        'WWW.view.school.Table',
        'WWW.view.school.child.Grid',

        'WWS.view.school.class.EditWindow',
        'WWS.view.school.class.GridWindow',

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
        margin: '1 0 0 0',
        closable: true,
        // tabBarHeaderPosition: 0
    },

    tbar: [
        T.__("Class") + ':',
        {
            xtype: 'textfield',
            name: 'class_name',
            emptyText : T.__("Unknown"),
            editable: false,
            margin: '0 50 0 0',
            bind: {
                value: '{class.name}'
            },
            triggers: {
                select: {
                    cls: 'x-form-trigger',
                    tooltip: Glb.btnSetting.searchText,
                    handler: 'onClickSelectClass'
                }
            }
        },
        T.__("Semester") + ':',
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
            margin: '0 10 0 0',
            listeners: {
                select: 'onSelectSemester'
            }
        },
        {
            xtype: 'component',
            name: 'semester_date',
            bind: {
                html: '{displaySemesterDate}'
            }
        }
    ],

    initComponent: function () {
        var vm = this.getViewModel();
        this.items = [
            // {
            //     xtype: 'schooltable',
            //     viewModel: {
            //         parent: vm
            //     }
            // },
            {
                xtype: 'schoolchildgrid',
                viewModel: {
                    parent: vm
                }
            }
        ];
        this.callParent();
    }
});