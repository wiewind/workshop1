/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.customer.window.ChangeUsernameWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',

    alias: 'viewmodel.admincustomerwindowchangeusername',

    data: {
        id: 0,
        username: '',
        new_username: ''
    }
});