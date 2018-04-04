/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define ('WWS.view.jobapplications.edit.JobAttachmentsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'jobapplicationseditjobattachments',

    requires: [
        'WWS.view.jobapplications.edit.JobAttachmentsGridViewModel'
    ],
    viewModel: {
        type: 'jobapplicationseditjobattachments'
    },

    bind: '{jobAttachments}',

    config: {
        title: T.__("Attachments"),
        scrollable: true,
        border: 1,
        height: 250,
        width: '100%'
    },

    columns: [
        {
            xtype:'actioncolumn',
            width:30,
            dataIndex: 'file',
            renderer: function(v, meta, rec){
                if (rec.get('deleted')) return '<img src="' + Cake.image.path + '/undo.png" />';
                return '<img src="' + Cake.api.path + '/filetypes/icon/' + Wiewind.File.getFileSuffix(v) + '" />';
            }
        },
        {
            header: T.__("Name"),
            flex: 1,
            dataIndex: 'name',
            renderer: function(v, meta, rec){
                console.log(rec);
                if (rec.get('deleted')) return '<div style="color: grey">' + v + '</div>';
                return '<a href="' + Cake.api.path + '/jobapplications/showAttachmentFile/' + rec.get('attachment_id') + '" target="_blank">' + v + '</a>';
            }
        }
    ]
});