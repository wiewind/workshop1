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
        'Ext.chart.*',


        'WWS.overrides.form.field.Base',
        'WWS.overrides.button.Button',

        'WWS.ux.Ckeditor',
        'WWS.ux.ClearCombo',
        'WWS.ux.ClearDate',
        'WWS.ux.SearchText',
        'WWS.ux.MultiFileField',
        'WWS.ux.MusterForm',
        'WWS.ux.MusterFormWindow',
        'WWS.ux.PhotoField',
        'WWS.ux.UploadPhotoWindow',
        'WWS.ux.TimeNumberField',

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
        'WWS.view.admin.customer.CustomerPanel',
        'WWS.view.admin.dbmanager.DbmanagerPanel',
        'WWS.view.admin.backup.BackupPanel',
        'WWS.view.jobapplications.JobapplicationsPanel',

        'WWS.view.setting.LoginWindow',
        'WWS.view.setting.ForgotPasswordWindow',
        'WWS.view.setting.UserInfoWindow'
    ],

    controller: 'main',
    viewModel: 'main',

    wtype: 'classic',

    config: {
        id: 'appmain',
        layout: 'border'
    },

    initComponent: function () {
        Ext.tip.QuickTipManager.init();

        CKEDITOR.config.language = SSD.data.appLanguage.ext_localname;

        this.items = this.buildItems();


        Ext.apply(Ext.form.field.VTypes, {
            fileTypeAndSize : function(val, field){
                var upload = field.fileInputEl.dom,
                    files = upload.files;

                for (var i = 0; i < files.length; i++) {
                    var message = '',
                        suffix = Wiewind.File.getFileSuffix(files[i].name);
                    if (Wiewind.Array.in_array(suffix, Cake.filemanagement.notAllowdTypes)) {
                        return false;
                    }
                    if (files[i].size > Cake.filemanagement.maxFileSize) {
                        return false;
                    }
                }
                return true;
            },
            fileTypeAndSizeText: T.__("File is invalidate."),

            foldername : function(val, field){
                var reg= /^[^\\\/\*\?\|<>:'"]+$/;
                return (val!=='.')&&(val!=='..')&&(reg.test(val));
            },
            foldernameText: T.__("The name of folder or file is invalidate."),

            hour: function (val, field) {
                return val >= 0 && val <= 24;
            },
            hourText: T.__('The input of hour must be between 0 and 24.'),

            minuteAndSecond: function (val, field) {
                return val >= 0 && val < 60;
            },
            minuteAndSecondText: T.__('The input of minute and second must be between 0 and 59.')
        });


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
