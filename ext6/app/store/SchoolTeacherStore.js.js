/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.store.SchoolTeacherStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolteacher',

    model: 'WWS.model.SchoolTeacher',

    proxy: {
        url: Cake.api.path + '/school/json/getTeachers'
    }
});