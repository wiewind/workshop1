/**
 * Created by benying.zou on 01.03.2018.
 */
Ext.define('WWS.view.passkey.window.EditGroupWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.passkeywindoweditgroup',

    data: {
        id: 0
    },

    formulas: {
        isNew: function (get) {
            return get('id') <=0 ;
        },

        getTitle: function (get) {
            return get('isNew') ? T.__('New Group') : T.__('Group');
        }
    }
});