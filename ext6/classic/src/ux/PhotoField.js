/**
 * Created by benying.zou on 13.03.2018.
 */
Ext.define('WWS.ux.PhotoField', {
    extend: 'Ext.form.field.File',
    xtype: 'photofield',

    onFileChange: function (button, e, value) {
        this.duringFileSelect = true;

        var me = this,
            upload = me.fileInputEl.dom,
            file = upload.files,
            name = '';

        if (file) {
            file = file[0];
            if (Wiewind.Array.in_array(Wiewind.File.getFileSuffix(file.name), ['png', 'jpg', 'jpeg', 'gif', 'bmp'])) {
                name = file.name;
            } else {
                ABox.error(T.__('Your file is not allowed, the accredited files are: png, jpg, gif, bmp'));
            }
        }

        Ext.form.field.File.superclass.setValue.call(this, name);
        delete this.duringFileSelect;
    },

    afterFileChange: function (files) {}
});