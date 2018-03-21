/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define('WWS.store.SchoolRoomStore', {
    extend: 'WWS.store.Base',

    alias: 'store.schoolroom',

    model: 'WWS.model.SchoolRoom',

    proxy: {
        url: Cake.api.path + '/school/json/getRooms'
    }
});