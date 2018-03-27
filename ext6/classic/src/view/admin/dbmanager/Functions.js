/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define('WWS.view.admin.dbmanager.Functions', {
    singleton: true,
    alternateClassName: ['DMF'],

    buildEditor: function (field, lable) {
        var editor;
        switch (field.type ) {
            case 'boolean':
                editor = {
                    xtype: 'combobox',
                    store: Ext.create('Ext.data.Store', {
                        fields: [
                            {name: 'name'},
                            {name: 'value'}
                        ],
                        data : [
                            {name: 'true', value: true},
                            {name: 'false', value: false}
                        ]

                    }),
                    queryMode: 'local',
                    valueField: 'value',
                    displayField: 'name',
                    allowBlank: field.null
                };
                break;
            case 'text':
                editor = {
                    xtype: 'textareafield',
                    allowBlank: field.null
                };
                break;
            default:
                editor = {
                    xtype: 'textfield',
                    allowBlank: field.null
                };
                break;
        }
        if (lable) {
            editor = Ext.apply({
                name: lable,
                hiddenName: lable,
                fieldLabel: lable,
                labelStyle: 'font-weight: bold; padding: 5px',
                padding: '5'
            }, editor);
        }
        return editor;
    }
});