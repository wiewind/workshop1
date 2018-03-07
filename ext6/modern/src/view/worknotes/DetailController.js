/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.worknotes.DetailController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesdetail',

    setData: function (worknoteId) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            iframeCtn = view.down('[itemId="iframeCtn"]');

        worknoteId = worknoteId || vm.get('id');

        Glb.Ajax({
            url: Cake.api.path + '/Worknotes/json/getWorknote',
            params: {
                id: worknoteId
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText).data;
                vm.setData(data);

                var title = vm.get('title');
                if (title.length > 15) {
                    title = title.substr(0, 12)+'...';
                }

                view.down('toolbar').setTitle(title);

                iframeCtn.removeAll();
                iframeCtn.add(
                    {
                        xtype: 'component',
                        html: '<iframe src="' + Cake.api.path + '/worknotes/showText/' + worknoteId + '" style="height: 100%; width: 100%; border: none;" scrolling="auto" />'
                    }
                );
            }
        });
    }
});