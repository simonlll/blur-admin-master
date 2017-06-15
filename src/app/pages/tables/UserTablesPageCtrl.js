/**
 * @author simon lin
 * created on 14.06.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('UserTablesPageCtrl', UserTablesPageCtrl);


  /** @ngInject */
  function UserTablesPageCtrl($scope, $filter, editableOptions, editableThemes, $uibModal, myFactory, $http, $document) {

    $scope.smartTablePageSize = 10;

    //取得用户列表
     $scope.query = function(){
        myFactory.http_req('/user', "GET", {},
                      function (err, results) {
                          if (err == "ok") {
                              $scope.smartTableData = results._embedded.user;   
                              

                          } else {
                              console.log("失败");
                          }
                      });
     } 

     $scope.query();

    // $scope.editableTableData = $scope.smartTableData.slice(0, 36);



    
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    //添加用户
    $scope.addUser = function() {

      //这里很关键,是打开模态框的过程
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,//打开时的动画开关
        templateUrl: 'app/pages/tables/modals/newuser.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
        controller: 'UserAddModalCtrl',//这是模态框的控制器,是用来控制模态框的
        size: 'lg',//模态框的大小尺寸,

        resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
          querys: function () {//items是一个回调函数
            return $scope.query;//这个值会被模态框的控制器获取到
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
        $scope.selected = selectedItem;//模态框的返回值
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
      });
      
    };


    //编辑用户
    $scope.editUser = function(itemid) {
      
      
      //这里很关键,是打开模态框的过程
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,//打开时的动画开关
        templateUrl: 'app/pages/tables/modals/edituser.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
        controller: 'UserEditModalCtrl',//这是模态框的控制器,是用来控制模态框的
        size: 'lg',//模态框的大小尺寸
        resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
          querys: function () {//items是一个回调函数

            var info = {
              querylink : $scope.query,
              itemlink: itemid
            }

            return info;//这个值会被模态框的控制器获取到

          }
        }
      });

      modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
        $scope.selected = selectedItem;//模态框的返回值
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
      });   
    };



     //删除用户
  $scope.removeUser = function(itemid){
    myFactory.layer_confirm("您是确定要删除此用户？", "Are you sure to delete the user?", function (data) {     
        $http({
            url: itemid,    
            method: 'DELETE',
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
            data: {}
        }).success(function (result) {
            myFactory.layerMsg({
                "CN": "删除成功",
                "EN": "Delete Successfully"
            }, 1);
            
            setTimeout(function () {
                $scope.query();
            }, 500);
            
        }).error(function (result, data, status, headers, config) {
            myFactory.layerMsg({
                "CN": "删除失败",
                "EN": "Delete Failed"
            }, 5);
       });

    });
  }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

  }


 
  


})();
