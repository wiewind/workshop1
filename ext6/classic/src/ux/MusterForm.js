/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define('WWS.ux.MusterForm', {
    extend: 'Ext.form.Panel',
    xtype: 'musterform',

    requires: [
        'WWS.ux.MusterFormController',
        'WWS.ux.MusterFormViewModel'
    ],
    controller: 'musterform',

    viewModel: {
        type: 'musterform'
    },

    config:{
        // bodyCls: 'windowform',
        bodyPadding: 10
    },

    setting: Glb.formSetting,

    initComponent: function () {
        var me = this;

        if (!Wiewind.isEmpty(me.input)) {
            Ext.apply(me.setting, me.input);
        }

        this.callParent();
    }
});
