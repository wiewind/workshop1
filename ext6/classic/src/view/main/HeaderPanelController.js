/**
 * Created by benying.zou on 31.01.2018.
 */
Ext.define('WWS.view.main.HeaderPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainheaderpanel',

    setLanguage: function (btn) {
        language = btn.lang_id;
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

    openModule: function (btn) {
        var module = btn.module.split('/'),
            panel = Ext.ComponentQuery.query(module[0] + 'panel'),
            tabPanel = Ext.getCmp('mainTabpanel');
        if (panel.length === 0) {
            panel = Ext.create('WWS.view.' + module[0] + '.' + Wiewind.String.ucfirst(module[0]) + 'Panel');
            tabPanel.add(panel);
        } else {
            panel = panel[0];
        }

        if (!Ext.isEmpty(module[1])) {
            var panel_1 = Ext.getCmp(module[0] + module[1] + 'Panel'),
                tabPanel_1 = panel;
            if (panel_1.length === 0) {
                panel_1 = Ext.create('WWS.view.' + module[0] + '.' + module[1] + '.' + Wiewind.String.ucfirst(module[1]) + 'Panel', {
                    closable: true
                });
                tabPanel_1.add(panel_1);
            } else {
                panel_1 = panel[0];
            }
            tabPanel_1.setActiveTab(panel_1);
        }
        tabPanel.setActiveTab(panel);
    },

    openLoginWindow: function () {
        Ext.create('WWS.view.setting.LoginWindow');
    },

    onChangeEngine: function (btn) {
        var top = btn.up('button');
        top.setIcon(btn.icon32);
        top.value = btn.engine;
    },

    onSearch: function () {
        var view = this.getView(),
            params = view.getValues(),
            engineBtn = view.down('[name="engine"]');
        if (engineBtn.value === 'google') {
            this.onGoogleSearch();
        } else {
            this.onBaiduSearch();
        }
    },

    onGoogleSearch: function () {
        var view = this.getView(),
            params = view.getValues(),
            form = view.getForm();
        form.doAction('standardsubmit', {
            target : '_blank',
            method : 'GET',
            params: {
                q: params['searchtext'],
                hl: params['searchlanguage'],
                lr: 'lang_' + params['searchlanguage']
            },
            standardSubmit:true,
            url : 'https://www.google.com/search'
        });
    },

    onBaiduSearch: function () {
        var view = this.getView(),
            params = view.getValues(),
            form = view.getForm();
        form.doAction('standardsubmit', {
            target : '_blank',
            method : 'GET',
            params: {
                wd: params['searchtext']
            },
            standardSubmit:false,
            url : 'https://www.baidu.com/s'
        });
    },

    onClickUserInfo: function () {
        Ext.create('WWS.view.setting.UserInfoWindow');
    },

    onClickLogout: function () {
        Glb.Ajax({
            url: Cake.api.path + '/login/json/doLogout',
            success: function () {
                ABox.success(Wiewind.String.sprintf(T.__('Bye %s!'), SSD.data.user.name), function () {
                    location.reload();
                });
            }
        });
    },

    onClickUpdate: function () {
        Wiewind.Action.click({
            url: '../../update',
            target: '_blank'
        })
    }
});