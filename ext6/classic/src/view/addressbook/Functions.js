/**
 * Created by benying.zou on 05.03.2018.
 */
Ext.define('WWS.view.addressbook.Functions', {
    singleton: true,
    alternateClassName: ['ABF'],

    openContact: function (person_id) {
        if (person_id > 0) {
            var tabpanel = Ext.ComponentQuery.query('addressbookpanel')[0].down('tabpanel'),
                panelId = 'addressbookContactPanel_' + person_id;
            if (tabpanel) {
                var panel = Ext.getCmp(panelId);
                if (!panel) {
                    panel = Ext.create('WWS.view.addressbook.ContactPanel', {
                        id: panelId,
                        viewModel: {
                            data: {
                                id: person_id
                            }
                        }
                    });
                    tabpanel.add(panel);
                }
                tabpanel.setActiveTab(panel);
            }
        } else {
            ABF.editPerson();
        }
    },

    deletePerson: function (person_id) {
        ABox.confirm(
            T.__("Are you sure you want to delete the person?"),
            function (btn) {
                Glb.Ajax({
                    url: Cake.api.path + '/addressbook/json/deletePerson',
                    params: {
                        person_id: person_id
                    },
                    success: function () {
                        var p = Ext.getCmp('addressbookContactPanel_' + person_id);
                        if (p) {
                            p.close();
                        }
                        ABF.refreshPerson();
                    }
                });
            }
        );
    },

    editPerson: function (parentVm) {
        parentVm = parentVm || false;
        if (parentVm) {
            Ext.create('WWS.view.addressbook.window.EditPersonInfoWindow', {
                viewModel: {
                    data: parentVm.getData()
                }
            });
        } else {
            Ext.create('WWS.view.addressbook.window.EditPersonInfoWindow');
        }
    },

    refreshPerson: function () {
        var grid = Ext.ComponentQuery.query('addressbookpersongrid')[0];
        if (grid) {
            grid.getStore().reload();
        }
    },

    refreshGrid: function (person_id, datatype) {
        var panel = Ext.getCmp('addressbookContactPanel_' + person_id);
        if (panel) {
            console.log(datatype + 'Store');
            panel.getViewModel().getStore(datatype + 'Store').reload();
        }
    }
});