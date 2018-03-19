/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.Functions', {
    singleton: true,
    alternateClassName: ['SCF'],

    scaleOneMinute: 3,
    timeToScale: function (time) {
        var arr = time.split(':');
        return arr[0] * SCF.scaleOneMinute * 60 + arr[1] * SCF.scaleOneMinute;
    }
});