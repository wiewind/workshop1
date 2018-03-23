/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.customer.CustomerPanel', {
    extend: 'Ext.Panel',
    xtype: 'admincustomerpanel',

    requires: [
        'WWS.view.admin.customer.Functions',

        'WWS.view.admin.customer.CustomersGrid',
        'WWS.view.admin.customer.UsersGrid',
        'WWS.view.admin.customer.window.EditCustomerWindow',
        'WWS.view.admin.customer.window.EditUserWindow'
    ],

    config: {
        title: T.__("Customer Management"),
        icon: Cake.image.path+'/customer.png',
        layout: 'border',
        closable: true,
        bodyPadding: 10,
        border: 0
    },

    items: [
        {
            xtype: 'admincustomercustomersgrid',
            region: 'west',
            width: '20%',
            minWidth: 200,
            maxWidth: 600,
            border: '0 1px 0 0',
            collapsible: true,
            split: true
        },
        {
            xtype: 'container',
            itemId: 'admincustomersmainpanel',
            layout: 'fit',
            region: 'center',
            items: [
                {
                    padding: '20 0 0 0',
                    html: '<div style="font-size: 20px; font-weight: bold; color: gray; "><span class="x-fa fa-arrow-left"> ' + T.__('Please select a customer!') + '</div>'
                }
            ]
        }
    ]
});