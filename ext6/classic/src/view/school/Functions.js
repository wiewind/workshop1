/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.Functions', {
    singleton: true,
    alternateClassName: ['SCF'],

    config: {
        class: [],
        semester: [],

        weekdays: [T.__("Monday"), T.__("Tuesday"), T.__("Wednesday"), T.__("Thursday"), T.__("Friday")],
        coursePeriods: [
            {name: T.__("weekly"), value: 'weekly'},
            {name: T.__("two-weeks"), value: 'two-weeks'}
        ],
        cellHeight: 100
    }
});