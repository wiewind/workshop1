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
        bind: {
            title: T.__('Edit') + ': {title}'
        },
        iconCls: 'x-fa fa-edit',
        layout: 'vbox',
        bodyPadding: 10,
        border: 1,
        defaults: {
            width: '100%'
        }
    },

    input: {
        url: Cake.api.path + '/SearchPage/json/savePage'
    },

    bbar: [
        '->',
        {
            text: Glb.btnSetting.deleteText,
            tooltip: Glb.btnSetting.deleteText,
            iconCls: Glb.btnSetting.deleteIconCls2,
            bind: {
                hidden: '{id == 0}'
            },
            handler: 'onClickDelete'
        }
    ],

    tools: [
        {
            type: 'close',
            tooltip: Glb.btnSetting.cancelText,
            handler: 'onCancel'
        }
    ],

    items: [
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: {
                margin: '5 50 5 5',
                labelWidth: 70
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
                    flex: 1,
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: T.__('Sort'),
                    name: 'sort',
                    bind: {
                        value: '{sort}'
                    },
                    width: 150,
                    allowBlank: false
                },
                {
                    xtype: 'checkbox',
                    name : 'publish',
                    boxLabel: T.__('Publish'),
                    inputValue: 1,
                    uncheckedValue: 0,
                    bind: {
                        value: '{publish}'
                    }
                },
                {
                    xtype: 'button',
                    text: Glb.btnSetting.saveText,
                    tooltip: Glb.btnSetting.saveText,
                    iconCls: Glb.btnSetting.saveIconCls,
                    margin: 5,
                    handler: 'onSubmit'
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
    ],

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