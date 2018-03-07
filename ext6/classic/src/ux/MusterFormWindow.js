/**
 * Abstract form window
 */
Ext.define('WWS.ux.MusterFormWindow', {
	extend: 'Ext.window.Window',

    requires: [
        'WWS.ux.MusterFormWindowController',
        'WWS.ux.MusterFormWindowViewModel'
    ],
    controller: 'musterformwindow',

    viewModel: {
        type: 'musterformwindow'
    },

    config: {
        layout: 'fit',
        minWidth: 100,
        minHeight: 100,
        modal: true,
        bodyBorder: 0,
        autoShow: true
    },

    setting: Glb.formSetting,

    initComponent: function () {
        var me = this;

        Ext.apply(me.setting, {
            submitText: Glb.btnSetting.saveText,
            submitIconCls: Glb.btnSetting.saveIconCls,
            closeText: Glb.btnSetting.cancelText,
            closeIconCls: Glb.btnSetting.cancelIconCls
        });
        if (!Wiewind.isEmpty(me.input)) {
            Ext.apply(me.setting, me.input);
        }

        this.items = [
            Ext.apply({
                xtype: 'form',
                bodyCls: 'windowform',
                bodyPadding: 10,
                border: 0,
                layout: 'vbox',
                scrollable: true,
                items: me.buildFormItems(),
                onSubmit: 'onSubmit',
                defaults: {
                    width: '100%',
                    padding: 5
                }
            }, this.configForm())
        ];
        this.buildToolbar();

        this.callParent();
    },

    configForm: function () {
        return {};
    },

    buildFormItems: function () {},

    buildToolbar: function() {
        this.buttons = this.getButtomItems();
    },

    getButtomItems: function() {
        var data = this.setting;
        return [
            '->',
            {
                text: data.submitText,
                tooltip: data.submitText,
                iconCls: data.submitIconCls,
                handler: 'onSubmit'
            },
            {
                text: data.closeText,
                tooltip: data.closeText,
                iconCls: data.closeIconCls,
                handler: 'onClose'
            }
        ];
    }
});