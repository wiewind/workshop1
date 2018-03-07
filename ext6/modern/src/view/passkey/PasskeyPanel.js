/**
 * Created by benying.zou on 02.03.2018.
 */

Ext.define ('WWS.view.passkey.PasskeyPanel', {
    extend: 'Ext.Container',
    xtype: 'passkeypanel',

    requires: [
        'WWS.view.passkey.Functions',
        'WWS.view.passkey.List',
        'WWS.view.passkey.Detail',
        'WWS.view.passkey.PasskeyPanelController'
    ],
    controller: 'passkeypanel',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                itemId: 'buttonToolbar',
                docked: 'top',
                title: T.__m('passkey'),
                items: [
                    {
                        iconCls: 'x-fa fa-level-up',
                        cls: 'toolbar-button',
                        itemId: 'levelUpBtn',
                        hidden: true,
                        handler: 'onClickParentDir'
                        // },
                        // '->',
                        // {
                        //     iconCls: 'x-fa fa-search',
                        //     cls: 'toolbar-button',
                        //     handler: 'onClickSearch'
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'fm_path',
                itemId: 'pathCmp',
                minHeight: 30
            },
            {
                xtype: 'passkeylist',
                flex: 1
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});