/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define ('WWS.view.addressbook.PersonGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'addressbookpersongrid',

    requires: [
        'WWS.view.addressbook.PersonGridController',
        'WWS.view.addressbook.PersonGridViewModel'
    ],
    controller: 'addressbookpersongrid',
    viewModel: {
        type: 'addressbookpersongrid'
    },

    bind: '{personstore}',

    config: {
        title: T.__("Person List"),
        iconCls: 'x-fa fa-bars',
        scrollable: true,
        split: true,
        width: 400
    },
    emptyText: T.__("The person list is empty."),

    columns: [
        {
            width: 30,
            dataIndex: 'id',
            renderer: function(v, meta, rec){
                return '<img style="padding: 5px 0" src="' + Cake.image.path + '/person.png" />';
            }
        },
        {
            text: T.__("Name of Person"),
            flex: 1,
            dataIndex: 'name',
            renderer: function (v, m, r) {
                if (r.get('name2')) {
                    v += ' [' + r.get('name2') + ']';
                }
                return '<div style="font-size: 12px; padding: 5px 2px">' + v + '</div>';
            }
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("The person list is empty.")
    },

    tbar: [
        {
            text: Glb.btnSetting.newText,
            iconCls: Glb.btnSetting.newIconCls,
            tooltip: Glb.btnSetting.newText,
            handler: 'onClickNew'
        },
        '->',
        {
            xtype: 'textfield',
            emptyText: Glb.btnSetting.searchText,
            triggers: {
                undo: {
                    cls: 'x-form-clear-trigger',
                    tooltip: Glb.btnSetting.cancelText,
                    handler: 'onClickSearchUndo'
                },
                search: {
                    cls: 'x-form-search-trigger',
                    tooltip: Glb.btnSetting.searchText,
                    handler: 'onClickSearch'
                }
            },
            listeners: {
                specialkey: 'enterSearch',
                afterrender: function (cmp) {
                    var trigger1 = cmp.triggerEl.item(0);
                    if (cmp.getValue() === null || cmp.getValue() === '') {
                        trigger1.hide();
                    } else {
                        trigger1.show();
                    }
                },
                change: function (cmp) {
                    var trigger1 = cmp.triggerEl.item(0);
                    if (cmp.getValue() === null || cmp.getValue() === '') {
                        trigger1.setWidth(0);
                        trigger1.hide();
                    } else {
                        trigger1.show();
                    }
                }
            }
        }
    ],

    listeners: {
        itemclick: 'onSelect'
    }
});