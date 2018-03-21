/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.store.SchoolSemesterStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolsemester',

    model: 'WWS.model.SchoolSemester',

    proxy: {
        url: Cake.api.path + '/school/json/getSemesters'
    }
});