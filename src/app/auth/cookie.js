//设置cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    //expires=" + exp.toGMTString() +
    document.cookie = name + "=" + $1.DES.encrypt(value) + ";path=/";
}
//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        var cookie = $1.DES.decrypt(arr[2]);
        return decodeURI(encodeURI(cookie).replace(new RegExp("%00", 'gm'), ""));
    } else {
        console.log(" cookie  null");
        return null;
    }
}
//设置cookie
function setCookieLan(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() +";path=/";
}
//获取cookie
function getCookieLan(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return arr[2];
    } else {
        console.log(" cookie  null");
        return null;
    }
}
