/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',
    initComponent:
        function () {
            var me = this;
            if (!Ext.isEmpty(me.allowBlank) && me.allowBlank === false) {
                me.afterLabelTextTpl = '<span class="requiredAfterLabel">*</span>';
            }
            me.callParent();
        }
});