/**
 * Created by benying.zou on 07.02.2018.
 */
T = {
    __: function(flag, lang) {
        lang = lang || false;
        var language = (lang) ? lang : LL.getLanguage();

        if (typeof(LL[language]) === "undefined") {
            return flag;
        }

        if (typeof(LL[language][flag]) === "undefined") {
            return flag;
        }

        return LL[language][flag];
    },
    __m: function(flag, lang) {
        lang = lang || false;
        var language = (lang) ? lang : LL.getLanguage();
        var varlang = language+'_modules';

        if (typeof(LL[varlang]) === "undefined") {
            return flag;
        }

        if (typeof(LL[varlang][flag]) === "undefined") {
            return flag;
        }

        return LL[varlang][flag];
    }
};