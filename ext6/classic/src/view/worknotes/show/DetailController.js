/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.worknotes.show.DetailController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesshowdetail',

    afterRender: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            worknoteId = vm.get('id');
        Glb.Ajax({
            url: Cake.api.path + '/Worknotes/json/getWorknote',
            params: {
                id: worknoteId
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText).data;
                vm.setData(data);

                var title = Glb.Date.displayDateFromString(vm.get('date')) + ': ' + vm.get('title');
                if (title.length > 30) {
                    title = title.substr(0, 27)+'...';
                }

                view.up('worknotesshowcontainerpanel').setTitle(title);
            }
        });

        view.lookupReference('iframeCtn').add(
            {
                xtype: 'component',
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%; border: none',
                    src: Cake.api.path + '/worknotes/showText/' + worknoteId
                }
            }
        )
    },

    onClickEdit: function () {
        var id = this.getViewModel().get('id');
        WNF.showWorknote(id, 'edit');
    },

    onClickDelete: function () {
        var worknoteId = this.getViewModel().get('id');
        ABox.confirm(
            T.__("Are you sure you want to delete the worknote?"),
            function (btn) {
                Glb.Ajax({
                    url: Cake.api.path + '/Worknotes/json/delete',
                    params: {
                        worknote_id: worknoteId
                    },
                    success: function (response, options) {
                        WNF.close(worknoteId);
                        Ext.ComponentQuery.query('worknotesnavipanel')[0].getStore().reload();
                        Ext.ComponentQuery.query('worknotesrecommendationpanel')[0].getViewModel().getStore('newNotes').reload();
                    }
                });
            }
        );
    },

    onClickPrint: function () {
        var worknoteId = this.getViewModel().get('id');
        window.open(Cake.api.path + '/worknotes/printView/'+worknoteId, 'printview', "location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,width=600,height=400,left=100,top=200");
    }
});