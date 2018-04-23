/**
 * Created by zoubenying on 3/12/2016.
 */

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    n = n || 2;
    x = x || 3;
    s = s || '.';
    c = c || ',';
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

var Wiewind = {
    // name: 'Wiewind',
    //
    // ajaxPath: '../cake/',
    // imgPath: '../resources/img/',

    buildInfo: function (info) {
        return '<div  class="login-info"><b>' + info + '</b></div>';
    },

    // this is JQuery function
    countJump: function (time, url, divId, msg){
        if (!divId) {
            divId = 'counterForJump';
        }
        if (!msg) {
            msg = 'After %d seconds return to the ' + url + '...';
        }
        var jumpTo = $('#' + divId);
        if (jumpTo.length === 0) {
            $('body').append('<div id="' + divId + '" style="padding:20px;border:1px solid #2c6877;border-bottom:0;position:absolute;bottom:0;right:10px;background-color:#cbddf3;"></div>');
            jumpTo = $('#' + divId);
        }
        jumpTo.html(Wiewind.String.sprintf(msg, time));
        if(--time >= 0){
            setTimeout("Wiewind.countJump("+time+", '"+url+"', '"+divId+"', '"+msg+"')", 1000);
        } else{
            jumpTo = null;
            location.href = url;
        }
    },

    check: function (item, recursive) {
        recursive = recursive || false;
        if (recursive && Array.isArray(item) && item.length > 0) {
            var reg = true;
            item.forEach(function (i) {
                reg = reg && Wiewind.check(i, false);
            });
            return reg;
        }

        if (typeof item === 'string' && Wiewind.Array.in_array(item, ['', '0', 'null', 'false', 'off', 'undefined'])) {
            return false
        } else if (typeof item === 'object') {
            return !Wiewind.isEmpty(item);
        }
        return Boolean(item);
    },

    isEmpty: function (obj) {
        var prop = '';
        for (prop in obj) {
            return false;
        }
        return true;
    },

    String: {
        nl2br: function (str) {
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2');
        },
        sprintf: function () {
            var args = arguments,
                string = args[0],
                i = 1;
            return string.replace(/%((%)|s|d)/g, function (m) {
                // m is the matched format, e.g. %s, %d
                var val = null;
                if (m[2]) {
                    val = m[2];
                } else {
                    val = args[i];
                    // A switch statement so that the formatter can be extended. Default is %s
                    switch (m) {
                        case '%d':
                            val = parseFloat(val);
                            if (isNaN(val)) {
                                val = 0;
                            }
                            break;
                    }
                    i++;
                }
                return val;
            });
        },
        ucfirst: function (str) {
            return str.substring(0,1).toUpperCase()+str.substring(1);
        },

        lcfirst: function (str) {
            return str.substring(0,1).toLowerCase()+str.substring(1);
        },

        replaceAll: function (str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

    },

    Date: {
        getDateStr: function (addDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            m = m < 10 ? "0" + m : m;
            var d = dd.getDate();
            d = d < 10 ? "0" + d : d;

            return y+"-"+m+"-"+d;
        },

        getDate: function (menge, unit) {
            unit = unit || 'd';
            var dd = new Date();
            switch (unit.toLowerCase()) {
                case 'y':
                    dd.setFullYear(dd.getFullYear() + menge);
                    break;
                case 'm':
                    dd.setMonth(dd.getMonth() + menge);
                    break;
                default:
                    dd.setDate(dd.getDate()+menge);
                    break;
            }
            return new Date(dd);
        }
    },

    Time: {
        display: function (time, format) {
            format = format || 'HH:mm';
            var farr = format.split(':'),
                str = '';
            if (farr.length > 1) {
                for (var i=0; i<farr.length; i++) {
                    if (str.length > 0) str += ':';
                    str += Wiewind.Time.display(time, farr[i].toLowerCase());
                }
            } else {
                var arr = time.split(':');
                switch (format) {
                    case 'h':
                        str = Wiewind.Number.displayIntZerofill(arr[0], 1);
                        break;
                    case 'hh':
                        str = Wiewind.Number.displayIntZerofill(arr[0], 2);
                        break;
                    case 'm':
                        str = Wiewind.Number.displayIntZerofill(arr[1], 1);
                        break;
                    case 'mm':
                        str = Wiewind.Number.displayIntZerofill(arr[1], 2);
                        break;
                    case 's':
                        str = Wiewind.Number.displayIntZerofill(arr[2], 1);
                        break;
                    case 'ss':
                        str = Wiewind.Number.displayIntZerofill(arr[2], 2);
                        break;
                    default:
                        str = format;
                        break;
                }
            }
            return str;
        }
    },

    Math: {
        round: function (number, precision) {
            return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
        }
    },

    Array: {
        in_array: function (e, arr) {
            for(i=0; i<arr.length; i++) {
                if (arr[i] == e) return true;
            }
            return false;
        }
    },

    File: {
        getFileSuffix: function (filename) {
            var pos = filename.lastIndexOf('.');
            if (pos === false) return '';
            return filename.substring(pos+1).toLowerCase();
        }
    },

    Number: {
        format: function (number, decimals, decPoint, thousandsSep) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            decimals = decimals || 0;
            decPoint = decPoint || Cake.formatting.decimal_separator;
            thousandsSep = thousandsSep || Cake.formatting.thousands_separator;
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
                dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k).toFixed(prec);
                };
            // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },

        displayNumber: function (number, decimals) {
            decimals = decimals || 0;
            return Wiewind.Number.format(number, decimals, ',', '.');
        },

        displayInt: function (number) {
            return Wiewind.Number.format(number, 0, ',', '.');
        },

        displayNumberOptional: function (number, decimals) {
            var iNumber = Wiewind.Number.displayInt(number);
            if (number == iNumber) return iNumber;
            return Wiewind.Number.displayNumber(number, decimals);
        },

        displayIntZerofill: function (number, length) {
            if (number) {
                var intN = parseInt(number);
                if (intN) {
                    number = String(intN)
                } else {
                    number = '0';
                }
            }
            while (number.length < length) {
                number = '0' + number;
            }
            return number;
        }
    },

    Action: {
        setClipboardText: function (text) {
            var id = "mycustom-clipboard-textarea-hidden-id";
            var existsTextarea = document.getElementById(id);

            if(!existsTextarea){
                var textarea = document.createElement("textarea");
                textarea.id = id;
                // Place in top-left corner of screen regardless of scroll position.
                textarea.style.position = 'fixed';
                textarea.style.top = 0;
                textarea.style.left = 0;

                // Ensure it has a small width and height. Setting to 1px / 1em
                // doesn't work as this gives a negative w/h on some browsers.
                textarea.style.width = '1px';
                textarea.style.height = '1px';

                // We don't need padding, reducing the size if it does flash render.
                textarea.style.padding = 0;

                // Clean up any borders.
                textarea.style.border = 'none';
                textarea.style.outline = 'none';
                textarea.style.boxShadow = 'none';

                // Avoid flash of white box if rendered for any reason.
                textarea.style.background = 'transparent';
                document.querySelector("body").appendChild(textarea);
                existsTextarea = document.getElementById(id);
            }

            existsTextarea.value = text;
            existsTextarea.select();

            try {
                var status = document.execCommand('copy');
                if(!status){
                    throw '<?= __("Copy to clipboard failed!") ?>';
                }
            } catch (e) {
                var msg = ((typeof e) === 'string') ? e : e.name;
                APP.MBox.failure(msg);
            }
        },

        showTrackMauseComponent: function (context, event1) {
            var id = 'trackmausecomp';
            var comp = document.getElementById(id);
            if (!comp) {
                comp = document.createElement('div');
                comp.id = id;
                comp.className = 'track_mause_div';
                document.querySelector("body").appendChild(comp);
            }
            comp.innerHTML = context;
            comp.style.display = 'block';
            comp.style.left = Number(event1.clientX + 10) + "px";
            comp.style.top = Number(event1.clientY + 10) + "px";

            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                comp.style.left = Number(oEvent.clientX + 10) + "px";
                comp.style.top = Number(oEvent.clientY + 10) + "px";
            };
            document.onmouseup = function () {
                document.onmousemove = function () {};
                comp.style.display = 'none';
            };
        },

        // this is JQuery function
        enterEvent: function (event, fn) {
            if (event.keyCode == 13) {
                fn();
            }
        },

        getKeyCode: function (e) {
            var code;

            if (!e) e = window.event;

            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;

            return code;
        },

        click: function (option) {
            var a = document.createElement('a');
            for (var key in option) {
                if (key === 'url') {
                    a.href = option[key];
                } else {
                    a[key] = option[key];
                }
            }
            a.click();
        }
    },

    detectOrient: function () {
        var mql = window.matchMedia("(orientation: portrait)");
        if(mql.matches) {
            return 'portrait'; // 竖屏
        }
        return 'landscape'; // 横屏
    }
};