/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.main.FooterPanel', {
    extend: 'Ext.Panel',
    xtype: 'appfooter',

    config: {
        id: 'appFootPanel',
        border: 0,
        defaults: {
            border: 0
        }
    },

    initComponent: function () {
        this.bbar = [
            '->',
            {
                xtype: 'component',
                cls: 'noticeText',
                html: 'Version: ' + SSD.config.version.number + ' &copy; ' + Cake.author + ' ' + SSD.config.version.year
            },
            '-',
            {
                xtype: 'component',
                width: 60,
                height: 20,
                html: '<a href="http://one.me/deaycuzz" target="_blank" title="15G Webhosting + Domain + unlimited Email: ONE.COM"><img src="'+Cake.image.path+'/one_logo.png" alt="one.com" /></a>'
            }
        ];

        this.callParent();
    }
});