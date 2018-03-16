/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.room.GridWindow', {
    extend: 'Ext.window.Window',
    xtype: 'schoolroomgridwindow',

    requires: [
        'WWS.view.school.room.GridWindowController',
        'WWS.view.school.room.GridWindowViewModel'
    ],
    controller: 'schoolroomgridwindow',
    viewModel: {
        type: 'schoolroomgridwindow'
    },

    config: {
        title: T.__('List of rooms'),
        iconCls: 'x-fa fa-institution',
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
                        store: '{roomStore}'
                    },
                    emptyText: T.__("Empty"),
                    columns: [
                        {
                            text: T.__("Name"),
                            flex: 1,
                            dataIndex: 'name',
                            renderer: function(v, meta, rec){
                                var desp = rec.get('description');
                                if (desp) {
                                    meta.tdAttr = 'data-qtip="' + desp.replace(/"/g, '&quot;') + '"';
                                }
                                return v;
                            }
                        },
                        {
                            text: T.__("Telephone"),
                            flex: 1,
                            dataIndex: 'telephone'
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
                    iconCls: Glb.btnSetting.deleteIconCls2,
                    itemId: 'deleteBtn',
                    disabled: true,
                    handler: 'onClickDelete'
                },
                '->',
                {
                    xtype: 'searchfield',
                    emptyText: Glb.btnSetting.searchText,
                    width: 300,
                    listeners: {
                        specialkey: 'enterSearch'
                    },
                    onClickCancel: 'onClickCancel',
                    onClickSearch: 'onClickSearch'
                }
            ]
        });

        this.callParent();
    },

    callbackFn: function (data) {}
});