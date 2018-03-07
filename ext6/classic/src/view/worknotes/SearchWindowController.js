/**
 * Created by benying.zou on 08.02.2018.
 */
Ext.define ('WWS.view.worknotes.SearchWindowController', {
    extend: 'WWS.ux.MusterFormWindowController',

    alias: 'controller.worknotessearchwindow',

    onSubmit: function () {
        var view = this.getView(),
            params = view.down('form').getValues(),
            store = Ext.ComponentQuery.query('worknotesnavipanel')[0].getViewModel().getStore('liststore');

        if (!Wiewind.isEmpty(params['project']) && params['project'] instanceof Array) {
            params['project'] = params['project'].join(',');
        }
        params['method'] = 'post';

        store.proxy.extraParams = params;
        store.load(function () {
            view.close();
        });
    }
});