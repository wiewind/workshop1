/**
 * Created by benying.zou on 09.02.2018.
 */
Ext.define ('WWS.view.worknotes.release.GridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.worknotesreleasegrid',

    onSetFinish: function (grid, rowIndex, colIndex) {
        var store = grid.getStore(),
            rec = store.getAt(rowIndex),
            newValue = (rec.get('finished')) ? 0: 1;
        Glb.Ajax({
            url: Cake.api.path + '/WorknoteReleases/json/setFinished',
            params: {
                worknoteRelease_id: rec.get('id'),
                value: newValue
            },
            success: function(response){
                store.reload();
                var naviPanel = Ext.ComponentQuery.query('worknotesnavipanel')[0];
                naviPanel.getStore().reload();
            }
        });
    },

    onDelete: function(grid, rowIndex, colIndex) {
        Ext.Msg.confirm(
            T.__("Delete File"),
            T.__("Are you sure you want to delete the file?"),
            function (btn) {
                if(btn === 'yes'){
                    var store = grid.getStore(),
                        rec = store.getAt(rowIndex);
                    store.remove(rec);
                    store.sync({
                        success: function () {
                            Ext.ComponentQuery.query('worknotesnavipanel')[0].getStore().reload();
                        }
                    });
                }
            }
        );
    }
});
