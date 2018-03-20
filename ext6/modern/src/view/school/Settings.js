/**
 * Created by benying.zou on 20.03.2018.
 */
Ext.define('WWS.view.school.Settings', {
    extend: 'Ext.Container',
    xtype: 'schoolsettings',

    requires: [
        'WWS.view.school.SettingsController'
    ],
    controller: 'schoolsettings',
    viewModel: {
        type: 'schoolsettings'
    },

    config: {
        layout: 'vbox',
        scrollable: true,
        padding: 20
    },

    items: [
        {
            style: 'height: 2em;'
        },
        {
            xtype: 'selectfield',
            name: 'class',
            label: T.__('Class'),
            displayField: 'name',
            valueField: 'id',
            bind: {
                store: '{classStore}',
                value: '{class.id}'
            }
        },
        {
            xtype: 'selectfield',
            name: 'semester',
            label: T.__('Semester'),
            displayField: 'name',
            valueField: 'id',
            bind: {
                store: '{semesterStore}',
                value: '{semester.id}'
            },
            listeners: {
                select: 'onSemesterSelect'
            }
        },
        {
            xtype: 'component',
            itemId: 'period',
            html: ''
        },
        {
            style: 'height: 2em;'
        },
        {
            xtype: 'button',
            text: Glb.btnSetting.submitText,
            iconCls: Glb.btnSetting.submitIconCls,
            ui: 'action',
            handler: 'onClickSubmit'
        },
        {
            style: 'height: 5em;'
        },
        {
            xtype: 'button',
            text: T.__('Reset default'),
            iconCls: Glb.btnSetting.resetIconCls,
            ui: 'action',
            handler: 'onClickReset'
        },
        {
            style: 'height: 2em;'
        }
    ]

});