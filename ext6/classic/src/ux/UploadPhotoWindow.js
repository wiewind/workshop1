/**
 * Created by benying.zou on 12.03.2018.
 */
Ext.define('WWS.ux.UploadPhotoWindow', {
    extend: 'Ext.window.Window',
    xtype: 'uploadphotowindow',

    requires: [
        'WWS.ux.PhotoField',
        'WWS.ux.UploadPhotoWindowController'
    ],
    controller: 'uploadphotowindow',

    config: {
        title: T.__('Photo upload'),
        iconCls: 'x-fa fa-upload',
        width: 400,
        layout: 'fit',
        minHeight: 100,
        modal: true,
        bodyBorder: 0,
        autoShow: true,
        closeToolText: T.__('Close')
    },

    items: [
        {
            xtype: 'form',
            bodyCls: 'windowform',
            bodyPadding: 10,
            border: 0,
            layout: 'vbox',
            scrollable: true,
            onSubmit: 'onSubmit',
            defaults: {
                width: '100%',
                padding: 5
            },
            items: [
                {
                    xtype: 'photofield',
                    name: 'photo',
                    fieldLabel: T.__('Photo'),
                    labelWidth: 50,
                    msgTarget: 'side',
                    allowBlank: false,
                    anchor: '100%',
                    buttonText: T.__('Select Photo...')
                }
            ]
        }
    ],

    buttons: [
        '->',
        {
            text: T.__('Upload'),
            tooltip: T.__('Upload'),
            iconCls: 'x-fa fa-upload',
            handler: 'onSubmit'
        },
        {
            text: Glb.btnSetting.cancelText,
            tooltip: Glb.btnSetting.cancelText,
            iconCls: Glb.btnSetting.cancelIconCls,
            handler: 'onClose'
        }
    ]
});