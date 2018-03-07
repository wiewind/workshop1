/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('WWS.view.worknotes.NaviPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'worknotesnavipanel',

    requires: [
        'WWS.view.worknotes.NaviPanelController',
        'WWS.view.worknotes.NaviPanelViewModel'
    ],

    controller: 'worknotesnavipanel',
    viewModel: {
        type: 'worknotesnavipanel'
    },

    bind: '{liststore}',

    config: {
        width: 400,
        // collapsible: true,
        split: true,
        scrollable: true,
        forceFit: true,
        border: 1
    },

    emptyText: T.__("There are not worknotes"),

    columns: [
        {
            text: T.__("Date"),
            width: 100,
            dataIndex: 'date',
            renderer: 'renderDate'
        },
        {
            text: T.__("Project"),
            width: 100,
            dataIndex: 'project',
            renderer: 'renderProject'
        },
        {
            xtype:'actioncolumn',
            width:25,
            items: [
                {
                    getClass: 'renderStatus'
                }
            ]
        },
        {
            text: T.__("Title"),
            dataIndex: 'title',
            flex: 1,
            renderer: 'renderTitle'
        }
    ],

    tbar: [
        {
            text: Glb.btnSetting.newText,
            tooltip: Glb.btnSetting.newText,
            iconCls: Glb.btnSetting.newIconCls,
            handler: 'onClickNew'
        },
        {
            text: Glb.btnSetting.searchText,
            tooltip: Glb.btnSetting.searchText,
            iconCls: Glb.btnSetting.searchIconCls,
            handler: 'onClickSearch'
        },
        {
            text: Glb.btnSetting.resetText,
            tooltip: Glb.btnSetting.resetText,
            iconCls: Glb.btnSetting.resetIconCls,
            handler: 'onClickReset'
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("no worknotes")
    },

    listeners: {
        itemclick: 'onClickItem'
    }
});