/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define('WWS.model.AddressbookPerson', {
    extend: 'WWS.model.Base',

    fields: [
        {name: 'id', mapping: 'AddressbookPerson.id', type: 'int'},
        {name: 'name', mapping: 'AddressbookPerson.name'},
        {name: 'name2', mapping: 'AddressbookPerson.name2'},
        {name: 'pinyin', mapping: 'AddressbookPerson.pinyin'}
    ]
});