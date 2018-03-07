/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define('WWS.model.WorknoteRelease', {
    extend: 'WWS.model.Base',

    fields: [
        {name: 'id', mapping: 'WorknoteRelease.id'},
        {name: 'worknote_id', mapping: 'WorknoteRelease.worknote_id'},
        {name: 'file', mapping: 'WorknoteRelease.file'},
        {name: 'finished', mapping: 'WorknoteRelease.finished'}
    ]
});