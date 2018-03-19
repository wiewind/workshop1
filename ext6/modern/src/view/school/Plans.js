/**
 * Created by benying.zou on 19.03.2018.
 */
Ext.define('WWS.view.school.Plans', {
    extend: 'Ext.Panel',
    xtype: 'schoolplans',

    requires: [
        'WWS.view.school.PlansController',
        'WWS.view.school.PlansViewModel'
    ],
    controller: 'schoolplans',
    viewModel: {
        type: 'schoolplans'
    },

    config: {
        // title: T.__("Time Plan"),
        // iconCls: 'x-fa fa-clock-o',
        layout: 'hbox'
    },

    listeners: {
        activate: Glb.History.add
    }
});