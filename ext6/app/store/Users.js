/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.store.Users', {
    extend: 'WWS.store.Base',

    alias: 'store.users',

    model: 'WWS.model.User',

    proxy: {
        url: Cake.api.path + '/users/json/getCustomerUsers'
    }
});