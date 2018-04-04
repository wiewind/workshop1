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
        url: Cake.api.path + '/dbmanager/json/save'
    },

    config: {
        bind: {
            title: '{getTitle}'
        },
        maxHeight: 300,
        width: 600,
        scrollable: true
    },

    buildFormItems: function () {
        var me = this,
            vm = this.getViewModel(),
            dataConfig = vm.get('dataConfig'),
            keys = vm.get('keys');
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

            if (Wiewind.Array.in_array(key, keys) && !vm.get('newRocord')) {
                formItems.push({
                    xtype: 'hiddenfield',
                    name: 'conditions['+key+']',
                    value: vm.get(key)
                });
            }
        });

        formItems.push({
            xtype: 'hiddenfield',
            name: 'isNewRecord',
            bind: {
                value: '{newRocord}'
            }
        });

        return formItems;
    },

    callbackFn: function () {}
});