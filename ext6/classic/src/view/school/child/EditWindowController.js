/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.child.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolchildeditwindow',

    init: function () {
        this.loadChild(this.getViewModel().get('id'));
    },

    loadChild: function (child_id) {
        var me = this,
            vm = this.getViewModel();
        if (child_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadChild',
                params: {
                    child_id: child_id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    vm.setData(data);

                    if (!Ext.isEmpty(data.telephones)) {
                        Ext.each(data.telephones, function (data) {
                            me.addTelephoneLine(data);
                        });
                    } else {
                        me.addTelephoneLine();
                    }
                    if (!Ext.isEmpty(data.emails)) {
                        Ext.each(data.emails, function (data) {
                            me.addEmailLine(data);
                        });
                    } else {
                        me.addEmailLine();
                    }
                    if (!Ext.isEmpty(data.addresses)) {
                        Ext.each(data.addresses, function (data) {
                            me.addAddressLine(data);
                        });
                    } else {
                        me.addAddressLine();
                    }
                }
            });
        } else {
            me.addTelephoneLine();
            me.addEmailLine();
            me.addAddressLine();
        }
    },

    addTelephoneLine: function (data) {
        var me = this;
        var ctn = this.getView().down('[itemId="telephoneCtn"]');
        ctn.add(
            {
                items: [
                    {
                        width: 200,
                        name: 'telephone_type[]',
                        value: (data) ? data.type : '',
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        name: 'telephone_content[]',
                        flex: 1,
                        value: (data) ? data.number : '',
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'button',
                        tooltip: T.__("delete the telephone"),
                        iconCls: Glb.btnSetting.deleteIconCls2,
                        handler: function (btn) {
                            me.deleteLine(btn);
                        }
                    }
                ]
            }
        );
    },

    addEmailLine: function (data) {
        var me = this;
        var ctn = this.getView().down('[itemId="emailCtn"]');
        ctn.add(
            {
                items: [
                    {
                        width: 200,
                        name: 'email_type[]',
                        value: (data) ? data.type : '',
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'email_content[]',
                        vtype: 'email',
                        flex: 1,
                        value: (data) ? data.email : '',
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'button',
                        tooltip: T.__("delete the email"),
                        iconCls: Glb.btnSetting.deleteIconCls2,
                        handler: function (btn) {
                            me.deleteLine(btn);
                        }
                    }
                ]
            }
        );

    },

    addAddressLine: function (data) {
        var me = this;
        var ctn = this.getView().down('[itemId="addressCtn"]');
        ctn.add(
            {
                items: [
                    {
                        xtype: 'textfield',
                        width: 200,
                        name: 'address_type[]',
                        value: (data) ? data.type : '',
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'address_content[]',
                        flex: 1,
                        value: (data) ? data.address : '',
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    },
                    {
                        xtype: 'button',
                        tooltip: T.__("delete the address"),
                        iconCls: Glb.btnSetting.deleteIconCls2,
                        handler: function (btn) {
                            me.deleteLine(btn);
                        }
                    }
                ]
            }
        );

    },

    deleteLine: function (btn) {
        var me = this,
            line = btn.up(),
            ctn = line.up();
        ctn.remove(line);
        if (ctn.items.items.length === 1) {
            if (ctn.itemId === 'telephoneCtn') {
                me.addTelephoneLine();
            } else if (ctn.itemId === 'emailCtn') {
                me.addEmailLine();
            } else if (ctn.itemId === 'addressCtn') {
                me.addAddressLine();
            }
        }
    },

    onUploadPhoto: function () {
        var me = this;
        Ext.create('WWS.ux.UploadPhotoWindow', {
            callbackFn: function (photo) {
                me.clearTmpPhoto();
                var vm = me.getViewModel();
                vm.setData({
                    new_photo: photo
                });

            }
        });
    },

    onDeletePhoto: function () {
        var vm = this.getViewModel();
        this.clearTmpPhoto(vm.get('new_photo'));
        vm.setData({
            new_photo: 'null'
        });
    },

    clearTmpPhoto: function (tmp) {
        tmp = tmp || this.getViewModel().get('new_photo');
        if (tmp && tmp !== 'null') {
            Glb.Ajax({
                url: Cake.api.path + '/images/json/clearTempPhoto',
                params: {
                    file: tmp
                }
            });
        }
    },

    beforeclose: function () {
        this.clearTmpPhoto();
    },

    submitSuccess: function (form, action) {
        var view = this.getView(),
            res = Ext.decode(action.response.responseText),
            values = view.down('form').getValues();
        if (view.callbackFn) {
            values['id'] = res.child_id;
            view.callbackFn(values);
        }
        ABox.success(T.__("The child has been saved!"));
        this.clearTmpPhoto();
        view.close();
    }
});