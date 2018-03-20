/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.GooglePanel', {
    extend: 'Ext.Container',
    xtype: 'maingoogle',

    requires: [
        'WWS.view.main.GooglePanelController'
    ],
    controller: 'maingoogle',

    config: {
        iconCls: 'x-fa fa-google',
        layout: 'vbox',
        padding: 20,
        scrollable: true,
        standardSubmit: true
    },

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            title: T.__('Google'),
            items: [
                {
                    iconCls: 'x-fa fa-chevron-left',
                    handler: MGlb.common.goback
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'searchtext',
            listeners: {
                keyup: 'enterSubmit'
            }
        },
        {
            xtype: 'selectfield',
            name: 'language',
            label: T.__('Choose language'),
            options: [
                { value: 'zh-cn', text: '简体' },
                { value: 'de', text: 'Deutsch' },
                { value: 'zh-tw', text: '繁體' },
                { value: 'en', text: 'English' }
            ],
            value: 'zh-cn'
        },
        {
            xtype: 'selectfield',
            name: 'engine',
            label: T.__('Choose engine'),
            displayTpl: '{name}',
            options: [
                { value: 'google', name: T.__('Google'), text: '<img src="'+Cake.image.path + '/google.png'+'" />' },
                { value: 'baidu', name: T.__('Beidu'), text: '<img src="'+Cake.image.path + '/baidu.png'+'" />' }
            ],
            value: 'google',
            // displayTpl: '<img src="'+Cake.image.path+'/{value}_16.png" /> {text}',
            listeners: {
                change: 'onChangeEngine'
            }
        },
        {
            style: 'height: 2em;'
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-search',
            text: T.__('Search'),
            ui: 'action',
            handler: 'onSearch'
        }
    ],

    listeners: {
        activate: Glb.History.add
    }
});