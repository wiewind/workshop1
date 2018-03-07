/**
 * Created by benying.zou on 06.03.2018.
 */
Ext.define('WWS.view.addressbook.window.EditPersonInfoWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.addressbookwindoweditpersoninfo',

    submitSuccess: function (form, action) {
        var view = this.getView(),
            vm = this.getViewModel(),
            data = Ext.decode(action.response.responseText).data;
        ABox.success(
            T.__("The person has been saved."),
            function (response, options) {
                var person_id = data.id,
                    panelId = 'addressbookContactPanel_' + person_id,
                    contactPanel = Ext.getCmp(panelId);
                if (contactPanel) {
                    contactPanel.getController().loadPersonData(person_id);
                } else {
                    ABF.openContact(person_id);
                }

                ABF.refreshPerson();

                view.close();
            }
        )
    }
});