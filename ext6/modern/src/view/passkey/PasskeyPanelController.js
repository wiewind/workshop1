/**
 * Created by benying.zou on 02.03.2018.
 */
Ext.define('WWS.view.passkey.PasskeyPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.passkeypanel',

    onClickParentDir: function () {
        var me = this,
            view = this.getView(),
            listView = view.down('passkeylist'),
            vm = listView.getViewModel(),
            ctr = listView.getController(),
            parent_id = vm.get('parent_id');
        if (parent_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/passkeys/json/getGroupData',
                params: {
                    group_id: parent_id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    if (!Wiewind.isEmpty(data)) {
                        ctr.setGroupData(data);
                    }
                }
            });
        } else {
            ctr.setGroupData(SSD.data.user.passkeyRoot);
        }
    }
});