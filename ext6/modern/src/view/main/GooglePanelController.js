/**
 * Created by benying.zou on 23.02.2018.
 */
Ext.define('WWS.view.main.GooglePanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.maingoogle',

    init: function (view) {
        var lang = SSD.data.appLanguage.code || 'cn',
            langCombo = view.down('selectfield[name="language"]');
        switch (lang) {
            case 'de':
                langCombo.setValue('de');
                break;
            case 'gb':
                langCombo.setValue('en');
                break;
            default:
                langCombo.setValue('zh-cn');
                break;
        }
    },

    onChangeEngine: function (combo, newValue) {
        var view = this.getView(),
            iconCls = (newValue==='google') ? 'x-fa fa-google' : 'x-fa fa-paw';
        view.down('toolbar[docked="top"]').setTitle(combo.findRecordByValue(newValue).get('name'));
    },

    enterSubmit: function (btn, e) {
        if (Wiewind.Action.getKeyCode(e) === Ext.event.Event.ENTER) {
            this.onSearch();
        }
    },

    onSearch: function () {
        var view = this.getView(),
            engine = view.down('[name="engine"]');
        if (engine.getValue() === 'google') {
            this.onGoogleSearch();
        } else {
            this.onBaiduSearch();
        }
    },

    onGoogleSearch: function () {
        var view = this.getView(),
            searchtext = view.down('textfield[name="searchtext"]').getValue(),
            searchlanguage = view.down('selectfield[name="language"]').getValue();
        Wiewind.Action.click({
            url: 'https://www.google.com/search?q=' + searchtext + '&hl=' + searchlanguage + "&lr=lang_" + searchlanguage,
            target: '_blank'
        });
    },

    onBaiduSearch: function () {
        var view = this.getView(),
            searchtext = view.down('textfield[name="searchtext"]').getValue();
        Wiewind.Action.click({
            url: 'https://www.baidu.com/s?wd=' + searchtext,
            target: '_blank'
        });
    }
});
