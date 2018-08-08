/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.worknotes.show.ContainerPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesshowcontainerpanel',

    afterRender: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            worknoteId = vm.get('id');

        // build content
        view.buildContent(worknoteId, vm.get('showType'));

        // build releasegrid
        if (worknoteId > 0) {
            view.add({
                title: T.__("Release"),
                iconCls: 'x-fa fa-star',
                region: 'east',
                collapsible: true,
                layout: 'border',
                width: 300,
                margin: 5,
                items: [
                    {
                        xtype: 'worknotesreleasegrid',
                        region: 'center',
                        viewModel: {
                            data: {
                                worknoteId: worknoteId
                            }
                        }
                    },
                    {
                        xtype: 'panel',
                        region: 'south',
                        border: 0,
                        tbar: [
                            {
                                text: Glb.btnSetting.addText,
                                tooltip: Glb.btnSetting.addText,
                                iconCls: Glb.btnSetting.addIconCls,
                                handler: 'onAddRelease'
                            }
                        ]
                    }
                ]
            });
        }
    },

    onAddRelease: function (btn) {
        var panel = btn.up('panel');
        panel.removeAll();
        panel.add({
            xtype: 'worknotesreleaseeditpanel'
        });
    }
});