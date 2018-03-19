/**
 * Created by benying.zou on 19.03.2018.
 */
Ext.define('WWS.view.school.PlansViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolplans',

    data: {
        startTimeScale: 8,
        endTimeScale: 0,

        scaleHeight: 50,

        defaultBgColor: 'white',
        cellBgColor: 'lightyellow',
        dayBgColor: 'LavenderBlush',
        curBgColor: 'LightPink',
        overBgColor: 'PeachPuff',
        selBgColor: 'PeachPuff'
    }
});