/**
 * Created by benying.zou on 20.03.2018.
 */
Ext.define('WWS.view.school.ChildrenList', {
    extend: 'WWS.ux.List',
    xtype: 'schoolchildrenlist',

    requires: [
        'WWS.view.school.ChildrenListController',
        'WWS.view.school.ChildrenListViewModel'
    ],
    controller: 'schoolchildrenlist',
    viewModel: {
        type: 'schoolchildrenlist'
    },

    bind: '{childrenStore}',

    config: {
        disableSelection: true,
        itemCls: 'childrenDiv',
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="childrenName">' + Glb.displayPersonName('{lastname}', '{firstname}', null, Glb.firstnameAtFirst) + '</div>',
            '<div class="childrenPhoto">{[this.displayPhoto(values)]}</div>',
            '<div class="childrenDetails>" ',
                '<div>{[this.displayBirthday(values)]}</div>',
                '<div>{[this.displayTelephones(values)]}</div>',
                '<div>{[this.displayEmails(values)]}</div>',
                '<div>{[this.displayAddresses(values)]}</div>',
            '</div>',
            {
                displayPhoto: function (values) {
                    var url = Cake.api.path + '/school/showPhoto/child/' + values.id + '/100?_v=' + btoa(Date.now());
                    var onclick = (values.photo) ? ' onclick="SCF.showPhoto('+SCF.datatypeChild+', ' + values.id + ')"' : '';
                    return '<img src="' + url + '"' + onclick + ' alt="' + values.firstname + '" />';
                },

                displayBirthday: function (values) {
                    if (values.birthday > 0) {
                        return Glb.Date.displayDateFromString(values.birthday);
                    }
                    return '';
                },

                displayTelephones: function (values) {
                    var res = '',
                        data = Ext.decode(values.telephones);
                    if (typeof data === 'string') {
                        data = Ext.decode(data);
                    }

                    if (!Wiewind.isEmpty(data)) {
                        Ext.each(data, function (d) {
                            res += '<div>';
                            if (!Ext.isEmpty(d['type'])) {
                                res += d['type'] + ': ';
                            }
                            res += d['number'] + '</div>'
                        });
                    }
                    return res;
                },

                displayEmails: function (values) {
                    var res = '',
                        data = Ext.decode(values.emails);
                    if (typeof data === 'string') {
                        data = Ext.decode(data);
                    }
                    if (!Wiewind.isEmpty(data)) {
                        Ext.each(data, function (d) {
                            res += '<div>';
                            if (!Ext.isEmpty(d['type'])) {
                                res += d['type'] + ': ';
                            }
                            res += d['email'] + '</div>'
                        });
                    }
                    return res;
                },

                displayAddresses: function (values) {
                    var res = '',
                        data = Ext.decode(values.addresses);
                    if (typeof data === 'string') {
                        data = Ext.decode(data);
                    }
                    if (!Wiewind.isEmpty(data)) {
                        Ext.each(data, function (d) {
                            res += '<div>';
                            if (!Ext.isEmpty(d['type'])) {
                                res += d['type'] + ': ';
                            }
                            res += d['address'] + '</div>'
                        });
                    }
                    return res;
                }
            }
        )
    },

    listeners: {
        activate: Glb.History.add
    }
});