/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('WWS.ux.MultiFileField', {
    extend: 'Ext.form.field.File',
    xtype: 'multifilefield',

    onRender: function() {
        this.callParent(arguments);

        this.fileInputEl.set({
            multiple: 'multiple'
        });
    },

    onFileChange: function (button, e, value) {
        this.duringFileSelect = true;

        var me = this,
            upload = me.fileInputEl.dom,
            files = upload.files,
            names = [];

        if (files) {
            for (var i = 0; i < files.length; i++)
                names.push(files[i].name);
            value = names.join(', ');
        }

        Ext.form.field.File.superclass.setValue.call(this, value);

        this.afterFileChange(files);

        delete this.duringFileSelect;
    },

    afterFileChange: function (files) {}
});