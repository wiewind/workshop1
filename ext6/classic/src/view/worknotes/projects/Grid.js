/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.projects.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'worknotesprojectsgrid',

    requires: [
        'WWS.view.worknotes.projects.GridController',
        'WWS.view.worknotes.projects.GridViewModel'
    ],
    controller: 'worknotesprojectsgrid',
    viewModel: {
        type: 'worknotesprojectsgrid'
    },

    bind: '{projects}',

    config: {
        scrollable: true,
        hideHeaders: true,
        selType: 'cellmodel'
    },
    emptyText: T.__("You have not set any projects."),

    columns: [
        {
            dataIndex: 'name',
            flex: 1,
            editor: {
                allowBlank: false
            }
        },
        {
            xtype:'actioncolumn',
            width:30,
            items: [
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