/**
 * Created by benying.zou on 22.02.2018.
 */

Ext.define('WWS.view.main.MainContainer', {
    extend: 'Ext.Container',
    xtype: 'maincontainer',

    requires: [
        'WWS.view.search.SearchPanel',
        'WWS.view.worknotes.WorknotesPanel',
        'WWS.view.filemanagement.FilemanagementPanel',
        'WWS.view.passkey.PasskeyPanel',
        'WWS.view.addressbook.AddressbookPanel',

        'WWS.view.main.MainContainerController'
    ],

    controller: 'maincontainer',

    config: {
        id: 'maincontainer',
        iconCls: 'x-fa fa-home',
        layout: 'card'
    }
});