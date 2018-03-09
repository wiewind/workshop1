/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('WWS.Application', {
    extend: 'Ext.app.Application',

    name: 'WWS',

    requires: [
        'WWS.utils.Global',
        'WWS.model.*',
        'WWS.store.*',

        'WWS.ux.AMessageBox',

        'WWS.view.main.Main'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    launch: function () {
        // Ext.tip.QuickTipManager.init();
        // WWS.currentLocale = 'de';


        Ext.History.init();
        Ext.History.on('change', Glb.History.onChange);

        $('#welcome_box').html('');
        $('#welcome_box').hide();

        // if (Glb.common.checkLogin()) {
        //     var timerId = null;
        //
        //     timerId = window.setInterval(function () {
        //         if (SSD) {
        //             Glb.Ajax({
        //                 url: Cake.api.path + '/system/json/keeplive',
        //                 timerId: timerId
        //             });
        //         }
        //     }, 60000);
        // }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
