/**
 * Created by benying.zou on 17.03.2017.
 */
Ext.define('WWS.ux.AMessageBox', {
    alternateClassName: 'ABox',

    statics: {
        defaultInterval: 2000,

        show: function (config, interval) {
            if (!interval) interval = -1;

            if (!('title' in config)) {
                config.title = 'Title';
            }

            if (!('message' in config)) {
                config.message = 'This is a message.';
            }

            if (!('iconCls' in config) && !('icon' in config)) {
                config.iconCls = 'x-fa fa-comment';
            }
            config.iconCls = null;

            if (interval <= 0) {
                config.buttons = Ext.MessageBox.OK
            }

            Ext.Msg.show(config);

            if (interval > 0) {
                setTimeout(function() {Ext.Msg.close();}, interval);
            }
        },

        alert: function (title , message , fn) {
            Ext.Msg.alert(title , message , fn);
        },

        success: function (msg, fn, interval) {
            if (!interval) interval = ABox.defaultInterval;
            ABox.show({
                title: T.__("Success"),
                message: msg,
                icon: Ext.Msg.INFO,
                iconCls: 'x-fa fa-hand-peace-o',
                fn: fn
            }, interval);
        },

        info: function (msg, fn, interval) {
            interval = interval || ABox.defaultInterval;
            ABox.show({
                title: T.__("Info"),
                message: msg,
                icon: Ext.Msg.INFO,
                iconCls: 'x-fa fa-comment',
                fn: fn
            }, interval);
        },

        error: function (msg, fn, interval) {
            ABox.show({
                title: T.__("Error"),
                message: msg,
                icon: Ext.Msg.ERROR,
                iconCls: 'x-fa fa-remove',
                fn: fn
            }, interval);
        },

        warning: function (msg, fn, interval) {
            ABox.show({
                title: T.__("Warning"),
                message: msg,
                icon: Ext.Msg.WARNING,
                iconCls: 'x-fa fa-warning',
                fn: fn
            }, interval);
        },

        failure: function (msg, fn, interval) {
            ABox.show({
                title: T.__("Failure"),
                message: msg,
                icon: Ext.Msg.ERROR,
                iconCls: 'x-fa fa-frown-o',
                fn: fn
            }, interval);
        },

        confirm: function (msg, fn) {
            Ext.Msg.confirm(T.__('Attention'), msg, function (btn) {
                if(btn === 'yes') {
                    fn();
                }
            });
        },

        prompt: function (msg, fn, fieldOption, multiLine, value) {
            fieldOption = fieldOption || null;
            multiLine = multiLine || false;
            value = value || null;
            // Ext.Msg.promt = field;
            Ext.Msg.prompt(T.__('Please enter...'), msg, fn, null, multiLine, value, fieldOption);
        }
    }
});