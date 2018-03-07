/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.worknotes.release.EditPanel', {
    extend: 'WWS.ux.MusterForm',
    xtype: 'worknotesreleaseeditpanel',

    requires: [
        'WWS.view.worknotes.release.EditPanelController'
    ],
    controller: 'worknotesreleaseeditpanel',

    config: {},

    input: {
        url: Cake.api.path + '/WorknoteReleases/json/save'
    },

    items: [
        {
            xtype: 'textfield',
            name: 'file',
            fieldLabel: T.__("Filename"),
            labelStyle: 'font-weight: bold; padding: 5px',
            labelAlign: 'top',
            width: '90%',
            padding: '5',
            allowBlank:false,
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },
        {
            xtype: 'checkbox',
            name: 'finished',
            fieldLabel: T.__("Committed"),
            labelStyle: 'font-weight: bold;',
            padding: '10',
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'worknoteId'
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