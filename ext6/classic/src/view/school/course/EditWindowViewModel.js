/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.course.EditWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',
    alias: 'viewmodel.schoolcourseeditwindow',

    data: {
        id: 0,
        name: ''
    },

    formulas: {
        displayTeacherName: function (get) {
            return Glb.displayPersonName(get('DefaultTeacher.lastname'), get('DefaultTeacher.firstname'), get('DefaultTeacher.sex'));
        }
    }
});