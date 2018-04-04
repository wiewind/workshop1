/**
 * Created by benying.zou on 26.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.TableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'admindbmanagertablegrid',

    requires: [
        'WWS.view.admin.dbmanager.TableGridController',
        'WWS.view.admin.dbmanager.TableGridViewModel'
    ],
    controller: 'admindbmanagertablegrid',
    viewModel: {
        type: 'admindbmanagertablegrid'
    },

    config: {
        bind: {
            title: T.__("Resource") + ': ' + '{tablename}',
            store: '{recordsStore}'
        },
        scrollable: true,
        forceFit: true,
        border: 1,

        // plugins: [
        //     Ext.create("Ext.grid.plugin.CellEditing", {
        //         clicksToEdit: 1,
        //         listeners: {
        //             edit: 'onCellEdit'
        //         }
        //     })
        // ],
        // selType: 'cellmodel',

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
            }
        ]
    },

    initComponent: function () {
        var vm = this.getViewModel(),
            tablename = vm.get('tablename'),
            dataConfig = vm.get('dataConfig'),
            keys = vm.get('keys'),
            store = vm.getStore('recordsStore'),
            fields = [],
            columns = [];

        Ext.Object.each(dataConfig, function(key, value, myself) {
            fields.push({
                name: key, mapping: key
            });

            var col = {
                text: key,
                dataIndex: key
            };
            col.renderer = function(v, meta, rec) {
                if (!v && value.type !== 'boolean') {
                    return '';
                } else if (value.type === 'string' || value.type === 'text') {
                    return v
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                }
                return v;
            };
            columns.push(col);
        });

        this.columns = columns;

        store.setFields(fields);


        this.callParent();
        store.load();
    },

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});