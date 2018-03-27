/**
 * Created by benying.zou on 02.03.2017.
 */
Ext.define('WWS.utils.Global', {
    singleton: true,
    alternateClassName: ['Glb'],

    btnSetting: {
        submitText: T.__("Submit"),
        submitIconCls: 'x-fa fa-check',
        deleteText: T.__("Delete"),
        deleteIconCls: 'x-fa fa-remove',
        deleteIconCls2: 'x-fa fa-trash',
        cancelText: T.__("Cancel"),
        cancelIconCls: 'x-fa fa-ban',
        saveText: T.__("Save"),
        saveIconCls: 'x-fa fa-save',
        closeText: T.__("Close"),
        closeIconCls: 'x-fa fa-power-off',
        newText: T.__("New"),
        newIconCls: 'x-fa fa-plus',
        addText: T.__("Add"),
        addIconCls: 'x-fa fa-plus',
        editText: T.__("Edit"),
        editIconCls: 'x-fa fa-pencil',
        searchText: T.__("Search"),
        searchIconCls: 'x-fa fa-search',
        resetText: T.__("Reset"),
        resetIconCls: 'x-fa fa-undo',
        loginText: T.__("Login"),
        loginIconCls: 'x-fa fa-sign-in',
        logoutText: T.__("Logout"),
        logoutIconCls: 'x-fa fa-sign-out',
        sendText: T.__("Send"),
        sendIconCls: 'x-fa fa-send',
        refreshText: T.__("Refresh"),
        refreshIconCls: 'x-fa fa-refresh',
        printText: T.__("Print"),
        printIconCls: 'x-fa fa-print'

    },

    formSetting: {
        url: null,
        method: 'POST',
        timeout: 30000,
        waitMsg: T.__("Please wait..."),
        submitEmptyText: false,
        clientValidation: true
    },

    weekdays: [T.__("Monday"), T.__("Tuesday"), T.__("Wednesday"), T.__("Thursday"), T.__("Friday")],
    coursePeriods: [
        {name: T.__("weekly"), value: 'weekly'},
        {name: T.__("two-weeks"), value: 'two-weeks'}
    ],

    Ajax: function (config) {
        var options = {
            method: 'POST',
            timeout: 30000,
            responseType: 'json'
        };
        options = Ext.apply(options, config);

        if (options.responseType === 'json') {
            options.success = function (response, options) {
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    if (('success' in config)) config.success(response, options);
                } else {
                    var msg = (resp.message) ? resp.message : T.__('Unknown'),
                        timerId = options.timerId || -1,
                        fn = function () {};
                    if (resp.code === ErrorCode.ErrorCodeSessionTimeout) {
                        if (timerId > 0) {
                            window.clearInterval(timerId);
                        }
                        fn = function () {location.reload();}
                    }
                    ABox.failure(msg, function () {
                        if (('failure' in config)) config.failure(response, options);
                        fn();
                    });
                }
            };
        }
        options.failure = function (response, options) {
            ABox.error(T.__('Server Error'));
            if (('failure' in config)) config.failure(response, options);
        };
        options.callback = function (options, success, response) {
            if (('callback' in config)) config.callback(options, success, response);
            Glb.common.unmask();
        };

        var waitMsg = (config.waitMsg) ? config.waitMsg : T.__('loading...')
        Glb.common.mask(waitMsg);
        Ext.Ajax.request(options);
    },

    common: {
        checkLogin: function () {
            if (Wiewind.check(SSD.data.user) && Number(SSD.data.user.id) > 0) {
                return true;
            }
            return false;
        },

        checkPassword: function (password) {
            if (!password || password.length < 6) {
                return false;
            }
            return true;
        },

        forgotPassword: function () {
            Ext.create('WWS.view.setting.ForgotPasswordWindow');
        },

        mask: function (msg, component) {
            component = component || false;
            if (!component) {
                component = Ext.getCmp('appmain');
            }

            if (component) component.mask(msg);
        },

        unmask: function (component) {
            component = component || false;
            if (!component) {
                component = Ext.getCmp('appmain');
            }
            if (component) component.unmask();
        },

        openLeftMenu: function () {
            Ext.Viewport.showMenu('left');
        },

        goback: function () {
            window.history.back()
        },

        getBadgeCount: function (count) {
            return count > 99 ? '99+' : count;
        }
    },

    Date: {
        displayDateFromTimestamp: function (timestamp, format_extra, shot) {
            if (Number(timestamp) === 0) return ''; // avoid 01.01.1970

            var format = (shot) ? SSD.data.formatting['date_format_short'] : SSD.data.formatting['date_format'];
            if (format_extra) format = format + format_extra;

            return Ext.Date.format(timestamp, format);
        },
        displayDateFromString: function (timestamp, format_extra, shot) { // param yyyy-mm-dd HH:ii:ss
            if (Number(timestamp) === 0) return ''; // avoid 01.01.1970
            var format = (shot) ? SSD.data.formatting['date_format_short'] : SSD.data.formatting['date_format'],
                date = Ext.Date.parse(timestamp, "Y-m-d H:i:s");
            if (!date) date = Ext.Date.parse(timestamp, "Y-m-d");
            if (!date) date = new Date(timestamp);
            if (format_extra) format = format + format_extra;
            return Ext.Date.format(date, format);
        }
    },

    History: {
        tokenDelimiter: ':',

        add: function (p) {
            var tabs = [],
                ownerCt = p.up(),
                hasMain = false,
                oldToken, newToken;
            tabs.push(p.id);

            while (!Ext.isEmpty(ownerCt)) {
                if (ownerCt.id === 'appmain') {
                    hasMain = true;
                }
                tabs.push(ownerCt.id);
                ownerCt = ownerCt.up();
                if (hasMain) {
                    break;
                }
            }

            if (!hasMain) {
                tabs.push('appmain');
            }

            newToken = tabs.reverse().join(Glb.History.tokenDelimiter);

            oldToken = Ext.History.getToken();

            if (oldToken === null || oldToken.search(newToken) === -1) {
                Ext.History.add(newToken);
            }
        },

        onChange: function (token) {
            var parts, length, i,
                main = Ext.getCmp('appmain'),
                viewPort = Ext.getCmp('ext-viewport');
            viewPort.setActiveItem(main);
            if (token) {
                parts = token.split(Glb.History.tokenDelimiter);
                length = parts.length;

                // setActiveTab in all nested tabs
                for (i = 0; i < length - 1; i++) {
                    var tabP = Ext.getCmp(parts[i]),
                        childP = Ext.getCmp(parts[i + 1]);
                    if (Ext.isEmpty(tabP) || Ext.isEmpty(childP)) {
                        return;
                    }
                    var parentP = childP.up();
                    while (parentP && tabP != parentP) {
                        childP = parentP;
                        parentP = childP.up();
                    }
                    tabP.setActiveItem(childP);
                }
            } else {
                var p = main.items.items[1];
                main.setActiveItem(p);
            }
        }
    },

    Filemanagement: {
        folderRoot: {
            id: 0,
            name: '',
            path: '',
            parent_id: 0,
            customer_id: Wiewind.isEmpty(SSD.data.user) ? 0 : SSD.data.user.id
        },

        getFolderData: function (rec) {
            return Ext.apply(rec.get('FilemanagementFolder'), {
                text: rec.get('text'),
                cls: rec.get('cls')
            });
        },

        getFileData: function (rec) {
            return Ext.apply(rec.get('FilemanagementFile'), {
                text:           rec.get('text'),
                cls:            rec.get('cls'),
                icon:           rec.get('icon'),
                path:           rec.get('FilemanagementFolder.path'),
                customer_id:    rec.get('FilemanagementFolder.customer_id')
            });
        }
    },

    Passkey: {
        getKeyData: function (rec) {
            return Ext.apply(rec.get('PasskeyData'), {
                path: rec.get('PasskeyGroup.path')
            });
        }
    },

    FirstnameAtFirst: true,
    LastnameAtFirst: false,
    displayPersonName: function (lastname, firstname, sex, firstnameAtFirst) {
        lastname = lastname || '';
        firstname = firstname || '';
        sex = sex || '';
        firstnameAtFirst = firstnameAtFirst || Glb.FirstnameAtFirst;
        var name = '';
        if (firstname == '') {
            name = lastname;
        } else if (lastname == '') {
            name = firstname;
        } else if (firstnameAtFirst) {
            name = firstname + ' ' + lastname;
        } else {
            name = lastname + ', ' + firstname;
        }
        if (sex === 'f') {
            name = Wiewind.String.sprintf(T.__("Ms. %s"), name);
        } else if (sex === 'm') {
            name = Wiewind.String.sprintf(T.__("Mr. %s"), name);
        }
        return name;
    }
});