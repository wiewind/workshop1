/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.class.GridWindow', {
    extend: 'Ext.window.Window',
    xtype: 'schoolclassgridwindow',

    requires: [
        'WWS.view.school.class.GridWindowController',
        'WWS.view.school.class.GridWindowViewModel'
    ],
    controller: 'schoolclassgridwindow',
    viewModel: {
        type: 'schoolclassgridwindow'
    },

    config: {
        title: T.__('List of Classes'),
        iconCls: 'x-fa fa-slideshare',
        autoShow: true,
        layout: 'fit',
        width: 800,
        height: 500,
        modal: true
    },

    items: [
        {
            xtype: 'grid',
            border: 0,
            forceFit: true,
            scrollable: true,
            multiSelect: false,
            bind: {
                store: '{classStore}'
            },
            emptyText: T.__("Empty"),
            columns: [
                {
                    xtype:'actioncolumn',
                    dataIndex: 'is_default',
                    width:30,
                    items: [
                        {
                            getClass: function (v) {
                                if (v) {
                                    return 'x-fa fa-check-square-o';
                                } else {
                                    return 'x-fa fa-square-o';
                                }
                            },
                            getTip: function(v) {
                                if (!v) {
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
                    dataIndex: 'name',
                    renderer: function(v, meta, rec){
                        var desp = rec.get('description');
                        if (desp) {
                            meta.tdAttr = 'data-qtip="' + desp.replace(/"/g, '&quot;') + '"';
                        }
                        if (rec.get('is_default')) {
                            return '<span style="font-weight: bold; color: #2d5476;">' + v + '</span>';
                        }
                        return v;
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
    ],

    callbackFn: function (data) {}
});