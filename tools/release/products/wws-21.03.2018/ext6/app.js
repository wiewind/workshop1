/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */

Ext.application({
    extend: 'WWS.Application',

    name: 'WWS',

    requires: [
        // This will automatically load all classes in the WWS namespace
        // so that application classes do not need to require each other.
        'WWS.*'
    ],

    // The name of the initial view to create.
    mainView: 'WWS.view.main.Main'
});