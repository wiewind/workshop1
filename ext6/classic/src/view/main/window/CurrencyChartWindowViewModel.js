/**
 * Created by benying.zou on 02.05.2018.
 */
Ext.define('WWS.view.main.window.CurrencyChartWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.maincurrencychartwindow',

    data: {
        during: 'day'
    },

    stores: {
        rates: {
            type: 'currencychart',
            autoLoad: false,
            listeners: {
                beforeLoad: function (store) {
                    var win = Ext.ComponentQuery.query('maincurrencychartwindow')[0],
                        vm = win.getViewModel();
                    store.setExtraParams({
                        from: vm.get('from'),
                        to: vm.get('to'),
                        during: vm.get('during')
                    });
                }
            }
        }
    },

    formulas: {
        showUnit: function (get) {
            return '1 ' + get('from') + ' = ? ' + get('to');
        }
    }
});