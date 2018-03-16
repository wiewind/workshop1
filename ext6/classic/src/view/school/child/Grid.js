/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.child.Grid', {
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
        title: T.__("List of Children"),
        iconCls: 'x-fa fa-child',
        forceFit: true,
        border: 1,
        scrollable: true,
        multiSelect: false
    },
    emptyText: T.__("Empty"),

    columns: [
        {
            width: 100,
            resizable: false,
            dataIndex: 'photo',
            renderer: function(v, meta, rec) {
                var sex = rec.get('sex'),
                    icon = (sex === 'f') ? 'girl.png' : 'boy.png',
                    title = (sex === 'f') ? T.__("Girl") : T.__("Boy");
                if (v) {
                    return '<img src="' + Cake.api.path + '/school/showPhoto/child/'+rec.get('id')+'/80?_v=' + btoa(Date.now()) + '" alt="' + title + '" />'
                }
                return '<img src="' + Cake.image.path+'/' + icon + '" title="' + title + '" alt="' + title + '" />';
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
            text: T.__("Email"),
            flex: 1,
            dataIndex: 'emails',
            renderer: function(v) {
                var data = Ext.decode(v);
                var res = '';
                Ext.each(data, function (d) {
                    res += '<div>';
                    if (!Ext.isEmpty(d['type'])) {
                        res += d['type'] + ': ';
                    }
                    res += d['email'] + '</div>'
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

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});