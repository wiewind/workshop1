/**
 * Created by benying.zou on 14.03.2018.
 */
Ext.define('WWS.view.school.plan.TableViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.schoolplantable',

    data: {
        startTimeScale: 8,
        endTimeScale: 19,

        scaleWidth: 100,

        defaultBgColor: 'white',
        cellBgColor: 'lightyellow',
        dayBgColor: 'LavenderBlush',
        curBgColor: 'LightPink',
        overBgColor: 'PeachPuff',
        selBgColor: 'PeachPuff'
    }
});