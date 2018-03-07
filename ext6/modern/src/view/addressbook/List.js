/**
 * Created by benying.zou on 06.03.2018.
 */
/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.addressbook.List', {
    extend: 'WWS.ux.List',
    xtype: 'addressbooklist',

    requires: [
        'WWS.view.addressbook.Detail',

        'WWS.view.addressbook.ListController',
        'WWS.view.addressbook.ListViewModel'
    ],
    controller: 'addressbooklist',
    viewModel: {
        type: 'addressbooklist'
    },

    bind: '{personstore}',

    config: {
        disableSelection: true,
        itemTpl: '<div><img src="'+Cake.image.path+'/person.png" /> <b>{name}</b></div>'
    },

    listeners: {
        itemtap: 'onItemTap'
    }
});