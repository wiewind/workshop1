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
    },

    datatypeChild: 1,
    datatypeTeacher: 2,
    showPhoto: function (datatype, id) {
        var url = Cake.api.path + '/school/showPhoto/' + (datatype == SCF.datatypeChild ? 'child' : 'teacher') + '/' + id + '/' + screen.width + '/' + screen.height + '?_v=' + btoa(Date.now());

        var c = Ext.create('Ext.carousel.Carousel', {
            fullscreen: true,
            items: [
                {
                    xtype: 'img',
                    src: url,
                    width: screen.width,
                    height: screen.height,
                    style: 'background-color: #999999',
                    listeners: {
                        tap: function () {
                            c.destroy();
                        }
                    }
                }
            ]
        });
    }
});