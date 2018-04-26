/**
 * Created by benying.zou on 26.04.2018.
 */
Ext.define('WWS.overrides.button.Button', {
    override: 'Ext.button.Button',

    requires: [
        'WWS.plugin.badge.Badge'
    ],

    plugins: ['badge']
});