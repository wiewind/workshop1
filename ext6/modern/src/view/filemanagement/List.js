/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.filemanagement.List', {
    extend: 'Ext.dataview.List',
    xtype: 'filemanagementlist',

    requires: [
        'WWS.view.filemanagement.ListController',
        'WWS.view.filemanagement.ListViewModel'
    ],
    controller: 'filemanagementlist',
    viewModel: {
        type: 'filemanagementlist'
    },

    bind: {
        store: '{folderItems}'
    },

    config: {
        scrollable: true,
        emptyText: T.__("This folder is empty."),

        plugins: [
            'WWS_PullRefresh'
        ],

        disableSelection: true,
        itemTpl: new Ext.XTemplate(
            '<div{[this.showCls(values.cls)]}>',
            '<div>{[this.showIcon(values.icon)]} <b>{text}</b></div>',
            '<div class="noticeText">{[this.showSize(values)]} {[this.showModified(values)]}</div>',
            '</div>',
            {
                showCls: function (cls) {
                    if (cls) {
                        return ' class="' + cls + '"';
                    }
                    return '';
                },
                showIcon: function(icon){
                    if (!icon) {
                        return '<span class="x-fa fa-folder-o"></span>';
                    }
                    return '<img src="' + icon + '" />';
                },
                showSize: function (rec) {
                    if (rec.isFile) {
                        return Ext.util.Format.fileSize(rec.FilemanagementFile.size);
                    }
                    return '';
                },
                showModified: function (rec) {
                    var v =  (rec.isFile) ? rec.FilemanagementFile.modified : rec.FilemanagementFolder.modified;
                    return Glb.Date.displayDateFromString(v, ' H:i:s');
                }
            }
        )
    },

    listeners: {
        itemtap: 'onItemTap'
    }
});