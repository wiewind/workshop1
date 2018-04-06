/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define ('WWS.view.search.EditHotlineWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'searchedithotlinewindow',

    requires: [
        'WWS.view.search.EditHotlineWindowController',
        'WWS.view.search.EditHotlineWindowViewModel'
    ],
    controller: 'searchedithotlinewindow',
    viewModel: {
        type: 'searchedithotlinewindow'
    },

    config: {
        bind: {
            title: '{showTitle}'
        },
        iconCls: 'x-fa fa-edit',
        width: 900,
        defaults: {
            width: '100%'
        }
    },

    input: {
        url: Cake.api.path + '/SearchPage/json/saveHotlink'
    },

    buildToolbar: function() {
        var defaultButtons = this.getButtomItems(),
            buttons = [
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: Glb.btnSetting.deleteIconCls2,
                    bind: {
                        hidden: '{id == 0}'
                    },
                    handler: 'onClickDelete'
                }
            ];

        for (var i=0; i<defaultButtons.length; i++) {
            buttons.push(defaultButtons[i]);
        }

        this.buttons = buttons;
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
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {
                    margin: 5,
                    labelAlign: 'top'
                },
                items: [

                    {
                        xtype: 'textfield',
                        fieldLabel: T.__('Title'),
                        emptyText: T.__('Please enter a title'),
                        name: 'title',
                        bind: {
                            value: '{title}'
                        },
                        flex: 1,
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: T.__('Side'),
                        name: 'seite',
                        bind: {
                            value: '{seite}'
                        },
                        width: 100,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {value:"r", name: T.__('right side')},
                                {value:"l", name: T.__('left side')}
                            ]
                        }),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        editable: false,
                        bind: {
                            value: '{seite}'
                        },
                        allowBlank: false
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: T.__('Sort'),
                        name: 'sort',
                        bind: {
                            value: '{sort}'
                        },
                        width: 100,
                        allowBlank: false
                    }
                ]
            },
            {
                xtype: 'textarea',
                name: 'text',
                fieldStyle: 'padding: 10px; line-height: 150%;',
                height: 400,
                inputAttrTpl: 'wrap="off"',
                bind: {
                    value: '{text}'
                }
            }
        ];
    }
});