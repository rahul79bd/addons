/**
 * ptma(ptma@163.com)
 */
var Unicode = {
    toUnicode: function(value) {
        var preStr = '\\u';
        var cnReg = /[\u0391-\uFFE5]/gm;
        if (cnReg.test(value)) {
            var ret = value.replace(cnReg, function(str) {
                return preStr + str.charCodeAt(0).toString(16);
            });
            return ret;
        } else {
            return value;
        }
    },
    toChinese: function(value) {
        var uReg = /\\u(\w{4})/img;
        if (uReg.test(value)) {
            var ret = value.replace(uReg, function(str, subs) {
                return unescape('%u' + subs);
            });
            return ret;
        } else {
            return value;
        }
    }
}