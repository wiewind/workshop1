/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.store.SchoolChildrenStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolchildren',

    model: 'WWS.model.SchoolChild',

    proxy: {
        url: Cake.api.path + '/school/json/getChildren'
    }
});