/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define('WWS.model.Worknote', {
    extend: 'WWS.model.Base',

    fields: [
        {name: 'id', mapping: 'Worknote.id', type: 'int'},
        {name: 'user_id', mapping: 'Worknote.user_id', type: 'int'},
        {name: 'title', mapping: 'Worknote.title'},
        {name: 'text', mapping: 'Worknote.text'},
        {name: 'date', mapping: 'Worknote.date', type: 'date', dateFormat:'Y-m-d'},
        {name: 'created', mapping: 'Worknote.created', type: 'date', dateFormat:'Y-m-d H:i:s'},
        {name: 'modified', mapping: 'Worknote.modified', type: 'date', dateFormat:'Y-m-d H:i:s'},

        {name: 'project_id', mapping: 'Worknote.worknote_project_id', type: 'int'},
        {name: 'project', mapping: 'WorknoteProject.name'},

        {name: 'hasRelease', mapping: 'Worknote.hasRelease'},
        {name: 'waitRelease', mapping: 'Worknote.waitRelease'}
    ]
});
