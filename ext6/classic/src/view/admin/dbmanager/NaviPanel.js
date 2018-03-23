/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define ('WWS.view.admin.dbmanager.NaviPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'admindbmanagernavipanel',

    requires: [
        'WWS.view.admin.dbmanager.NaviPanelController',
        'WWS.view.admin.dbmanager.NaviPanelViewModel'
    ],
    controller: 'admindbmanagernavipanel',
    viewModel: {
        type: 'admindbmanagernavipanel'
    },
    
    bind: {
        store: '{tablesStore}'
    },
    
    config: {
        width: 400,
        // collapsible: true,
        split: true,
        border: 0,
        title: T.__("Tables"),
        autoScroll: true,
        hideHeaders: true
    },

    columns:[
        {
            flex: 1,
            dataIndex: 'name'
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("Empty")
    },

    listeners: {
        select: 'onItemSelect'
    }
});