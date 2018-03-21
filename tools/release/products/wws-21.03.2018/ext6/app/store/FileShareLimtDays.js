/**
 * Created by benying.zou on 19.02.2018.
 */
Ext.define('WWS.store.FileShareLimtDays', {
    extend: 'Ext.data.Store',

    alias: 'store.filesharelimitdays',

    fields: [
        {name: 'limit'},
        {name: 'text'}
    ],

    data: [
        {limit: 0, text: T.__("no limit")},
        {limit: 2, text: '2 ' + T.__("days")},
        {limit: 10, text: '10 ' + T.__("days")},
        {limit: 30, text: '30 ' + T.__("days")},
        {limit: 90, text: '90 ' + T.__("days")},
        {limit: 365, text: '1 ' + T.__("year")}
    ]
});