Ext.define('WWS.ux.Ckeditor', {
    extend : 'Ext.form.field.TextArea',
    xtype : 'ckeditor',

    initComponent : function() {
        var me = this;
        this.callParent();
        this.on('afterrender', function() {
            Ext.apply(this.CKConfig, {
                height : this.getHeight()
            });
            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editorId = this.editor.id;
            this.setValue(this.CKConfig.value);
        }, this);
    },


    onRender : function(ct, position){
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "textarea",
                autocomplete: "off"
            };
        }
        this.callParent(arguments);
    },

    setValue: function(value) {
        this.callParent(arguments);
        if(this.editor){
            this.editor.setData(value);
        }
    },

    getValue: function() {
        if (this.editor) {
            this.editor.updateElement();
            return this.editor.getData();
        } else {
            return '';
        }
    },

    getRawValue: function() {
        if (this.editor) {
            this.editor.updateElement();
            return this.editor.getData();
        } else {
            return '';
        }
    }

});

CKEDITOR.on('instanceReady', function(e) {
    var o = Ext.ComponentQuery.query('ckeditor[editorId="' + e.editor.id + '"]'),
    comp = o[0];
    e.editor.resize(comp.getWidth(), comp.getHeight());
    comp.on('resize', function(c, adjWidth, adjHeight) {
        c.editor.resize(adjWidth, adjHeight);
    });
});