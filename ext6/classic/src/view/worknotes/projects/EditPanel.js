/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.worknotes.projects.EditPanel', {
    extend: 'WWS.ux.MusterForm',
    xtype: 'worknotesprojectseditpanel',

    requires: [
        'WWS.view.worknotes.projects.EditPanelController'
    ],
    controller: 'worknotesprojectseditpanel',

    config: {},

    input: {
        url: Cake.api.path + '/WorknoteProjects/json/create'
    },

    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: T.__("Project Name"),
            labelAlign: 'top',
            width: '100%',
            padding: '5',
            allowBlank:false,
            listeners: {
                specialkey: 'submitOnEnter'
            }
        }
    ],

    bbar: [
        {
            text: Glb.btnSetting.saveText,
            tooltip: Glb.btnSetting.saveText,
            iconCls: Glb.btnSetting.saveIconCls,
            handler: 'onSubmit'
        },
        '->',
        {
            text: Glb.btnSetting.cancelText,
            tooltip: Glb.btnSetting.cancelText,
            iconCls: Glb.btnSetting.cancelIconCls,
            handler: 'onCancel'
        }
    ]
});