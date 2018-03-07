/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.passkey.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.passkeylist',

    init: function () {
        this.setGroupData(SSD.data.user.passkeyRoot);
    },

    setGroupData: function (groupData) {
        var vm = this.getViewModel(),
            passkeypanel = this.getView().up('passkeypanel'),
            pathCmp = passkeypanel.down('[itemId="pathCmp"]'),
            levelUpBtn = passkeypanel.down('button[itemId="levelUpBtn"]');
        vm.setData(groupData);
        pathCmp.setHtml(vm.get('path'));
        vm.getStore('groupItems').load();
        if (Number(groupData.parent_id) === 0) {
            levelUpBtn.hide();
        } else {
            levelUpBtn.show();
        }
    },

    onItemTap: function (list, index, target, record) {
        if (record.get('isPasskey')) {
            MGlb.common.identicalShow({
                xtype: 'passkeydetail',
                todo: function (panel) {
                    panel.getController().setData(Glb.Passkey.getKeyData(record));
                }
            });
        } else {
            this.setGroupData(record.get('PasskeyGroup'));
        }
    }
});