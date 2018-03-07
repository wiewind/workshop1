Ext.define('WWS.ux.ClearDate', {
	extend: 'Ext.form.field.Date',
	xtype: 'cleardate',
	config: {},

	width: 200,
	forceSelection: true,

	triggers: {
		foo: {
			cls: 'x-form-clear-trigger',
			weight: -1, // negative to place before default triggers
			handler: function() {
				var trigger1 = this.triggerEl.item(1),
					formPanel = this.up('form'),
					field;

				this.reset();
				this.validate();
				this.setValue(null);

				// Update the referenced field data picker to allow
				// selection of min/max values again
				if ( typeof this.endDateField !== 'undefined' ) {
					field = formPanel.down('#'+this.endDateField);
					field.setMinValue(null);
					field.validate();
				}else if ( typeof this.startDateField !== 'undefined' ) {
					field = formPanel.down('#'+this.startDateField);
					field.setMaxValue(null);
					field.validate();
				}

				trigger1.hide();
				trigger1.setWidth(0);

				if (typeof formPanel.filterTask !== 'undefined'
					&& formPanel.filterTask instanceof Ext.util.DelayedTask === true) {

					formPanel.filterTask.delay(0);
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
		blur: function (combo) {

			if(combo.getValue() !== null){
				var trigger2 = combo.triggerEl.item(0),
					trigger1 = combo.triggerEl.item(1),
					formPanel = combo.up('form');

				trigger1.show();
				trigger1.setWidth(trigger2.getWidth());

				if (typeof formPanel.filterTask !== 'undefined'
					&& formPanel.filterTask instanceof Ext.util.DelayedTask === true) {
					formPanel.filterTask.delay(0);
				}
			}
		},
		select: function (combo) {
			var trigger2 = combo.triggerEl.item(0),
				trigger1 = combo.triggerEl.item(1),
				formPanel = combo.up('form');

			trigger1.show();
			trigger1.setWidth(trigger2.getWidth());

			if (typeof formPanel.filterTask !== 'undefined'
				&& formPanel.filterTask instanceof Ext.util.DelayedTask === true) {

				formPanel.filterTask.delay(0);
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