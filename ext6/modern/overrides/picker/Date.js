/**
 * Created by benying.zou on 01.06.2017.
 */
Ext.define('WWS.overrides.picker.Date', {
    override: 'Ext.picker.Date',

    config: {
        useTitles: true
    },

    initialize: function (config) {
        this.initConfig(config);

        this.setDayText( T.__('Day'));
        this.setMonthText( T.__('Month'));
        this.setYearText( T.__('Year'));

        this.setDoneButton( T.__('Select'));
        this.setCancelButton( T.__('Cancel'));

        switch (SSD.data.appLanguage.code) {
            case 'cn':
                this.setSlotOrder([
                    'year',
                    'month',
                    'day'
                ]);
                break;
            case 'de':
                this.setSlotOrder([
                    'day',
                    'month',
                    'year'
                ]);
                break;
            default:
                this.setSlotOrder([
                    'month',
                    'day',
                    'year'
                ]);
                break;
        }

        this.callParent(arguments);
    }
});