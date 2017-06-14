angular.module('BlurAdmin.pages').factory('myFactory', function($rootScope, $http, $location, $window){
	var service = {};
	var name = "simon";
	service.getName = function(){
		return name;
	}
// http://localhost:9090/userlist?current=1&rowCount=10&searchPhrase=

service.host = "http://localhost:8099/"; 


//Ajax请求
    service.http_req = function (url, meth, op, cb) {
        $http({
            url: service.host + url,    
            method: meth,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW4iLCJjcmVhdGVkIjoxNDk2NjMwMzQ5OTQwLCJleHAiOjE0OTcyMzUxNDl9.j0Z6UzaISX9-qYwtk4LwOJPJ66Psm-06Vras37DXPFoNUc9vh50sZA8hrALLFoaYgH8N19dyR_Ew3QHpgxGrLg',
                'Authorization' : getCookie('token')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: op
        }).success(function (result) {
            cb("ok", result);
        }).error(function (result, data, status, headers, config) {
            if (data == 0) {
               console.log("请求超时，请重试");
               return;
            }
              
            
            //处理响应失败
            cb("server req error", result);
        });
    };



    //Ajax请求
    service.http_req_full = function (url, meth, op, cb) {
        $http({
            url: url,    
            method: meth,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : getCookie('token')
                // 'sessionKey': service.GetToken()
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: op
        }).success(function (result) {
            cb("ok", result);
        }).error(function (result, data, status, headers, config) {
            if (data == 0) {
               console.log("请求超时，请重试");
               return;
            }
              
            
            //处理响应失败
            cb("server req error", result);
        });
    };

      /*加载层*/
    service.loading_layer = function (val) {
        if (val == "close") {
            $("#loading_layer").remove();
        } else {
            if (getCookieLan("lang") == "En")
                $("body").prepend('<div id="loading_layer" style=" position: fixed;top: 0px;left: 0px;background: url(ui_js/images/gears_76.svg) no-repeat center center;width: 100%;height: 100%;z-index: 111;background-color: #f0f0f0;opacity: .8;"><p style="position: absolute; top: 60%; left: 50%; margin-left: -55px; font-size: 17px; color: #666; margin-top: -12px;">Loading ......</p></div>');
            else
                $("body").prepend('<div id="loading_layer" style=" position: fixed;top: 0px;left: 0px;background: url(ui_js/images/gears_76.svg) no-repeat center center;width: 100%;height: 100%;z-index: 111;background-color: #f0f0f0;opacity: .8;"><p style="position: absolute; top: 60%; left: 50%; margin-left: -55px; font-size: 17px; color: #666; margin-top: -12px;">努力加载中......</p></div>');
        }
    }


      /*layer.msg*/
    service.layerMsg = function (valueObj, ico) {
        var lans = getCookieLan("lang");
        if (lans == "Cn")
            layer.msg(valueObj.CN, {
                icon: ico
            });
        else
            layer.msg(valueObj.EN, {
                icon: ico
            });
    }

    /*验证用户输入 只输入英文和数字及下划线*/
    service.FilInput2 = function (data2, id) {
        var str = data2;
        if (str.length != 0) {
            if (str.length >= 56) {
                service.layerTips({
                    "CN": "最大长度为56位",
                    "EN": "Maximum length of 56"
                }, "#" + id, "#fd6372", 1);
                return false;
            }
            reg = /^[a-zA-Z0-9 \d_]+$/;
            if (!reg.test(str)) {
                service.layerTips({
                    "CN": "对不起，您输入的格式不正确!",
                    "EN": "Sorry, the format you entered is not correct!"
                }, "#" + id, "#fd6372", 1);
                return false;
            } else if (str == "null") {
                service.layerTips({
                    "CN": "对不起，您输入的格式不正确!",
                    "EN": "Sorry, the format you entered is not correct!"
                }, "#" + id, "#fd6372", 1);
                return false;
            } else {
                return true;
            }
        }
    }


      /*layer.tips*/
    service.layerTips = function (valueObj, id, color, posi) {
        var lans = "Cn";
        if (lans == "Cn")
            layer.tips(valueObj.CN, id, {
                tips: [posi, color]
            });
        else
            layer.tips(valueObj.EN, id, {
                tips: [posi, color]
            });
    }

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


//验证手机号码
    service.verifyPhone = function (val, cb) {
        //var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var myreg = /^1[34578]\d{9}$/;
        if (val != "") {
            if (!myreg.test(val)) {
                cb("no");
            } else {
                cb("ok");
            }
        } else {
            cb("null");
        }
    }


     //驗證郵箱
    service.verifyEmail = function (val) {
        var myreg = /^(.+)@(.+)$/;
        // var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (val != "") {

            if (!myreg.test(val)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

       //验证值
    service.verifynumber = function (val) {
        var myreg = /^\d+(\.\d+)?$/;
        if (val != "") {
            if (!myreg.test(val)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }


    service.layer_confirm = function (cn, en, cb) {
        var b2;
        var b1;
        var t;
        var c1;
        if (getCookieLan("lang") == "En") {
            c1 = en;
            b1 = "OK";
            b2 = "Cancel";
            t = "Message";
        } else {
            c1 = cn;
            b1 = "确定";
            b2 = "取消";
            t = "信息";
        }
        layer.confirm(c1, {
            btn: [b1, b2], //按钮
            title: t
        }, function () {
            cb("ok");
        }, function () {
            $('#modClose').trigger("click"); /*成功关闭模态框*/
            service.loading_layer("close");
            return;
        });
    }

    //验证是否登录
    service.IsLoginOn = function () {

        var islogin = getCookie("Islogin");
        if (islogin == null || islogin == "" || islogin == undefined || islogin == "null") {
            location.href = "auth.html";
            return;
        }
    }

     //获取token
    service.GetToken = function () {

        return  getCookie("token");
        
    }

	return service;
});