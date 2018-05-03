/**
 * Created by benying.zou on 02.05.2018.
 */
Ext.define('WWS.store.CurrencyChartStore', {
    extend: 'WWS.store.Base',

    alias: 'store.currencychart',

    fields: [
        {name: 'date', mapping: 'date'},
        {name: 'rate', mapping: 'rate', type: 'float'}
    ],
    proxy: {
        url: Cake.api.path + '/currencies/json/getChartRates'
    }
});