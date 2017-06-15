1//为了添加用户模态框添加的 controller
angular.module('BlurAdmin.pages.tables').
      controller('OrderAddModalCtrl', function ($scope, $uibModalInstance, querys, myFactory) {

  
   $scope.smartTablePageSize = 10;
   //取得订单item的列表
   $scope.smartTableDataOrderItem = [];
   
   $scope.OrderItem = {};
   //存储OrderItem
   $scope.saveOrderItem = function(orderItemId){
    
    if ($scope.OrderItem.name == undefined || $scope.OrderItem.name == "") {

        myFactory.layerTips({
            "CN": "名称不能为空",
            "EN": "name can not be empty"
        }, "#itemname", "#fd6372", 1);
        $("#itemname").focus();
        return;
    }

    if ($scope.OrderItem.price == undefined || $scope.OrderItem.price == "") {

        myFactory.layerTips({
            "CN": "价格不能为空",
            "EN": "price can not be empty"
        }, "#itemprice", "#fd6372", 1);
        $("#itemprice").focus();
        return;
    }

    if(!myFactory.verifynumber($scope.OrderItem.price)) { 
        myFactory.layerTips({
            "CN": "不是数字",
            "EN": "number is not correct"
        }, "#itemprice", "#fd6372", 1);
        $("#itemprice").focus();
        return;
    }

    if ($scope.OrderItem.amount == undefined || $scope.OrderItem.amount == "") {

        myFactory.layerTips({
            "CN": "价格不能为空",
            "EN": "price can not be empty"
        }, "#itemamount", "#fd6372", 1);
        $("#itemamount").focus();
        return;
    }

    if(!myFactory.verifynumber($scope.OrderItem.amount)) { 
        myFactory.layerTips({
            "CN": "不是数字",
            "EN": "number is not correct"
        }, "#itemamount", "#fd6372", 1);
        $("#itemamount").focus();
        return;
    }


    if(orderItemId){
      myFactory.http_req_full(orderItemId, "PATCH", {
          "name": $scope.OrderItem.name,
          "price": $scope.OrderItem.price,
          "amount": $scope.OrderItem.amount
        },
      function (err, results) {
        
          if (err == "ok") {
              myFactory.layerMsg({
                  "CN": "更改成功",
                  "EN": "Modify Successfully"
              }, 1);
               var modifyIndex;
                angular.forEach( $scope.smartTableDataOrderItem, function(element, index) {
                  if(element.id === orderItemId) {
                    modifyIndex = index;
                  }
                });
                $scope.smartTableDataOrderItem[modifyIndex] = {id: orderItemId, name: results.name, price: results.price, amount: results.amount};
                $scope.smartTableDataOrderItem=[].concat($scope.smartTableDataOrderItem);
          } else {
               myFactory.layerMsg({
                      "CN": "更改失败",
                      "EN": "Add Failed"
                  }, 5);
          }
      });
     
    }else {
      var AddItemURI = "/item";
      myFactory.http_req(AddItemURI, "POST", {
            "name": $scope.OrderItem.name,
            "price": $scope.OrderItem.price,
            "amount": $scope.OrderItem.amount
        },
            function (err, results) {
              
                if (err == "ok") {
                    myFactory.layerMsg({
                        "CN": "添加成功",
                        "EN": "Add Successfully"
                    }, 1);
                    
                    $scope.smartTableDataOrderItem.push({id: results._links.self.href, name: results.name, price: results.price, amount: results.amount});
                } else {
                     myFactory.layerMsg({
                            "CN": "添加失败",
                            "EN": "Add Failed"
                        }, 5);
                }
      });

      
    }
    
    $scope.isadd=false;
    $scope.OrderItem = {};
   }
   //删除orderitem
  $scope.removeOrderItem = function(orderItemId){

    myFactory.layer_confirm("您是确定要删除此项目？", "Are you sure to delete the order item?", function (data) { 
      myFactory.http_req_full(orderItemId, "DELETE", {}, 
        function (err, results) {
          if (err == "ok") {
              myFactory.layerMsg({
                  "CN": "删除成功",
                  "EN": "delete Successfully"
              }, 1);
              var deleteIndex;

              angular.forEach( $scope.smartTableDataOrderItem, function(element, index) {
                if(element.id === orderItemId) {
                  deleteIndex = index;
                }
              });
              $scope.smartTableDataOrderItem.splice(deleteIndex,1);
          } else {
               myFactory.layerMsg({
                      "CN": "删除失败",
                      "EN": "delete Failed"
                }, 5);
          }
      });
    });
  }

   $scope.editOrderItem = function(orderItemId){
    angular.forEach( $scope.smartTableDataOrderItem, function(element, index) {
      if(element.id === orderItemId) {
        $scope.OrderItem = {id: element.id, name: element.name, price: element.price, amount: element.amount};
      }
    });

    $scope.isadd = true;

   }

   

   $scope.isadd = false;
  //添加订单项目
   $scope.addneworderitem = function(){
    $scope.isadd = true;
   }

   $scope.hide = function(){
    $scope.isadd = false;
    $scope.OrderItem = {};
   }
   

  //customer选择设定
  //经过search过滤后的名单，目前时空的
   $scope.withSearchItem = {};

  //取得所有客户的列表：
  $scope.selectWithSearchItems = [];

  $scope.query = function(){
        myFactory.http_req('/customer', "GET", {},
                      function (err, results) {
                          if (err == "ok") {
                              angular.forEach(results._embedded.customer,function(element, index) {
                                $scope.selectWithSearchItems.push({label: element.firstName + " " + element.lastName, value : element._links.self.href});
                              });  
                              

                          } else {
                              console.log("失败");
                          }
                      });
     } 

     $scope.query();

  

   $scope.OrderObj = {
        description : "",
        deliveryDate : ""
    };
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
   //这里就可以去外层主控制器的数据了
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.saveorder = function () {

     if ($scope.OrderObj.description == undefined || $scope.OrderObj.description == "") {

        myFactory.layerTips({
            "CN": "描述不能为空",
            "EN": "description can not be empty"
        }, "#description", "#fd6372", 1);
        $("#description").focus();
        return;
      }


      if ($scope.OrderObj.deliveryDate == undefined || $scope.OrderObj.deliveryDate == "") {

        myFactory.layerTips({
            "CN": "日期不能为空",
            "EN": "date can not be empty"
        }, "#deliveryDate", "#fd6372", 1);
        $("#deliveryDate").focus();
        return;
      }

      if ($scope.withSearchItem.selected == undefined || $scope.withSearchItem.selected == "") {

        myFactory.layerTips({
            "CN": "请选择一个客户",
            "EN": "please select a customer"
        }, "#withSearchItem", "#fd6372", 1);
        $("#withSearchItem").focus();
        return;
      } 

      var AddUrl = "/simonorder";
      var itemsArray = [];
      angular.forEach($scope.smartTableDataOrderItem, function(element, index) {
        itemsArray.push(element.id);
      });
      myFactory.http_req(AddUrl, "POST", {
          "description": $scope.OrderObj.description,
          "deliveryDate": $scope.OrderObj.deliveryDate,
          "customer": $scope.withSearchItem.selected.value,
          "items": itemsArray
      },
          function (err, results) {
            
              if (err == "ok") {

                $uibModalInstance.close();
                /*成功关闭模态框*/
                myFactory.layerMsg({
                    "CN": "添加成功",
                    "EN": "Add Successfully"
                }, 1);

                
                setTimeout(function () {
                    querys();
                }, 500);
              } else {
                   myFactory.layerMsg({
                          "CN": "添加失败",
                          "EN": "Add Failed"
                      }, 5);
              }
        });




    // //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
    $uibModalInstance.close();

  };
  //关闭order的模态框
  //因为没有保存这个order,所以需要删除之前存在数据库中的orderitem:
  $scope.cancel = function () {
    angular.forEach($scope.smartTableDataOrderItem, function(element, index) {
      myFactory.http_req_full(element.id, "DELETE", {}, 
      function (err, results) {
              
                if (err == "ok") {
                    
                } else {
                   
                }
    });
    });
    //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
    $uibModalInstance.dismiss('cancel');
  };
});