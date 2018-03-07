/**
 * Created by benying.zou on 01.06.2017.
 */
Ext.define('WWS.overrides.picker.Picker', {
    override: 'Ext.picker.Picker',

    initialize: function (config) {
        this.initConfig(config);
        this.callParent(arguments);

        this.setDoneButton(T.__('Select'));
        this.setCancelButton(T.__('Cancel'));
    }
});