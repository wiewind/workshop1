/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.RecommendationPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesrecommendationpanel',

    afterRender: function () {
        var view = this.getView(),
            panel = view.lookupReference('noteShot'),
            vm = this.getViewModel(),
            store = vm.getStore('newNotes');

        store.on({
            'beforeload': {
                fn: function () {
                    Glb.common.mask(T.__('loading...'), panel);
                }
            },
            'load': {
                fn: function (store) {
                    view.updateNoteShotPanel(store);
                    Glb.common.unmask(panel);
                }
            }
        });
        store.load();
    },

    onAddProject: function (btn) {
        var panel = btn.up('panel');
        panel.removeAll();
        panel.add({
            xtype: 'worknotesprojectseditpanel'
        });

    },

    onClickShow: function (panel) {
        WNF.showWorknote(panel.worknoteId, 'detail');
    },

    onClickEdit: function (panel) {
        WNF.showWorknote(panel.worknoteId, 'edit');
    },

    onClickPrint: function (panel) {
        var id = panel.worknoteId;
        window.open(Cake.api.path + '/worknotes/printView/'+id, 'printview', "location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,width=600,height=400,left=100,top=200");
    },

    onRefreshNewWorknotes: function () {
        this.getViewModel().getStore('newNotes').reload();
    }
});