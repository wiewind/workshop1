/**
 * Created by benying.zou on 02.02.2018.
 */
Ext.define ('WWS.view.search.SideContainer', {
    extend: 'Ext.container.Container',
    xtype: 'searchsidecontainer',

    config: {
        width: '20%',
        maxWidth: 260,
        bodyPadding: 10,
        border: 0,
        defaults: {
            padding: 10,
            width: '100%',
            border: 1
        }
    },

    side: 'l'

});