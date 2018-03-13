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

    formulas: {
        displaySemesterName: function (get) {
            var term = (Number(get('semester.semester'))===1) ? T.__("Winter Term") : T.__("Summer Term");
            return term + ' ' + get('semester.school_year');
        },
        displaySemesterDate: function (get) {
            return Glb.Date.displayDateFromString(get('semester.start')) + ' - ' + Glb.Date.displayDateFromString(get('semester.end'));
        }
    }
});