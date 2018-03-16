/**
 * Created by benying.zou on 14.03.2018.
 */
Ext.define('WWS.ux.TimeNumberField', {
    extend: 'Ext.form.field.Text',
    xtype: 'timenumberfield',

    dataType: 'unknow',
    enableKeyEvents: true,

    listeners: {
        keyup: function (field) {
            var v = field.getValue();
            field.setValue(v.replace(/[\D]/g,''));
        },

        blur: function (field) {
            var v = field.getValue();
            field.setValue(Wiewind.Number.displayIntZerofill(v, 2));
        }
    },

    initComponent: function () {
        switch (this.dataType) {
            case 'hour':
                this.vtype = 'hour';
                break;
            case 'minute':
            case 'second':
                this.vtype = 'minuteAndSecond';
                break;
        }
        this.callParent();
    }
});