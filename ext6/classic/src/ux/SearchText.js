/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.ux.SearchText', {
    extend: 'Ext.form.field.Text',
    xtype: 'searchfield',

    cancelText: T.__('Cancel'),
    searchText: T.__('Search'),
    showCancel: true,

    initComponent: function () {
        var me = this;
        this.setTriggers({
            undo: {
                cls: 'x-form-clear-trigger',
                tooltip: me.cancelText,
                hidden: !me.showCancel,
                handler: me.onClickCancel
            },
            search: {
                cls: 'x-form-search-trigger',
                tooltip: me.searchText,
                handler: me.onClickSearch
            }
        });

        if (this.showCancel) {
            Ext.apply(this, {
                listeners: {
                    afterrender: function (cmp) {
                        var trigger1 = cmp.triggerEl.item(0);
                        if (cmp.getValue() === null || cmp.getValue() === '') {
                            trigger1.hide();
                        } else {
                            trigger1.show();
                        }
                    },
                    change: function (cmp) {
                        var trigger1 = cmp.triggerEl.item(0);
                        if (cmp.getValue() === null || cmp.getValue() === '') {
                            trigger1.setWidth(0);
                            trigger1.hide();
                        } else {
                            trigger1.show();
                        }
                    }
                }
            });
        }

        this.callParent();
    },

    onClickCancel: function (field) {
        field.setValue('');
    },

    onClickSearch: function (field) {}
});