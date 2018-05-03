/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ('WWS.view.main.HeaderPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'appheader',

    requires: [
        'WWS.view.main.HeaderPanelController',
        'WWS.view.main.HeaderPanelViewModel',
        'WWS.view.main.HeaderPanelToolbar',

        'WWS.view.main.window.CurrencyChartWindow'
    ],
    controller: 'appheader',
    viewModel: {
        type: 'appheader'
    },

    config: {
        layout: 'hbox',
        border: '0 0 1px 0'
    },

    dockedItems: [
        {
            xtype: 'appheadertoolbar'
        }
    ],

    initComponent: function () {
        var me = this;
        me.buildItems();
		me.callParent();
	},

    buildItems: function () {
        var me = this,
            lang = SSD.data.appLanguage.code || 'cn',
            checkCn = true,
            checkDe = false,
            checkEn = false,
            checkChn = false;
        switch (lang) {
            case 'de':
                checkCn = false;
                checkDe = true;
                break;
            case 'gb':
                checkCn = false;
                checkEn = true;
                break;
        }
        me.bbar = [
            {
                xtype: 'button',
                iconAlign: 'top',
                icon: Cake.image.path+'/google_32.png',
                name: 'engine',
                value: 'google',
                scale: 'large',
                menu: [
                    {
                        engine: 'google',
                        text: 'Google',
                        icon: Cake.image.path + '/google_16.png',
                        icon32: Cake.image.path+'/google_32.png',
                        handler: 'onChangeEngine'
                    },
                    {
                        engine: 'baidu',
                        text: '百度',
                        icon: Cake.image.path+'/baidu_16.png',
                        icon32: Cake.image.path+'/baidu_32.png',
                        handler: 'onChangeEngine'
                    }
                ]
            },
            {
                xtype: 'searchfield',
                name: 'searchtext',
                flex: 1,
                minWidth: 200,
                listeners: {
                    specialkey: function (field, event) {
                        if (event.getKey() == event.ENTER) {
                            me.getController().onSearch();
                        }
                    }
                },
                onClickSearch: 'onSearch'
            },
            {
                xtype: 'radiogroup',
                defaultType: 'radiofield',
                layout: 'hbox',
                defaults: {
                    name: 'searchlanguage',
                    labelSeparator: '',
                    padding: '0 5',
                    hideLabel: true
                },
                items: [
                    {
                        boxLabel: '简体',
                        labelWidth: 60,
                        inputValue: 'zh-CN',
                        checked: checkCn
                    }, {
                        boxLabel: 'Deutsch',
                        labelWidth: 40,
                        inputValue: 'de',
                        checked: checkDe
                    }, {
                        boxLabel: '繁體',
                        labelWidth: 60,
                        inputValue: 'zh-TW',
                        checked: checkChn
                    }, {
                        boxLabel: 'English',
                        labelWidth: 40,
                        inputValue: 'en',
                        checked: checkEn
                    }
                ]
            },
            {
                xtype: 'component',
                width: 100
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'menge',
                        width: 80,
                        fieldStyle: 'text-align: right;',
                        cls: 'exchangeCls',
                        hideTrigger: true,
                        bind: {
                            value: '{menge}'
                        }
                    },
                    {
                        xtype: 'combobox',
                        name: 'from',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'code',
                        editable: false,
                        forceSelection: true,
                        width: 120,
                        bind: {
                            store: '{currencies}',
                            value: '{from}'
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-exchange',
                        margin: '0 10',
                        tooltip: T.__('Transfer source and target currency'),
                        handler: 'onClickChange'
                    },
                    {
                        xtype: 'displayfield',
                        editable: false,
                        padding: '0 10 0 0',
                        bind: {
                            value: '{result}'
                        }
                    },
                    {
                        xtype: 'combobox',
                        name: 'to',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'code',
                        editable: false,
                        forceSelection: true,
                        width: 120,
                        bind: {
                            store: '{currencies}',
                            value: '{to}'
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-line-chart',
                        margin: '0 10',
                        tooltip: T.__('show chart'),
                        handler: 'onClickChart'
                    }
                ]
            }
        ];
    }
});