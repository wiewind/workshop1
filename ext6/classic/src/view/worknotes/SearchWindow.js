/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('WWS.view.worknotes.SearchWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    id: 'worknotesSearchWindow',

    requires: [
        'WWS.view.worknotes.SearchWindowController'
    ],
    controller: 'worknotessearchwindow',

    config: {
        title: T.__("Search Worknotes"),
        layout: 'fit',
        icon: Cake.image.path+'/search.png',
        modal: true,
        closeAction: 'hide',
        border: 0,
        width: 800,
        height: 600,
        defaults: {
            border: 0
        }
    },

    input: {
        submitText: T.__('Search'),
        submitIcon: Cake.image.path + '/search.png'
    },

    configForm: function () {
        return {
            autoScroll: true
        };
    },

    buildProjects: function (values) {
        values = values || [];
        var project_store = Ext.ComponentQuery.query('worknotesprojectsgrid')[0].getViewModel().getStore('projects'),
            checkboxItems = [];

        if (project_store.count() > 0) {
            project_store.each(function(Record) {
                var id = Record.get('id'),
                    checkbox = {
                        boxLabel  : Record.get('name'),
                        name      : 'project',
                        inputValue: Record.get('id')
                    };
                if (Wiewind.Array.in_array(id, values)) {
                    checkbox.checked = true;
                }
                checkboxItems.push(checkbox);
            });
        }

        return checkboxItems;
    },

    rebuildProjects: function () {
        var params = this.down('form').getValues(),
            group = this.lookupReference('projectsgroup');
        group.removeAll();
        if (!Wiewind.isEmpty(params['project'])) {
            params['project'] = [];
        } else if (params['project'] instanceof string) {
            params['project'] = [params['project']];
        }
        group.add(this.buildProjects(params['project']));
    },

    buildFormItems: function () {
        var me = this,
            endDate = startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        return [
            {
                xtype: 'fieldset',
                title: T.__("Search Worknotes"),
                margin: 5,
                padding: 5,
                layout: 'vbox',
                defaults: {
                    labelWidth: 100,
                    width: '100%'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'datefield',
                                name: 'start_date',
                                fieldLabel: T.__("Start Date"),
                                format: 'Y-m-d',
                                value: startDate,
                                allowBlank: false,
                                flex: 1,
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            },
                            {
                                xtype: 'component',
                                width: 50
                            },
                            {
                                xtype: 'datefield',
                                name: 'end_date',
                                fieldLabel: T.__("End Date"),
                                format: 'Y-m-d',
                                value: endDate,
                                allowBlank: false,
                                flex: 1,
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            }
                        ]
                    }, {
                        xtype: 'textfield',
                        name: 'text',
                        fieldLabel: T.__("Contents"),
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    }, {
                        xtype: 'checkboxgroup',
                        reference: 'projectsgroup',
                        columns: 3,
                        vertical: true,
                        fieldLabel: T.__("Project"),
                        items: this.buildProjects(),
                        listeners: {
                            specialkey: 'submitOnEnter'
                        }
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Release',
                margin: 5,
                padding: 5,
                checkboxToggle : true,
                collapsed: true,
                checkbox: {
                    name: 'hasRelease',
                    inputValue: 'on',
                    uncheckedValue: 'off'
                },
                // checkboxName: 'hasRelease',
                autoHeight:true,
                items: [
                    {
                        xtype: 'radiogroup',
                        padding: '5 5 5 100',
                        columns: 1,
                        vertical: true,
                        items: [
                            {
                                xtype: 'radiofield',
                                name: 'releaseType',
                                boxLabel: T.__("Wait for Release?"),
                                inputValue: 'free',
                                checked: true,
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            }, {
                                xtype: 'radiofield',
                                name: 'releaseType',
                                boxLabel: T.__("All Release (include committed)"),
                                inputValue: 'all',
                                listeners: {
                                    specialkey: 'submitOnEnter'
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    }
});