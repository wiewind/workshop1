/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.worknotes.WorknotesPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'worknotespanel',

    requires: [
        'WWS.view.worknotes.Functions',
        'WWS.view.worknotes.NaviPanel',
        'WWS.view.worknotes.SearchWindow',
        'WWS.view.worknotes.RecommendationPanel',
        'WWS.view.worknotes.show.ContainerPanel'
    ],

    config: {
        title: T.__m("worknotes"),
        icon: Cake.image.path+'/board/worknotes16.png',
        layout: 'border',
        closable: true,
        bodyPadding: 10,
        border: 0
    },

    initComponent: function () {
        this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        this.items = [
            {
                xtype: 'worknotesnavipanel',
                region: 'west'
            },
            {
                xtype: 'tabpanel',
                id: 'worknoteMainPanel',
                region: 'center',
                border: 1,
                items: [
                    Ext.create('WWS.view.worknotes.RecommendationPanel')
                ]
            }
        ];
    }
});
