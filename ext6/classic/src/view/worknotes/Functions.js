/**
 * Created by benying.zou on 28.02.2018.
 */
Ext.define('WWS.view.worknotes.Functions', {
    singleton: true,
    alternateClassName: ['WNF'],

    showWorknote: function (id, type) {
        type = type || 'detail';
        var panelId = 'worknotedetailPanel_'+id,
            tabPanel = Ext.getCmp('worknoteMainPanel'),
            panel = Ext.getCmp(panelId);
        if (!panel) {
            panel = Ext.create('WWS.view.worknotes.show.ContainerPanel', {
                id: panelId,
                viewModel: {
                    data: {
                        id: id,
                        showType: type
                    }
                }
            });
            tabPanel.add(panel);
        } else {
            panel.buildContent(id, type);
        }

        tabPanel.setActiveTab(panelId);
    },

    close: function (id) {
        Ext.getCmp('worknotedetailPanel_'+id).close();
    }
});