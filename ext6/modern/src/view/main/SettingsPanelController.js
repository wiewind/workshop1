/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.SettingsPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainsettings',

    setLanguage: function (cmb) {
        var language = cmb.getValue();
        ABox.confirm(
            T.__("The page will automatically turn to the Home", SSD.config.languages[language].cake_code),
            function () {
                Ext.Ajax.request({
                    method: 'POST',
                    url: Cake.api.path + '/settings/json/setLanguage',
                    params: {
                        language: language
                    },
                    success: function (response, options) {
                        var res = Ext.decode(response.responseText);
                        if (res.success == true) {
                            location.reload();
                        }
                    }
                });
            }
        );
    },

    onClickLogout: function () {
        Glb.Ajax({
            url: Cake.api.path + '/login/json/doLogout',
            success: function () {
                ABox.success(Wiewind.String.sprintf(T.__('Bye %s!'), SSD.data.user.name));
                location.reload();
            }
        });
    },

    onClickLogin: function () {

    }
});
