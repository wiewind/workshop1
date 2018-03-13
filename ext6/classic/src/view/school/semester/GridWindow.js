/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.semester.GridWindow', {
    extend: 'Ext.window.Window',
    xtype: 'schoolsemestergridwindow',

    requires: [
        'WWS.view.school.semester.GridWindowController',
        'WWS.view.school.semester.GridWindowViewModel'
    ],
    controller: 'schoolsemestergridwindow',
    viewModel: {
        type: 'schoolsemestergridwindow'
    },

    config: {
        title: T.__('List of semesters'),
        iconCls: 'x-fa fa-diamond',
        autoShow: true,
        layout: 'fit',
        width: 800,
        height: 500,
        modal: true
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'grid',
                    border: 0,
                    forceFit: true,
                    scrollable: true,
                    multiSelect: false,
                    bind: {
                        store: '{semesterStore}'
                    },
                    columns: [
                        {
                            xtype:'actioncolumn',
                            dataIndex: 'id',
                            width:30,
                            items: [
                                {
                                    getClass: function (v) {
                                        if (Number(v) === Number(me.selectedSemesterId)) {
                                            return 'x-fa fa-check-square-o';
                                        } else {
                                            return 'x-fa fa-square-o';
                                        }
                                    },
                                    getTip: function(v) {
                                        if (Number(v) === Number(me.selectedSemesterId)) {
                                            return T.__("Set Default");
                                        }
                                    },
                                    handler: 'setDefault'
                                }
                            ]
                        },
                        {
                            text: T.__("Name"),
                            flex: 1,
                            dataIndex: 'name'
                        },
                        {
                            text: T.__("Start"),
                            flex: 1,
                            dataIndex: 'start',
                            renderer: function (date) {
                                return Glb.Date.displayDateFromString(date);
                            }
                        },
                        {
                            text: T.__("End"),
                            flex: 1,
                            dataIndex: 'end',
                            renderer: function (date) {
                                return Glb.Date.displayDateFromString(date);
                            }
                        }
                    ],

                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: '{0} - {1} of {2}',
                        emptyMsg: T.__("Empty")
                    },

                    listeners: {
                        select: 'onItemSelect',
                        itemdblclick: 'onItemDblClick'
                    }
                }
            ],

            tbar: [
                {
                    text: T.__("OK"),
                    tooltip: T.__("OK"),
                    iconCls: 'x-fa fa-check',
                    itemId: 'okBtn',
                    disabled: true,
                    bind: {
                        hidden: '{!selectable}'
                    },
                    handler: 'onClickSelect'
                },
                '-',
                {
                    text: Glb.btnSetting.newText,
                    tooltip: Glb.btnSetting.newText,
                    iconCls: Glb.btnSetting.newIconCls,
                    handler: 'onClickNew'
                },
                {
                    text: Glb.btnSetting.editText,
                    tooltip: Glb.btnSetting.editText,
                    iconCls: Glb.btnSetting.editIconCls,
                    itemId: 'editBtn',
                    disabled: true,
                    handler: 'onClickEdit'
                },
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: 'x-fa fa-trash',
                    itemId: 'deleteBtn',
                    disabled: true,
                    handler: 'onClickDelete'
                }
            ]
        });

        this.callParent();
    },

    callback: function (data) {}
});