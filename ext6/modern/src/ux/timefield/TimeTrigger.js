/**
 * Created by benying.zou on 21.03.2017.
 */
Ext.define('WWS.ux.timefield.TimeTrigger', {
    extend: 'Ext.field.trigger.Trigger',
    xtype: 'timetrigger',
    alias: 'trigger.time',
    classCls: Ext.baseCSSPrefix + 'timetrigger',
    handler: 'onExpandTap',
    scope: 'this'
});