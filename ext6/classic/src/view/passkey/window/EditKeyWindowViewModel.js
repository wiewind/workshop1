/**
 * Created by benying.zou on 01.03.2018.
 */
Ext.define('WWS.view.passkey.window.EditKeyWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.passkeywindoweditkey',

    data: {
        id: 0,
        title: ''
    },

    formulas: {
        isNew: function (get) {
            return get('id') <=0 ;
        },

        getTitle: function (get) {
            return get('isNew') ? T.__('New Passkey') : get('title');
        },

        hasUrl: function (get) {
            console.log(get('url').length);
            return get('url').length > 0;
        }
    }
});