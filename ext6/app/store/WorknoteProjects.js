/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define('WWS.store.WorknoteProjects', {
    extend: 'WWS.store.Base',

    alias: 'store.worknoteprojects',

    model: 'WWS.model.WorknoteProject',

    proxy: {
        api: {
            read: Cake.api.path + '/WorknoteProjects/json/getAllProjects',
            update: Cake.api.path + '/WorknoteProjects/json/update',
            create: Cake.api.path + '/WorknoteProjects/json/create',
            destroy: Cake.api.path + '/WorknoteProjects/json/delete'
        }
    }
});