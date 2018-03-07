/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.ContactPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addressbookcontactpanel',

    afterRender: function () {
        this.loadPersonData();
        this.loadGrids();
    },

    loadPersonData: function (person_id) {
        var view = this.getView(),
            vm = this.getViewModel();
        person_id = person_id || false;
        if (!person_id) {
            person_id = vm.get('id');
        }
        if (person_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/addressbook/json/getPerson',
                params: {
                    person_id: person_id
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText);
                    vm.setData(resp.data);
                },
                failure: function () {
                    ABox.error(T.__('The person does not exist.'));
                    view.close();
                }
            });
        }
    },

    loadGrids: function (person_id) {
        person_id = person_id || false;
        var vm = this.getViewModel();
        if (!person_id) {
            person_id = vm.get('id');
        }

        if (person_id > 0) {
            vm.getStore('telephoneStore').setExtraParams({person_id: person_id}).load();
            vm.getStore('emailStore').setExtraParams({person_id: person_id}).load();
            vm.getStore('addressStore').setExtraParams({person_id: person_id}).load();
        }
    },

    onClickDeletePerson: function () {
        ABF.deletePerson(this.getViewModel().get('id'));
    },

    onClickEditPersonInfo: function () {
        var vm = this.getViewModel();
         ABF.editPerson(vm);
    },

    onClickDeleteGridItem: function(grid, rowIndex, colIndex) {
        ABox.confirm(
            T.__("Are you sure you want to delete the record?"),
            function (btn) {
                grid.getStore().removeAt(rowIndex);
            }
        );
    },

    onClickAddTelephone: function () {
        var person_id = this.getViewModel().get('id');
        Ext.create('WWS.view.addressbook.window.EditGridItemWindow', {
            viewModel: {
                data: {
                    datatype: 'telephone',
                    person_id: person_id
                }
            }
        });
    },

    onClickAddEmail: function () {
        var person_id = this.getViewModel().get('id');
        Ext.create('WWS.view.addressbook.window.EditGridItemWindow', {
            viewModel: {
                data: {
                    datatype: 'email',
                    person_id: person_id
                }
            }
        });
    },

    onClickAddAddress: function () {
        var person_id = this.getViewModel().get('id');
        Ext.create('WWS.view.addressbook.window.EditGridItemWindow', {
            viewModel: {
                data: {
                    datatype: 'address',
                    person_id: person_id
                }
            }
        });
    },

    onGridItemDblClick: function (view, record) {
        var grid = view.grid,
            gridType = grid.gridType,
            data = Ext.apply(record.getData(), {
                datatype: gridType
            });

        Ext.create('WWS.view.addressbook.window.EditGridItemWindow', {
            viewModel: {
                data: data
            }
        });
    }
});