/**
 * Created by benying.zou on 23.03.2018.
 */
Ext.define ('WWS.view.admin.dbmanager.NaviPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.admindbmanagernavipanel',

    onItemSelect: function (grid, record, item, index, e) {
        var view = this.getView(),
            vm = this.getViewModel(),
            tablename = record.get('name');

        Glb.Ajax({
            url: Cake.api.path + '/dbmanager/json/getTableInfo/',
            params: {
                tablename: tablename
            },
            success: function (response, options) {
                var result = Ext.decode(response.responseText),
                    ctr = view.up().down('[itemId="dbmanagerMainPanel"]'),
                    dataConfig = result.data,
                    keys = [];
                Ext.Object.each(dataConfig, function(key, value, myself) {
                    if (value.key === 'primary') {
                        keys.push(key);
                    }
                });

                ctr.removeAll();
                ctr.add({
                    xtype: 'admindbmanagertablegrid',
                    viewModel: {
                        data: {
                            tablename: tablename,
                            dataConfig: dataConfig,
                            keys: keys
                        }
                    }
                });
            }
        });
    }

});