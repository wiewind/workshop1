/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.teacher.EditWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',
    alias: 'controller.schoolteachereditwindow',

    init: function () {
        this.loadTeacher(this.getViewModel().get('id'));
    },

    loadTeacher: function (teacher_id) {
        var vm = this.getViewModel();
        if (teacher_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/school/json/loadTeacher',
                params: {
                    teacher_id: teacher_id
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    vm.setData(data);
                }
            });
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
        if (view.callbackFn) {
            values['id'] = res.teacher_id;
            view.callbackFn(values);
        }
        ABox.success(T.__("The teacher has been saved!"));
        this.clearTmpPhoto();
        view.close();
    }
});