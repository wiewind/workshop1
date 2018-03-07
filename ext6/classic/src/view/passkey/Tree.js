Ext.define ('WWS.view.passkey.Tree', {
    extend: 'Ext.tree.Panel',
    xtype: 'passkeytree',

    requires: [
        'WWS.view.passkey.TreeController',
        'WWS.view.passkey.TreeViewModel'
    ],
    controller: 'passkeytree',
    viewModel: {
        type: 'passkeytree'
    },

    bind: '{treeStore}',

    config: {
        iconCls: 'x-fa fa-bars',
        width: 400,
        collapsible: true,
        split: true,
        border: 0,
        title: T.__m("passkey"),
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

        itemmousedown: PKF.events.itemmousedown,

        itemmouseup: PKF.events.itemmouseup,

        containermouseup: 'onContainerMouseUp'
    }
});