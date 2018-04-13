/**
 * Created by benying.zou on 12.04.2018.
 */
Ext.define('WWS.store.CurrenciesStore', {
    extend: 'WWS.store.Base',

    alias: 'store.currencies',

    model: 'WWS.model.Currency',

    proxy: {
        url: Cake.api.path + '/currencies/json/getAllCurrencies'
    }
});