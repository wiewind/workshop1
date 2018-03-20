/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.view.passkey.TreeViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.passkeytree',

    stores: {
        treeStore: {
            type: 'passkeytreestore',
            root: Glb.common.checkLogin() ? SSD.data.user.passkeyRoot : {},
            autoLoad: true
        }
    }
});