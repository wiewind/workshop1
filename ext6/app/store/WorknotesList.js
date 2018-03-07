/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define('WWS.store.WorknotesList', {
    extend: 'WWS.store.Base',

    alias: 'store.worknoteslist',

    model: 'WWS.model.Worknote',

    proxy: {
        url: Cake.api.path + '/Worknotes/json/getWorknotesList'
    }
});