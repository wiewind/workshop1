/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define ('WWS.view.filemanagement.NaviPanel', {
    extend: 'Ext.tree.Panel',
    xtype: 'filemanagementnavipanel',

    requires: [
        'WWS.view.filemanagement.NaviPanelController',
        'WWS.view.filemanagement.NaviPanelViewModel'
    ],
    controller: 'filemanagementnavipanel',
    viewModel: {
        type: 'filemanagementnavipanel'
    },

    bind: '{treeStore}',

    config: {
        iconCls: 'x-fa fa-bars',
        width: 400,
        collapsible: true,
        split: true,
        border: 0,
        title: T.__("Documents"),
        scrollable: true,
        rootVisible: false
    },

    expandedPaths: [],

    tbar: [
        {
            tooltip: T.__("Undo Move"),
            itemId: 'undoBtn',
            icon: Cake.image.path+'/arrow_undo.png',
            disabled: true,
            handler: 'onClickUndoMove'
        },
        {
            tooltip: T.__("Redo Move"),
            itemId: 'redoBtn',
            icon: Cake.image.path+'/arrow_redo.png',
            disabled: true,
            handler: 'onClickRedoMove'
        }
    ],
    bbar: [
        {
            tooltip: Glb.btnSetting.refreshText,
            iconCls: Glb.btnSetting.refreshIconCls,
            handler: 'onClickRefresh'
        }
    ],
    listeners: {
        containercontextmenu: 'containerContextMenu',

        itemcontextmenu: 'itemContextMenu',

        itemclick: 'onItemClick',

        itemexpand: 'onItemExpand',

        itemcollapse: 'onItemCollapse',

        itemmouseenter: FMF.events.itemmouseenter,

        itemmousedown: FMF.events.itemmousedown,

        itemmouseup: FMF.events.itemmouseup,

        containermouseup: 'onContainerMouseUp'
    }


});