/**
 * Created by benying.zou on 16.03.2018.
 */
Ext.define('WWS.view.school.CellViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolcell',

    data: {
        id: 0,

        emptyText: T.__('-'),

        bgColorChangable: true
    },

    formulas: {
        cellHeight: function (get) {
            return SCF.timeToScale(get('end')) - SCF.timeToScale(get('start'));
        },

        showBorder: function (get) {
            if (get('id') > 0) {
                return '1px solid #ccc';
            }
            return false;
        },

        displayTeacherName: function (get) {
            return Glb.displayPersonName(get('SchoolTeacher.lastname'), get('SchoolTeacher.firstname'));
        },

        displayPeriod: function (get) {
            var period = get('period'),
                res = T.__("Unknown");
            Ext.each(Glb.coursePeriods, function (p) {
                if (p.value == period) {
                    res = p.name;
                }
            });
            return res;
        },

        displayCellContent: function (get) {
            if (get('id') === 0) {
                return get('emptyText');
            }

            // return get('SchoolCourse.name');


            var title_style = 'font-weight: bold; text-align: center;',
                title_tooltip = '';
            if (get('period') == 'two-weeks' && !Ext.isEmpty(get('first_date'))) {
                var now = new Date(Ext.Date.format(new Date(), 'Y-m-d')),
                    curWeekday = now.getDay(),
                    timestampOfDay = 1000*60*60*24,
                    lastSundayDate = new Date(+(now) - curWeekday * timestampOfDay),

                    cellDate = new Date(+lastSundayDate + get('weekday') * timestampOfDay),
                    firstDate = new Date(get('first_date')),
                    iDays = parseInt(Math.abs(cellDate - firstDate) / timestampOfDay),

                    courseOfToday = (parseInt(iDays / 7) % 2 == 0);
                if (!courseOfToday) {
                    title_style += ' color: grey; text-decoration:line-through;';
                    title_tooltip = T.__("No Course This Week");
                }
            }


            var html = '<div style="' + title_style + '">' + get('SchoolCourse.name') + '</div>';


            html += '<div style="color: #888888">';

            html += '<div><b>' + get('start').substr(0, 5) + ' - ' + get('end').substr(0, 5) + '</b></div>';

            var teachername = (get('teacher_id') > 0) ? '<div>' + get('displayTeacherName') + '</div>' : '';
            html += teachername;

            var roomname = '<div>' + (get('room_id')) + '</div>' ? get('SchoolRoom.name') : '';
            html += roomname;

            if (!Ext.isEmpty(get('period')) && get('period') != 'weekly') {
                html += '<div>' + get('displayPeriod') + '</div>';
            }

            html += '</div>';

            if (title_tooltip) {
                html += '<div style="position: absolute; float: right; bottom: 5px; right: 5px; z-index: 9999; color: darkred; font-size: large; font-weight: bold">' + title_tooltip + '</div>';
            }
            return html;
        },

        columnBgColor: function (get) {
            var now = new Date(),
                time = now.getHours() + ':'+now.getMinutes(),
                weekday = now.getDay();

            if (Number(get('weekday')) === Number(weekday)) {
                return get('dayBgColor');
            }
            return get('defaultBgColor');
        },

        bgColor: function (get) {
            var now = new Date(),
                time = now.getHours() + ':'+now.getMinutes(),
                weekday = now.getDay();

            if (Number(get('weekday')) === Number(weekday)) {
                var cur = new Date("2000-01-01 " + time + ":00").getTime(),
                    start = new Date("2000-01-01 " + get('start')).getTime(),
                    end = new Date("2000-01-01 " + get('end')).getTime();

                if (get('id') > 0) {
                    if (start <= cur && cur <= end) {
                        return get('curBgColor')
                    } else {
                        return get('cellBgColor');
                    }
                } else {
                    return get('dayBgColor')
                }
            }
            if (get('id') > 0) {
                return get('cellBgColor');
            }
            return get('defaultBgColor');
        }
    }
});