/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.plan.CopyWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',
    alias: 'viewmodel.schoolplancopywindow',

    data: {},

    formulas: {
        displayFromSemesterName: function (get) {
            var term = (Number(get('from_semester.semester'))===1) ? T.__("Winter Term") : T.__("Summer Term");
            return term + ' ' + get('from_semester.school_year');
        },

        displayToSemesterName: function (get) {
            var term = (Number(get('to_semester.semester'))===1) ? T.__("Winter Term") : T.__("Summer Term");
            return term + ' ' + get('to_semester.school_year');
        }
    }
});