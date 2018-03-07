/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.filemanagement.FileController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filemanagementfile',

    setData: function (fileData) {
        fileData = fileData || false;
        if (fileData) {
            this.getViewModel().setData(fileData);
            var ct = this.getView().down('[itemId="fileCt"]');
            ct.removeAll();
            ct.add([
                {
                    xtype: 'component',
                    html: '<iframe src="' + Cake.api.path + '/filemanagement/getFile/' + fileData.id + '" style="height: 100%; width: 100%; border: none;" scrolling="auto" />'
                }
            ]);
        }
    }
});