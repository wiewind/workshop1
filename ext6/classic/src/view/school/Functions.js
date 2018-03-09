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
    },

    openEditClassWindow: function (class_id, callbackFn) {
        Ext.create('WWS.view.school.class.EditWindow', {
            viewModel: {
                data: {
                    id: class_id
                }
            },
            callback: callbackFn
        });
    },

    openClassGridWindow: function (selectable, callbackFn) {
        Ext.create('WWS.view.school.class.GridWindow', {
            viewModel: {
                data: {
                    selectable: selectable
                }
            },
            callback: callbackFn
        });
    },

    setDefaultClass: function (class_id, callback) {
        callback = callback || function () {};
        Glb.Ajax({
            url: Cake.api.path + '/school/json/setDefaultClass',
            params: {
                class_id: class_id
            },
            success: function(response){
                callback();
            }
        });
    }
});