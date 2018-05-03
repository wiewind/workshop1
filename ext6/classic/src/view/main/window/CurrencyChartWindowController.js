/**
 * Created by benying.zou on 02.05.2018.
 */
Ext.define('WWS.view.main.window.CurrencyChartWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.maincurrencychartwindow',

    afterRender: function () {
        var view = this.getView();
        view.add(view.buildChart());
    },

    onClickClose: function () {
        this.closeView();
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label);
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('date') + ': ' + record.get('rate'));
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    onDuringChange: function (combo, newValue) {
        var vm = this.getViewModel();
        vm.setData({
            during: newValue
        });
        vm.getStore('rates').reload();
    }

});