/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWW.view.school.child.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'schoolchildgrid',

    requires: [
        'WWS.view.school.child.GridController',
        'WWS.view.school.child.GridViewModel'
    ],
    controller: 'schoolchildgrid',
    viewModel: {
        type: 'schoolchildgrid'
    },

    bind: '{childrenStore}',

    config: {
        icon: Cake.image.path + '/customer.png',
        title: T.__("List of Children"),
        forceFit: true,
        border: 0,
        scrollable: true,
        multiSelect: false
    },

    columns: [
        {
            width: 30,
            dataIndex: 'sex',
            renderer: function(v) {
                var icon = (v === 'f') ? 'girl.png' : 'boy.png';
                var title = (v === 'f') ? T.__("Girl") : T.__("Boy");
                return '<img src="' + Cake.image.path+'/' + icon + '" title="' + title + '" />';
            }
        },
        {
            text: T.__("Lastname"),
            flex: 1,
            dataIndex: 'lastname'
        },
        {
            text: T.__("Firstname"),
            flex: 1,
            dataIndex: 'firstname'
        },
        {
            text: T.__("Birthday"),
            flex: 1,
            dataIndex: 'birthday',
            renderer: function (v) {
                return Glb.Date.displayDateFromString(v);
            }
        },
        {
            text: T.__("Address"),
            flex: 1,
            dataIndex: 'addresses',
            renderer: function(v) {
                var data = Ext.decode(v);
                var res = '';
                Ext.each(data, function (d) {
                    res += '<div>';
                    if (!Ext.isEmpty(d['type'])) {
                        res += d['type'] + ': ';
                    }
                    res += d['address'] + '</div>'
                });

                return res;
            }
        },
        {
            text: T.__("Telephone"),
            flex: 1,
            dataIndex: 'telephones',
            renderer: function(v) {
                var data = Ext.decode(v);
                var res = '';
                Ext.each(data, function (d) {
                    res += '<div>';
                    if (!Ext.isEmpty(d['type'])) {
                        res += d['type'] + ': ';
                    }
                    res += d['number'] + '</div>'
                });

                return res;
            }
        },
        {
            text: T.__("Handy"),
            flex: 1,
            dataIndex: 'mobiles',
            renderer: function(v) {
                var data = Ext.decode(v);
                var res = '';
                Ext.each(data, function (d) {
                    res += '<div>';
                    if (!Ext.isEmpty(d['type'])) {
                        res += d['type'] + ': ';
                    }
                    res += d['number'] + '</div>'
                });

                return res;
            }
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("Empty")
    },

    tbar: [
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

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});