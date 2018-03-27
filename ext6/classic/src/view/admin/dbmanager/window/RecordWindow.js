/**
 * Created by benying.zou on 26.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.window.RecordWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'admindbmanagerwindowrecord',

    requires: [
        'WWS.view.admin.dbmanager.window.RecordWindowController',
        'WWS.view.admin.dbmanager.window.RecordWindowViewModel'
    ],
    controller: 'admindbmanagerwindowrecord',
    viewModel: {
        type: 'admindbmanagerwindowrecord'
    },

    input: {
        url: Cake.api.path + '/dbmanager/json/create'
    },

    config: {
        bind: {
            title: Wiewind.String.sprintf('{getTitle}', '{tablename}')
        },
        iconCls: Glb.btnSetting.newIconCls,
        maxHeight: 300,
        width: 600,
        scrollable: true
    },

    buildFormItems: function () {
        var me = this,
            vm = this.getViewModel(),
            dataConfig = vm.get('dataConfig'),
            formItems = [
                {
                    xtype: 'hiddenfield',
                    name: 'tablename',
                    bind: {
                        value: '{tablename}'
                    }
                }
            ];
        Ext.Object.each(dataConfig, function(key, value, myself) {
            if (!Wiewind.Array.in_array(key, ['id', 'created', 'created_by', 'modified', 'modified_by'])) {
                formItems.push(DMF.buildEditor(value, key));
            }
        });

        return formItems;
    },

    callbackFn: function () {}
});