/**
 * Created by benying.zou on 07.02.2018.
 */
LL = {
    getLanguage: function() {
        var lang = SSD.data.appLanguage.cake_code;
        if (!lang) {
            lang = 'zho';
        }
        return lang;
    }
};