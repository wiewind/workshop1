/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.view.school.child.EditWindowViewModel', {
    extend: 'WWS.ux.MusterFormWindowViewModel',
    alias: 'viewmodel.schoolchildeditwindow',

    data: {
        id: 0,
        class_id: 0,
        new_photo: ''
    },

    formulas: {
        showPhoto: function (get) {
            return get('new_photo') ?
                    Cake.api.path + '/school/showTmpPhoto/'+get('new_photo')+'/150/150?_v=' + btoa(Date.now()):
                    Cake.api.path + '/school/showPhoto/child/'+get('id')+'/150/150?_v=' + btoa(Date.now());
        },

        hiddenDeletePhotoBtn: function (get) {
            if (get('new_photo') === 'null') {
                return true;
            }
            return !(get('new_photo') || get('photo'));
        }
    }
});