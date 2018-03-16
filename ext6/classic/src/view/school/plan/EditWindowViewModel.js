/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.plan.EditWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',
    alias: 'viewmodel.schoolplaneditwindow',

    data: {
        id: 0,
        period: 'weekly'
    },

    formulas: {
        displayTeacherName: function (get) {
            return Glb.displayPersonName(get('SchoolTeacher.lastname'), get('SchoolTeacher.firstname'), get('SchoolTeacher.sex'));
        },

        displayStartHour: function (get) {
            var time = get('start');
            if (time) {
                var arr = time.split(':');
                return arr[0];
            }
            return '';
        },

        displayStartMinute: function (get) {
            var time = get('start');
            if (time) {
                var arr = time.split(':');
                return arr[1];
            }
            return '';
        },

        displayEndHour: function (get) {
            var time = get('end');
            if (time) {
                var arr = time.split(':');
                return arr[0];
            }
            return '';
        },

        displayEndMinute: function (get) {
            var time = get('end');
            if (time) {
                var arr = time.split(':');
                return arr[1];
            }
            return '';
        },

        disabledFirstDate: function (get) {
            return get('period') === 'weekly'
        },

        displayTitle: function (get) {
            if (get('id') > 0) {
                return T.__('Plan')
            }
            return T.__('New Plan')
        }
    }
});