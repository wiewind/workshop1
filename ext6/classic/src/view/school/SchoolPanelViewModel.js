/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.SchoolPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolpanel',

    data: {
        class: {},

        semester: {}
    },

    stores: {
        semesterStore: {
            type: 'schoolsemester',
            autoLoad: true
        }
    },

    formulas: {
        displaySemesterDate: function (get) {
            return Glb.Date.displayDateFromString(get('semester.start')) + ' - ' + Glb.Date.displayDateFromString(get('semester.end'));
        }
    }
});