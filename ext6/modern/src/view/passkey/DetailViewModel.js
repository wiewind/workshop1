/**
 * Created by benying.zou on 02.03.2018.
 */
Ext.define('WWS.view.passkey.DetailViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.passkeydetail',

    data: {},

    formulas: {
        showUrl: function (get) {
            if (get('url')) {
                return '<a href="' + get('url') + '" target="_blank">' + get('url') + '</a>';
            }
            return '';
        },
        showPassword: function (get) {
            var t = '',
                pass = get('password');
            if (pass) {
                var t = '';
                for (var i=0; i<pass.length; i++) {
                    t += '*';
                }
            }
            return t;
        }
    }
});