/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.worknotes.show.EditPanelController', {
    extend: 'WWS.ux.MusterFormController',

    alias: 'controller.worknotesshoweditpanel',

    afterRender: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            worknoteId = vm.get('id');
        if (worknoteId > 0) {
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

                    view.up('worknotesshowcontainerpanel').setTitle(T.__('Edit') + ': ' + title);

                    view.buildCkeditor();
                }
            });
        } else {
            view.up('worknotesshowcontainerpanel').setTitle(T.__('New Worknote'));
            view.buildCkeditor();
        }

    },

    submitSuccess: function (form, action) {
        var id = this.getViewModel().get('id'),
            newId = Ext.decode(action.response.responseText).data;
        if (id != newId) {
            WNF.close(id);
        }
        WNF.showWorknote(newId, 'detail');
        Ext.ComponentQuery.query('worknotesnavipanel')[0].getStore().reload();
        Ext.ComponentQuery.query('worknotesrecommendationpanel')[0].getViewModel().getStore('newNotes').reload();
    },

    onClickCancel: function () {
        var id = this.getViewModel().get('id');
        if (id > 0) {
            WNF.showWorknote(id, 'detail');
        } else {
            var panelId = 'worknotedetailPanel_'+id,
                panel = Ext.getCmp(panelId);
            if (panel) {
                panel.close();
            }
        }
    }
});