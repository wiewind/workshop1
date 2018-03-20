/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.SettingsViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolsettings',

    data: {},

    stores: {
        classStore: {
            type: 'schoolclass',
            autoLoad: true
        },
        semesterStore: {
            type: 'schoolsemester',
            autoLoad: true
        }
    }
});