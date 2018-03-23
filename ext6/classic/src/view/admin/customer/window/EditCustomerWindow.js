/**
 * Created by benying.zou on 22.03.2018.
 */
/**
 * Created by benying.zou on 06.12.2016.
 */
Ext.define ('WWS.view.admin.customer.window.EditCustomerWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'admincustomerwindoweditcustomer',

    requires: [
        'WWS.view.admin.customer.window.EditCustomerWindowController',
        'WWS.view.admin.customer.window.EditCustomerWindowViewModel'
    ],
    controller: 'admincustomerwindoweditcustomer',
    viewModel: {
        type: 'admincustomerwindoweditcustomer'
    },

    input: {
        url: Cake.api.path + '/customers/json/save'
    },

    config: {
        bind: {
            title: '{getTitle}'
        },
        iconCls: 'x-fa fa-users',
        width: 500
    },

    configForm: function () {
        return {
            defaults: {
                width: '100%',
                labelWidth: 70,
                padding: 5
            }
        };
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'hiddenfield',
                name: 'id',
                bind: {
                    value: '{id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: T.__("Name"),
                emptyText: T.__("Name of Customer"),
                allowBlank: false,
                bind: {
                    value: '{name}'
                },
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'displayfield',
                        labelWidth: 70,
                        fieldLabel: T.__("Address")
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        layout: 'vbox',
                        defaults: {
                            xtype: 'fieldcontainer',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                padding: '5 0'
                            }
                        },
                        items: [
                            {
                                items: [
                                    {
                                        name: 'data[street]',
                                        flex: 1,
                                        emptyText: T.__("Street"),
                                        bind: {
                                            value: '{street}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter'
                                        }
                                    },
                                    {
                                        name: 'data[no]',
                                        width: 50,
                                        emptyText: T.__("No."),
                                        bind: {
                                            value: '{no}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter'
                                        }
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        name: 'data[postcode]',
                                        width: 120,
                                        emptyText: T.__("Postcode"),
                                        bind: {
                                            value: '{postcode}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter'
                                        }
                                    },
                                    {
                                        name: 'data[town]',
                                        flex: 1,
                                        emptyText: T.__("Town"),
                                        bind: {
                                            value: '{town}'
                                        },
                                        listeners: {
                                            specialkey: 'submitOnEnter'
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ]

            }
        ];
    },

    callbackFn: function (data) {}
});