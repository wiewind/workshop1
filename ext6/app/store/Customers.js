/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.store.Customers', {
    extend: 'WWS.store.Base',

    alias: 'store.customers',

    model: 'WWS.model.Customer',

    proxy: {
        url: Cake.api.path + '/customers/json/getAllCustomers'
    }
});