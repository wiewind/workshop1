/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.store.SchoolCourseStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolcourse',

    model: 'WWS.model.SchoolCourse',

    proxy: {
        url: Cake.api.path + '/school/json/getCourses'
    }
});