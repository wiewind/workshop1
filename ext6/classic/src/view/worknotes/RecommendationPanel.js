/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.worknotes.RecommendationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'worknotesrecommendationpanel',

    requires: [
        'WWS.view.worknotes.projects.Grid',
        'WWS.view.worknotes.projects.EditPanel',
        'WWS.view.worknotes.RecommendationPanelController',
        'WWS.view.worknotes.RecommendationPanelViewModel'
    ],
    controller: 'worknotesrecommendationpanel',
    viewModel: {
        type: 'worknotesrecommendationpanel'
    },

    config: {
        title: T.__("Home"),
        iconCls: 'x-fa fa-home',
        closable: false,
        layout: 'border',
        bodyPadding: 5,
        defaults: {
            padding: 5
        }
    },

    items: [
        {
            title: T.__("My Projects"),
            iconCls: 'x-fa fa-cubes',
            region: 'west',
            layout: 'border',
            width: 300,
            items: [
                {
                    xtype: 'worknotesprojectsgrid',
                    region: 'center',
                    border: 1
                },
                {
                    xtype: 'panel',
                    region: 'south',
                    border: 1,
                    tbar: [
                        {
                            text: Glb.btnSetting.addText,
                            iconCls: Glb.btnSetting.addIconCls,
                            handler: 'onAddProject'
                        }
                    ]
                }
            ]
        },
        {
            title: T.__("New Worknotes"),
            iconCls: 'x-fa fa-file-text-o',
            region: 'center',
            scrollable: true,
            reference: 'noteShot',
            layout: 'vbox',
            bodyPadding: '5 0',
            defaults: {
                padding: '5 0'
            },
            tools: [
                {
                    type: 'refresh',
                    tooltip: T.__("Refresh"),
                    callback: 'onRefreshNewWorknotes'
                }
            ]
        }
    ],

    updateNoteShotPanel: function (store) {
        var me = this;

        var shotPanel = this.lookupReference('noteShot');
        shotPanel.removeAll();

        if (store.count() === 0) {
            shotPanel.add({
                margin: 10,
                border: 0,
                html: T.__("There are currently no notes")
            });
        } else {
            store.each(function(rec) {
                RR = rec;
                var proj = (rec.get('project')) ? rec.get('project') : T.__("Unknown"),
                    id = rec.get('id'),
                    btnText = '[' + Glb.Date.displayDateFromTimestamp(rec.get('date')) + '] ' + '[' + proj + '] ' +rec.get('title');
                var naviPanel = Ext.getCmp('worknotesNaviPanel');
                shotPanel.add({
                    width: '100%',
                    // margin: '10 10 5 10',
                    items: [
                        {
                            xtype: 'panel',
                            title: '<a style="cursor: pointer" title="'+rec.get('title')+'">'+btnText+'</a>',
                            icon: Cake.image.path+'/arrow_right.png',
                            titleCollapse: true,
                            collapsible: true,
                            collapsed: true,
                            collapseFirst: false,
                            autoScroll: false,
                            maxHeight: 200,
                            width: '100%',
                            border: 0,
                            worknoteId: id,
                            tools: [
                                {
                                    type: 'right',
                                    tooltip: T.__("Open"),
                                    callback: 'onClickShow'
                                }, {
                                    type: 'gear',
                                    tooltip: T.__("Edit"),
                                    callback: 'onClickEdit'
                                }, {
                                    type: 'print',
                                    tooltip: T.__("Print"),
                                    callback: 'onClickPrint'
                                }
                            ],
                            items: [{
                                xtype: 'component',
                                autoEl: {
                                    tag: 'iframe',
                                    style: 'height: 100%; width: 100%; border: none',
                                    src: Cake.api.path + '/worknotes/showText/'+id
                                }
                            }]
                        }
                    ]
                });
            });
        }
    }
});