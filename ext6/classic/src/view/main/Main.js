/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WWS.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'WWS.overrides.form.field.Base',

        'WWS.ux.Ckeditor',
        'WWS.ux.ClearCombo',
        'WWS.ux.ClearDate',
        'WWS.ux.SearchText',
        'WWS.ux.MultiFileField',
        'WWS.ux.MusterForm',
        'WWS.ux.MusterFormWindow',

        'WWS.view.main.MainController',
        'WWS.view.main.MainModel',
        'WWS.view.main.HeaderPanel',
        'WWS.view.main.FooterPanel',

        'WWS.view.search.SearchPanel',
        'WWS.view.worknotes.WorknotesPanel',
        'WWS.view.filemanagement.FilemanagementPanel',
        'WWS.view.passkey.PasskeyPanel',
        'WWS.view.addressbook.AddressbookPanel',
        'WWS.view.school.SchoolPanel',

        'WWS.view.setting.LoginWindow',
        'WWS.view.setting.ForgotPasswordWindow',
        'WWS.view.setting.UserInfoWindow'
    ],

    controller: 'main',
    viewModel: 'main',

    config: {
        id: 'appmain',
        layout: 'border'
    },

    initComponent: function () {
        Ext.tip.QuickTipManager.init();

        CKEDITOR.config.language = SSD.data.appLanguage.ext_localname;

        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        Ext.ariaWarn = Ext.emptyFn; // disable aria warning
        var firstModule = SSD.data.userModules[0],
            items = [
                {
                    xtype: 'appheader',
                    region: 'north'
                },
                {
                    xtype: 'appfooter',
                    region: 'south'
                },
                {
                    xtype: 'tabpanel',
                    id: 'mainTabpanel',
                    region: 'center',
                    border: 0,
                    bodyStyle: {
                        background: '#dfe9f6'
                    },
                    defaults: {
                        border: 0
                    },
                    items: [
                        Ext.create('WWS.view.' + firstModule + '.' + Wiewind.String.ucfirst(firstModule) + 'Panel')
                    ]
                }
            ];

        return items;
    }
});
