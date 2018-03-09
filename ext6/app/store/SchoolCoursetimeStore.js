/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.store.SchoolCoursetimeStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolcoursetime',

    model: 'WWS.model.SchoolCoursetime',

    proxy: {
        url: Cake.api.path + '/school/json/getCoursetimes'
    }
});