//为了编辑用户模态框添加的 controller
angular.module('BlurAdmin.pages.tables').
      controller('UserEditModalCtrl', function ($scope, $uibModalInstance, querys, myFactory,$http) {

         // var info = {
         //      querylink : $scope.query,
         //      itemlink: itemid
         //    }
  console.log(querys.querylink);
  console.log(querys.itemlink);

  $scope.UserObj = {
        username: "",
        firstName: "",
        lastName: "",
        age: "",
        email: ""
    };

  $http({
            url: querys.itemlink,    
            method: 'GET',
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : getCookie('token')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {}
        }).success(function (result) {
          $scope.UserObj = result;
            
        }).error(function (result, data, status, headers, config) {
            console.log("出错了");
       });
  

   
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
   //这里就可以去外层主控制器的数据了
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.saveuser = function () {

     if ($scope.UserObj.username == undefined || $scope.UserObj.username == "") {

        myFactory.layerTips({
            "CN": "用户名不能为空",
            "EN": "This user does not exist"
        }, "#username", "#fd6372", 1);
        $("#username").focus();
        return;
      }


      if ($scope.UserObj.email !== "") {
          
            if(!myFactory.verifyEmail($scope.UserObj.email)) {
                
              myFactory.layerTips({
                  "CN": "邮箱地址不正确",
                  "EN": "Address is not correct"
              }, "#email", "#fd6372", 1);
              $("#email").focus();
              return;
                
            }
      }


      if ($scope.UserObj.age !== ""&&$scope.UserObj.age!==null){
        console.log($scope.UserObj.age);
        if(!myFactory.verifynumber($scope.UserObj.age)) {
            
          myFactory.layerTips({
              "CN": "不是数字",
              "EN": "number is not correct"
          }, "#age", "#fd6372", 1);
          $("#age").focus();
          return;
            
        }
      }


      $http({
            url: querys.itemlink,    
            method: 'PUT',
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW4iLCJjcmVhdGVkIjoxNDk2NjMwMzQ5OTQwLCJleHAiOjE0OTcyMzUxNDl9.j0Z6UzaISX9-qYwtk4LwOJPJ66Psm-06Vras37DXPFoNUc9vh50sZA8hrALLFoaYgH8N19dyR_Ew3QHpgxGrLg'
                // 'sessionKey': service.GetToken()
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
              "firstName": $scope.UserObj.firstName,
              "lastName": $scope.UserObj.lastName,
              "age": $scope.UserObj.age,
              "email": $scope.UserObj.email,
              "username": $scope.UserObj.username
            }
        }).success(function (result) {
            $uibModalInstance.close();
            /*成功关闭模态框*/
            myFactory.layerMsg({
                "CN": "更改成功",
                "EN": "Modify Successfully"
            }, 1);
            
            setTimeout(function () {
                querys.querylink();
            }, 500);
            
        }).error(function (result, data, status, headers, config) {
            console.log("出错了");
       });

    //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
    $uibModalInstance.close();

  };

  $scope.cancel = function () {
    //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
    $uibModalInstance.dismiss('cancel');
  };
});