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
                        value: (data) ? data.type : ''
                    },
                    {
                        name: 'telephone_content[]',
                        flex: 1,
                        value: (data) ? data.number : ''
                    },
                    {
                        xtype: 'button',
                        tooltip: T.__("delete the telephone"),
                        iconCls: 'x-fa fa-trash',
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
                        value: (data) ? data.type : ''
                    },
                    {
                        xtype: 'textfield',
                        name: 'email_content[]',
                        vtype: 'email',
                        flex: 1,
                        value: (data) ? data.email : ''
                    },
                    {
                        xtype: 'button',
                        tooltip: T.__("delete the email"),
                        iconCls: 'x-fa fa-trash',
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
                        value: (data) ? data.type : ''
                    },
                    {
                        xtype: 'textfield',
                        name: 'address_content[]',
                        flex: 1,
                        value: (data) ? data.address : ''
                    },
                    {
                        xtype: 'button',
                        tooltip: T.__("delete the address"),
                        iconCls: 'x-fa fa-trash',
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
            callback: function (photo) {
                me.clearTmpPhoto();
                var vm = me.getViewModel();
                vm.setData({
                    new_photo: photo
                });

            }
        });
    },

    clearTmpPhoto: function (tmp) {
        tmp = tmp || this.getViewModel().get('new_photo');
        if (tmp) {
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
        if (view.callback) {
            values['id'] = res.child_id;
            view.callback(values);
        }
        ABox.success(T.__("The child has been saved!"));
        this.clearTmpPhoto();
        view.close();
    }
});