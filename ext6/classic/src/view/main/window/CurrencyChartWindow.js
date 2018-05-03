/**
 * Created by benying.zou on 02.05.2018.
 */
Ext.define('WWS.view.main.window.CurrencyChartWindow', {
    extend: 'Ext.window.Window',
    xtype: 'maincurrencychartwindow',

    requires: [
        'WWS.view.main.window.CurrencyChartWindowController',
        'WWS.view.main.window.CurrencyChartWindowViewModel'
    ],
    controller: 'maincurrencychartwindow',
    viewModel: {
        type: 'maincurrencychartwindow'
    },

    config: {
        title: T.__('Currency Chart'),
        width: 800,
        height: 800,
        modal: true,
        autoShow: true,
        layout: 'fit'
    },

    buttons: [
        T.__('View') + ': ',
        {
            xtype: 'combobox',
            name: 'during',
            width: 100,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: [
                    {name: T.__('Day'), value: 'day'},
                    {name: T.__('Month'), value: 'month'},
                    {name: T.__('Year'), value: 'year'}
                ]
            }),
            bind: {
                value: '{during}'
            },
            listeners: {
                change: 'onDuringChange'
            }
        },
        '->',
        {
            text: Glb.btnSetting.closeText,
            tooltip: Glb.btnSetting.closeText,
            iconCls: Glb.btnSetting.closeIconCls,
            handler: 'onClickClose'
        }
    ],

    buildChart: function () {
        var vm = this.getViewModel();
        return {
            xtype: 'cartesian',
            reference: 'chart',
            width: '100%',
            height: 500,
            interactions: {
                type: 'panzoom',
                zoomOnPanGesture: true
            },
            bind: {
                store: '{rates}'
            },
            insetPadding: 60,
            innerPadding: {
                left: 40,
                right: 40
            },
            sprites: [
                {
                    type: 'text',
                    text: '1 ' + vm.get('from') + ' = ? ' + vm.get('to'),
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40,
                    y: 30
                },
                {
                    type: 'text',
                    text: 'Source: https://www.wiewind.com/',
                    fontSize: 10,
                    x: 12,
                    y: 655
                }
            ],
            axes: [
                {
                    type: 'numeric',
                    position: 'left'
                },
                {
                    type: 'category',
                    position: 'bottom'
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'date',
                    yField: 'rate',
                    style: {
                        lineWidth: 4
                    },
                    marker: {
                        radius: 4
                    },
                    highlight: {
                        fillStyle: '#000',
                        radius: 5,
                        lineWidth: 2,
                        strokeStyle: '#fff'
                    },
                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onSeriesTooltipRender'
                    }
                }
            ]
        }
    }
});