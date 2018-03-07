/**
 * Created by benying.zou on 13.02.2018.
 */
Ext.define('WWS.model.PasskeyGridItem', {
    extend: 'WWS.model.Base',

    fields: [
        {
            name: 'isPasskey',
            type: 'bool',
            convert: function (value, record) {
                var v = record.get('PasskeyData.id');
                return (Number(v) > 0) ? true : false;
            }
        },
        {
            name: 'text',
            convert: function (value, record) {
                var v = record.get('PasskeyData.id');
                return (Number(v) > 0) ? record.get('PasskeyData.title') : record.get('PasskeyGroup.name');
            }
        },
        {
            name: 'icon',
            convert: function (value, record) {
                var v = record.get('PasskeyData.id');
                return (Number(v) > 0) ?
                    (
                        (record.get('PasskeyData.url')) ? Cake.image.path+'/key_go.png' : Cake.image.path+'/key.png'
                    ) : false;
            }
        },

        {name: 'PasskeyData.id',                mapping: 'PasskeyData.id', type: 'int'},
        {name: 'PasskeyData.group_id',          mapping: 'PasskeyData.group_id', type: 'int'},
        {name: 'PasskeyData.title',             mapping: 'PasskeyData.title'},
        {name: 'PasskeyData.username',          mapping: 'PasskeyData.username'},
        {name: 'PasskeyData.password',          mapping: 'PasskeyData.password'},
        {name: 'PasskeyData.url',               mapping: 'PasskeyData.url'},
        {name: 'PasskeyData.notice',            mapping: 'PasskeyData.notice'},

        {name: 'PasskeyGroup.id', mapping: 'PasskeyGroup.id', type: 'int'},
        {name: 'PasskeyGroup.name', mapping: 'PasskeyGroup.name'},
        {name: 'PasskeyGroup.parent_id', mapping: 'PasskeyGroup.parent_id', type: 'int'},
        {name: 'PasskeyGroup.path', mapping: 'PasskeyGroup.path'}
    ]
});