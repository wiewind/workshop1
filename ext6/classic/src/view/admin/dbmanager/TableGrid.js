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
        // closable: true,
        scrollable: true,
        forceFit: true,
        border: 1,
        selType: 'rowmodel',
        plugins: {
            rowediting: {
                clicksToEdit: 1,
                // autoUpdate: true
                listeners: {
                    edit: 'onCellEdit'
                }
            }
        },

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
            }
        ]
    },

    initComponent: function () {
        var me = this,
            vm = this.getViewModel(),
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
            if (!Wiewind.Array.in_array(key, keys)) {
                col.editor = DMF.buildEditor(value);
            }
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

        columns.push({
            xtype:'actioncolumn',
            width:30,
            items: [
                {
                    iconCls: 'x-fa fa-minus-circle red',
                    tooltip: T.__("Delete"),
                    handler: 'onClickDelete'
                }
            ]
        });

        this.columns = columns;
        store.setFields(fields);


        this.callParent();
        store.load();
    }
});