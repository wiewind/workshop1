/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.ux.ClearCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'clearcombo',

    width: 200,
    forceSelection: true,

    triggers: {
        foo: {
            cls: 'x-form-clear-trigger',
            weight: -1, // negative to place before default triggers
            handler: function() {
                var trigger1 = this.triggerEl.item(1),
                    formPanel = this.up('form');


                // Fetches "default" value for the combobox to switch back to
                if ( typeof this.valueOnTrigger1Click !== 'undefined' ) {
                    this.setValue(this.valueOnTrigger1Click);
                }
                else {
                    this.clearValue();
                    trigger1.hide();
                    trigger1.setWidth(0);
                }

                if ( typeof this.filterStore !== 'undefined' && this.filterStore === false ) {
                    return;
                }

                if ( typeof formPanel !== 'undefined' ) {
                    if ( typeof formPanel.filterTask !== 'undefined'
                        && formPanel.filterTask instanceof Ext.util.DelayedTask === true) {
                        formPanel.filterTask.delay(0);
                    }
                }
            }
        }
    },

    listeners: {
        afterrender: function (cmp) {
            var trigger1 = cmp.triggerEl.item(1);
            if (cmp.getValue() === null || cmp.getValue() === '') {
                trigger1.setWidth(0);
                trigger1.hide();
            }
        },
        select: function (combo) {
            var trigger2 = combo.triggerEl.item(0),
                trigger1 = combo.triggerEl.item(1),
                formPanel = combo.up('form');

            trigger1.show();
            trigger1.setWidth(trigger2.getWidth());

            if ( typeof combo.filterStore === 'undefined' && combo.filterStore === false ) {
                return true;
            }

            if (  typeof formPanel !== 'undefined' ) {
                if ( typeof formPanel.filterTask !== 'undefined'
                    && formPanel.filterTask instanceof Ext.util.DelayedTask === true) {

                    formPanel.filterTask.delay(0);
                }
            }
        },
        change: function(combo) {
            if ( combo.getValue() === null ) {
                var trigger1 = combo.triggerEl.item(1);
                if ( typeof combo.triggerEl !== 'undefined' ) {
                    trigger1.hide();
                    trigger1.setWidth(0);
                }
            }
        }
    }
});