/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define ('WWS.view.school.SchoolPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'schoolpanel',

    requires: [
        'WWS.view.school.Functions',

        'WWS.view.school.plan.Table',
        'WWS.view.school.plan.TableCell',
        'WWS.view.school.plan.EditWindow',

        'WWS.view.school.child.Grid',
        'WWS.view.school.child.EditWindow',

        'WWS.view.school.class.GridWindow',
        'WWS.view.school.class.EditWindow',

        'WWS.view.school.semester.GridWindow',
        'WWS.view.school.semester.EditWindow',

        'WWS.view.school.course.GridWindow',
        'WWS.view.school.course.EditWindow',

        'WWS.view.school.room.GridWindow',
        'WWS.view.school.room.EditWindow',

        'WWS.view.school.teacher.GridWindow',
        'WWS.view.school.teacher.EditWindow',

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
        closable: true
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
                    tooltip: T.__('Select'),
                    handler: 'onClickSelectClass'
                }
            }
        },
        T.__("Semester") + ':',
        {
            xtype: 'textfield',
            name: 'semester_name',
            emptyText : T.__("Unknown"),
            editable: false,
            margin: '0 10 0 0',
            bind: {
                value: '{displaySemesterName}'
            },
            triggers: {
                select: {
                    cls: 'x-form-trigger',
                    tooltip: T.__('Select'),
                    handler: 'onClickSelectSemester'
                }
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

    // initComponent: function () {
    //     this.items = this.buildItems();
    //     this.callParent();
    // },

    buildItems: function () {
        var vm = this.getViewModel();
        return [
            {
                xtype: 'schoolplantable',
                viewModel: {
                    parent: vm
                }
            },
            {
                xtype: 'schoolchildgrid',
                viewModel: {
                    parent: vm
                }
            }
        ];
    }
});