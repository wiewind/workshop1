
Ext.define('WWS.ux.timefield.TimePicker', {
    extend: 'Ext.picker.Picker',
    xtype: 'timepicker',
    alternateClassName: 'Ext.picker.Time',
    requires: ['Ext.util.InputBlocker'],

    config: {
        slotOrder: ['hour', 'minute'],
        useTitles: true,
        doneButton: T.__('Select'),
        cancelButton: T.__('Cancel'),
        hourText: T.__('Stunde'),
        minuteText: T.__('Minute')
    },

    initialize: function() {
        var me = this;
        me.callParent();

        me.on({
            scope: me,
            delegate: '> slot',
            slotpick: me.onSlotPick
        });

        me.on({
            scope: me,
            show: me.onSlotPick
        });
    },

    setValue: function(value, animated) {
        if (!value) {
            value = '00:00';
        }
        if (typeof value === 'string') {
            var vtime = value.split(':');
            value = {
                hour: Wiewind.Number.displayIntZerofill(vtime[0], 2),
                minute: Wiewind.Number.displayIntZerofill(vtime[1], 2)
            };
        }
        this.callParent([value, animated]);
        this.onSlotPick();
    },

    getValue: function(useDom) {
        var values = {},
            items = this.getItems().items,
            ln = items.length,
            hour, minute, item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.isSlot) {
                values[item.getName()] = item.getValue(useDom);
            }
        }

        if (values.hour === null && values.minute === null) {
            return null;
        }

        hour = values.hour;
        minute = values.minute;

        return hour + ':' + minute;
    },

    /**
     * Updates the hourText configuration
     */
    updateHourText: function(newText, oldText) {
        var innerItems = this.getInnerItems,
            ln = innerItems.length,
            item, i;

        //loop through each of the current items and set the title on the correct slice
        if (this.initialized) {
            for (i = 0; i < ln; i++) {
                item = innerItems[i];

                if ((typeof item.title == "string" && item.title == oldText) || (item.title.html == oldText)) {
                    item.setTitle(newText);
                }
            }
        }
    },

    /**
     * upates the {@link #minuteText} configuration.
     */
    updateMinuteText: function(newText, oldText) {
        var innerItems = this.getInnerItems,
            ln = innerItems.length,
            item, i;

        //loop through each of the current items and set the title on the correct slice
        if (this.initialized) {
            for (i = 0; i < ln; i++) {
                item = innerItems[i];

                if ((typeof item.title == "string" && item.title == oldText) || (item.title.html == oldText)) {
                    item.setTitle(newText);
                }
            }
        }
    },

    /**
     * @private
     */
    constructor: function() {
        this.callParent(arguments);
        this.createSlots();
    },

    /**
     * Generates all slots for all years specified by this component, and then sets them on the component
     * @private
     */
    createSlots: function() {
        var me        = this,
            slotOrder = me.getSlotOrder(),
            hours      = [],
            minutes    = [],
            ln, i;

        for (i=0; i<24; i++) {
            hours.push({
                text: Wiewind.Number.displayIntZerofill(i, 2),
                value: Wiewind.Number.displayIntZerofill(i, 2)
            });
        }
        for (i=0; i<60; i++) {
            minutes.push({
                text: Wiewind.Number.displayIntZerofill(i, 2),
                value: Wiewind.Number.displayIntZerofill(i, 2)
            });
        }

        var slots = [
            {
                name: 'hour',
                align: 'center',
                data: hours,
                title: this.getHourText(),
                flex: 2
            },
            {
                name: 'minute',
                align: 'center',
                data: minutes,
                title: this.getMinuteText(),
                flex: 2
            }
        ];

        me.setSlots(slots);

        // if a value was set by the constructor config, we need
        // to adjust the slots after they have been created
        if (!me.getValue() && me._value) {
            me.setValue(me._value);
        }
    },

    onSlotPick: function() {
        this.callParent(arguments);
    },

    onDoneButtonTap: function() {
        var oldValue = this._value,
            newValue = this.getValue(true);

        if (newValue != oldValue) {
            this.fireEvent('change', this, newValue);
        }

        this.hide();
        Ext.util.InputBlocker.unblockInputs();
    }
});