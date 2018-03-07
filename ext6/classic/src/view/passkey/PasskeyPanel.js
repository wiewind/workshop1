/**
 * Created by benying.zou on 28.02.2018.
 */
Ext.define ('WWS.view.passkey.PasskeyPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'passkeypanel',

    requires: [
        'WWS.view.passkey.Functions',
        'WWS.view.passkey.Grid',
        'WWS.view.passkey.Tree',
        'WWS.view.passkey.search.ResultWindow',
        'WWS.view.passkey.window.EditGroupWindow',
        'WWS.view.passkey.window.EditKeyWindow'
    ],

    config: {
        title: T.__m("passkey"),
        icon: Cake.image.path + '/board/passkey16.png',
        layout: 'border',
        closable: true,
        bodyPadding: 10,
        border: 0
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'passkeytree',
                region: 'west'
            },
            {
                xtype: 'passkeygrid',
                region: 'center',
                viewModel: {
                    data: SSD.data.user.passkeyRoot
                }
            }
        ];
        this.callParent();
    }
});