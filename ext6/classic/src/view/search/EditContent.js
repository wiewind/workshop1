/**
 * Created by benying.zou on 06.02.2018.
 */
Ext.define ('WWS.view.search.EditContent', {
    extend: 'WWS.ux.MusterForm',
    xtype: 'searcheditcontent',

    requires: [
        'WWS.view.search.EditContentController',
        'WWS.view.search.EditContentViewModel'
    ],

    controller: 'searcheditcontent',
    viewModel: {
        type: 'searcheditcontent'
    },

    config: {
        iconCls: 'x-fa fa-edit',
        layout: 'vbox',
        bodyPadding: 10
    },

    input: {
        url: Cake.api.path + '/SearchPage/json/savePage'
    },

    bind: {
        title: T.__('Edit') + ': {title}'
    },

    defaults: {
        width: '100%'
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {
                    margin: 5,
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id',
                        bind: {
                            value: '{id}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: T.__('Title'),
                        emptyText: T.__('Please enter a title'),
                        name: 'title',
                        bind: {
                            value: '{title}'
                        },
                        width: 200,
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
                    },
                    {
                        xtype: 'checkbox',
                        name : 'publish',
                        fieldLabel: T.__('Publish'),
                        inputValue: 1,
                        uncheckedValue: 0,
                        bind: {
                            value: '{publish}'
                        }
                    },
                    {
                        xtype: 'component',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        margin: '35 5 5 5',
                        text: Glb.btnSetting.saveText,
                        tooltip: Glb.btnSetting.saveText,
                        iconCls: Glb.btnSetting.saveIconCls,
                        handler: 'onSubmit'
                    },
                    {
                        xtype: 'button',
                        margin: '35 5 5 5',
                        text: Glb.btnSetting.cancelText,
                        tooltip: Glb.btnSetting.cancelText,
                        iconCls: Glb.btnSetting.cancelIconCls,
                        handler: 'onCancel'
                    }
                ]
            },
            {
                xtype: 'container',
                height: 600,
                region: 'center',
                layout: 'fit',
                reference: 'ckeditorCtn'
            }
        ];
        this.callParent();
    },

    buildCkeditor: function () {
        var cp = {
            xtype: 'ckeditor',
            name: 'text',
            border: 0,
            fieldLabel: null,
            padding: '5',
            fieldStyle: 'padding: 5px;',
            inputAttrTpl: 'wrap="off"',
            CKConfig: {
                baseFloatZIndex: 99999,
                value: this.getViewModel().get('text')
            }
        };

        this.lookupReference('ckeditorCtn').add(cp);
    }

});