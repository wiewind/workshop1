/**
 * Created by benying.zou on 20.03.2017.
 */
Ext.define('WWS.ux.timefield.TimePickerField', {
    extend: 'Ext.field.Picker',
    alternateClassName: 'Ext.field.TimePicker',
    xtype: ['timefield', 'timepickerfield'],

    requires: [
        'WWS.ux.timefield.TimeTrigger',
        'WWS.ux.timefield.TimePicker',
        'Ext.panel.Date'
    ],

    config: {
        // picker: 'auto',
        destroyPickerOnHide: false,
        triggers: {
            expand: {
                type: 'time',
                focusOnMousedown: true
            }
        }
    },

    classCls: Ext.baseCSSPrefix + 'timepickerfield',

    matchFieldWidth: false,
    minDateMessage: T.__("The time in this field must be equal to or later than {0}"),
    maxDateMessage: T.__("The time in this field must be equal to or earlier than {0}"),

    floatedPicker: {
        xtype: 'datepanel',
        autoConfirm: true,
        floated: true,
        listeners: {
            tabout: 'onTabOut',
            scope: 'owner'
        },
        keyMap: {
            ESC: 'onTabOut',
            scope: 'owner'
        }
    },

    edgePicker: {
        xtype: 'timepicker'
    },

    validat: function (value) {
        var vtime = value.split(':');
        return vtime.length === 2;
    },

    parse: function (value) {
        if (value) {
            var vtime = value.split(':');
            if (vtime.length === 2) {
                return Wiewind.Number.displayIntZerofill(vtime[0], 2) + ':' + Wiewind.Number.displayIntZerofill(vtime[1], 2);
            }
        }
        return '00:00';
    },

    applyValue: function(value, oldValue) {
        value = this.parse(value);
        if (value === oldValue) {
            value = undefined;
        }

        return value;
    },

    updateValue: function(value, oldValue) {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            this.updatePickerValue(picker, value);
        }

        this.callParent([value, oldValue]);
    },

    updatePickerValue: function (picker, value) {
        picker.setValue(value);
    },

    applyInputValue: function(value, oldValue) {
        value = this.parse(value);
        return this.callParent([value, oldValue]);
    },

    /**
     * Returns the {@link Date} value of this field.
     * If you wanted a formatted date use the {@link #getFormattedValue} method.
     *
     * @return {Date} The date selected
     */
    getValue: function() {
        return this._value;
    },

    applyPicker: function(picker) {
        picker = this.callParent([picker]);

        this.pickerType = picker.xtype === 'timepicker' ? 'edge' : 'floated';
        picker.ownerCmp = this;
        picker.on('change', 'onPickerChange', this);

        return picker;
    },

    createFloatedPicker: function() {
        return this.getFloatedPicker();
    },

    createEdgePicker: function() {
        return this.getEdgePicker();
    },

    setPickerLocation: function(fromKeyboard) {
        var me = this,
            pickerType = me.pickerType,
            picker = me.getPicker(),
            value = me.getValue(),
            limit;

        me.$ignorePickerChange = true;
        if (value != null) {
            picker.setValue(value);
        }
        else if (pickerType === 'edge') {
            picker.setValue(new Date());
        }
        delete me.$ignorePickerChange;

        if (pickerType === 'floated') {
            picker.el.dom.tabIndex = -1;

            limit = me.getMinDate();

            if (limit) {
                picker.setMinDate(limit);
            }

            limit = me.getMaxDate();

            if (limit) {
                picker.setMaxDate(limit);
            }

            value = value || new Date();

            // Ensure the carousel is at the correct position wth no animation.
            picker.navigateTo(value, false);

            if (fromKeyboard) {
                // Focus the value cell
                picker.setFocusedDate(value);
            }
        }
    },

    /**
     * Called when the picker changes its value.
     * @param {Ext.picker.Date} picker The date picker.
     * @param {Object} value The new value from the date picker.
     * @private
     */
    onPickerChange: function(picker, value) {
        var me = this;

        if (me.$ignorePickerChange) {
            return;
        }

        me.setValue(value);
        me.fireEvent('select', me, value);

        // Focus the inputEl first and then collapse. We configure
        // the picker not to revert focus which is a normal thing to do
        // for floaters; in our case when the picker is focusable it will
        // lead to unexpected results on Tab key presses.
        // Note that this focusing might happen synchronously during Tab
        // key handling in the picker, which is the way we want it.
        me.onTabOut(picker);
    },

    onTabOut: function() {
        this.inputElement.focus();
        this.collapse();
    },

    doDestroy: function() {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            picker.destroy();
        }

        this.callParent();
    }
});