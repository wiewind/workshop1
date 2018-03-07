/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.release.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'worknotesreleasegrid',

    requires: [
        'WWS.view.worknotes.release.EditPanel',

        'WWS.view.worknotes.release.GridController',
        'WWS.view.worknotes.release.GridViewModel'
    ],
    controller: 'worknotesreleasegrid',
    viewModel: {
        type: 'worknotesreleasegrid'
    },

    bind: '{releases}',

    config: {
        scrollable: true,
        border: 0,
        hideHeaders: true,
        selType: 'cellmodel'
    },
    emptyText: T.__("No files waiting Release."),

    columns: [
        {
            dataIndex: 'file',
            flex: 1,
            editor: {
                allowBlank: false
            }
        },
        {
            xtype:'actioncolumn',
            width:45,
            items: [
                {
                    getClass: function (v, meta, rec) {
                        if (rec.get('finished')) {
                            return 'x-fa fa-check-circle-o';
                        } else {
                            return 'x-fa fa-circle-o';
                        }
                    },
                    getTip: function(v, meta, rec) {
                        if (rec.get('finished')) {
                            return T.__("released");
                        } else {
                            return T.__("not released");
                        }
                    },
                    handler: 'onSetFinish'
                },
                {
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: T.__("Delete"),
                    handler: 'onDelete'
                }
            ]
        }
    ],

    initComponent: function () {
        var me = this;
        this.plugins = [
            Ext.create("Ext.grid.plugin.CellEditing", {
                clicksToEdit: 1,
                listeners: {
                    edit: function() {
                        me.store.sync();
                    }
                }
            })
        ];
        this.callParent();
    }
});