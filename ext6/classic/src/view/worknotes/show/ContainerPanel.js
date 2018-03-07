/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.worknotes.show.ContainerPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'worknotesshowcontainerpanel',

    requires: [
        'WWS.view.worknotes.release.Grid',
        'WWS.view.worknotes.show.Detail',
        'WWS.view.worknotes.show.Detail',

        'WWS.view.worknotes.show.ContainerPanelController',
        'WWS.view.worknotes.show.ContainerPanelViewModel'
    ],
    controller: 'worknotesshowcontainerpanel',
    viewModel: {
        type: 'worknotesshowcontainerpanel'
    },

    config: {
        title: T.__('loading...'),
        border: 1,
        closable: true,
        iconCls: 'x-fa fa-sticky-note-o',
        layout: 'border'
    },

    items: [
        {
            xtype: 'container',
            region: 'center',
            layout: 'fit'
        }
    ],

    buildContent: function (worknoteId, showType) {
        var ctn = this.down('container[region="center"]');
        ctn.removeAll();
        if (worknoteId > 0 && showType === 'detail') {
            ctn.add({
                xtype: 'worknotesshowdetail',
                viewModel: {
                    data: {
                        id: worknoteId
                    }
                }
            });
        } else {
            ctn.add({
                xtype: 'worknotesshoweditpanel',
                viewModel: {
                    data: {
                        id: worknoteId
                    }
                }
            });
        }
    }
});
