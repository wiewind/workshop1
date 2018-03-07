/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.projects.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesprojectsgrid',

    onDelete: function(grid, rowIndex, colIndex) {
        Ext.Msg.confirm(
            T.__("Delete Project"),
            T.__("Are you sure you want to delete the project?"),
            function (btn) {
                if(btn === 'yes'){
                    var store = grid.getStore(),
                        rec = store.getAt(rowIndex);
                    store.remove(rec);
                    store.sync({
                        success: function () {
                            Ext.ComponentQuery.query('worknotesnavipanel')[0].getStore().reload();
                            Ext.ComponentQuery.query('worknotesrecommendationpanel')[0].getViewModel().getStore('newNotes').reload();
                        }
                    });
                }
            }
        );
    }
});
