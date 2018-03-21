/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.store.SchoolClassStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolclass',

    model: 'WWS.model.SchoolClass',

    proxy: {
        url: Cake.api.path + '/school/json/getClasses'
    }
});