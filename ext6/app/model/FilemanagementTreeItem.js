/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.model.FilemanagementTreeItem', {
    extend: 'Ext.data.TreeModel',
    // extend: 'WWS.model.Base',

    fields: [
        {
            name: 'id',
            mapping: 'FilemanagementFolder.id',
            convert: function (value, record) {
                var v = record.get('FilemanagementFile.id');
                return (Number(v) > 0) ? Cake.prefix['tree'] + Cake.prefix['file'] + v : Cake.prefix['tree'] + Cake.prefix['folder'] + record.get('FilemanagementFolder.id');
            }
        },
        {
            name: 'isFile',
            type: 'bool',
            convert: function (value, record) {
                var v = record.get('FilemanagementFile.id');
                return (Number(v) > 0) ? true : false;
            }
        },
        {
            name: 'leaf',
            type: 'bool',
            convert: function (value, record) {
                var v = record.get('FilemanagementFile.id');
                return (Number(v) > 0) ? true : false;
            }
        },
        {
            name: 'text',
            convert: function (value, record) {
                var v = record.get('FilemanagementFile.id');
                var name = (Number(v) > 0) ? record.get('FilemanagementFile.name') : record.get('FilemanagementFolder.name');
                return name + (name==='..' || (Number(record.get('FilemanagementFolder.customer_id')) > 0) ? '' : ' [' + T.__("Public") + ']');
            }
        },
        {
            name: 'icon',
            convert: function (value, record) {
                if (record.get('FilemanagementFolder.name') === '..') return Cake.image.path+'/level_up.png';
                var v = record.get('FilemanagementFile.id');
                return (Number(v) > 0) ? Cake.api.path + '/filetypes/icon/' + Wiewind.File.getFileSuffix(record.get('FilemanagementFile.name')) : false;
            }
        },
        {
            name: 'cls',
            convert: function (value, record) {
                return (Number(record.get('FilemanagementFolder.customer_id')) > 0 || record.get('FilemanagementFolder.name') === '..') ? false : 'fm_public_folder';
            }
        },
        {name: 'FilemanagementFile.id', mapping: 'FilemanagementFile.id', type: 'int'},
        {name: 'FilemanagementFile.name', mapping: 'FilemanagementFile.name'},
        {name: 'FilemanagementFile.folder_id', mapping: 'FilemanagementFile.folder_id', type: 'int'},
        {name: 'FilemanagementFile.size', mapping: 'FilemanagementFile.size', type: 'int'},
        {name: 'FilemanagementFile.created', mapping: 'FilemanagementFile.created', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'FilemanagementFile.created_by', mapping: 'FilemanagementFile.created_by'},
        {name: 'FilemanagementFile.created_by_name', mapping: 'FileUserCreated.name'},
        {name: 'FilemanagementFile.modified', mapping: 'FilemanagementFile.modified', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'FilemanagementFile.modified_by', mapping: 'FilemanagementFile.modified_by'},
        {name: 'FilemanagementFile.modified_by_name', mapping: 'FileUserModified.name'},

        {name: 'FilemanagementFolder.id', mapping: 'FilemanagementFolder.id', type: 'int'},
        {name: 'FilemanagementFolder.customer_id', mapping: 'FilemanagementFolder.customer_id', type: 'int'},
        {name: 'FilemanagementFolder.name', mapping: 'FilemanagementFolder.name'},
        {name: 'FilemanagementFolder.path', mapping: 'FilemanagementFolder.path'},
        {name: 'FilemanagementFolder.parent_id', mapping: 'FilemanagementFolder.parent_id', type: 'int'},
        {name: 'FilemanagementFolder.created', mapping: 'FilemanagementFolder.created', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'FilemanagementFolder.created_by', mapping: 'FilemanagementFolder.created_by'},
        {name: 'FilemanagementFolder.created_by_name', mapping: 'FolderUserCreated.name'},
        {name: 'FilemanagementFolder.modified', mapping: 'FilemanagementFolder.modified', type:'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'FilemanagementFolder.modified_by', mapping: 'FilemanagementFolder.modified_by'},
        {name: 'FilemanagementFolder.modified_by_name', mapping: 'FolderUserModified.name'}
    ]
});