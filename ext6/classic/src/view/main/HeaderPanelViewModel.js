/**
 * Created by benying.zou on 12.04.2018.
 */
Ext.define('WWS.view.main.HeaderPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.appheader',

    data: {
        from: 'EUR',
        to: 'CNH',
        menge: 1,
        result: '?'
    },

    stores: {
        currencies: {
            type: 'currencies',
            autoLoad: true
        }
    },

    formulas: {
        getResult: function (get) {
            var vm = this,
                from = get('from'),
                to = get('to'),
                menge = get('menge');
            if (from === to) {
                vm.setData({
                    result: menge.format(4, 3, SSD.data.formatting.thousands_separator, SSD.data.formatting.decimal_separator)
                }) ;
                return;
            }
            Glb.Ajax({
                url: Cake.api.path + '/currencies/json/getRate',
                params: {
                    from: from,
                    to: to,
                    menge: menge
                },
                hiddenMsg: true,
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data,
                        res = Number(data);
                    vm.setData({
                        result: res.format(4, 3, SSD.data.formatting.thousands_separator, SSD.data.formatting.decimal_separator)
                    }) ;
                }
            });
        }
    }
});