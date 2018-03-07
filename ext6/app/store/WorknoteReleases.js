/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define('WWS.store.WorknotesReleases', {
    extend: 'WWS.store.Base',

    alias: 'store.worknotesrelease',

    model: 'WWS.model.WorknoteRelease',

    proxy: {
        api: {
            read:    Cake.api.path + '/WorknoteReleases/json/getReleases',
            update:  Cake.api.path + '/WorknoteReleases/json/update',
            create:  Cake.api.path + '/WorknoteReleases/json/create',
            destroy: Cake.api.path + '/WorknoteReleases/json/delete'
        }
    }
});