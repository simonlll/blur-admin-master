1//为了添加订单模态框添加的 controller
angular.module('BlurAdmin.pages.tables').
      controller('OrderAddModalCtrl', function ($scope, $uibModalInstance, querys, myFactory) {

   //默认不显示OrderItem编辑页面
   $scope.isadd = false;
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

    //如果orderItem不为空,说明是在编辑orderitem
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
              //在更改成功后, 需要刷新smartTable的OrderItem列表, 先更改smartTableDataOrderItem数组
                $scope.smartTableDataOrderItem[modifyIndex] = {id: orderItemId, name: results.name, price: results.price, amount: results.amount};
              //smartTable数组中,如果数量没有变化,页面不刷新,采用下面的方法,可以刷新
                $scope.smartTableDataOrderItem=[].concat($scope.smartTableDataOrderItem);
          } else {
               myFactory.layerMsg({
                      "CN": "更改失败",
                      "EN": "Add Failed"
                  }, 5);
          }
      });
        //如果orderitem为空,说明是新添加orderitem, 在这里会存入数据库, 如果最后用户取消了订单的添加, 再在数据库中删除他们
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
                    //将新加入的OrderItem压入smartTableDataOrderItem数组,因为数量变化,会自动刷新页面
                    $scope.smartTableDataOrderItem.push({id: results._links.self.href, name: results.name, price: results.price, amount: results.amount});
                } else {
                     myFactory.layerMsg({
                            "CN": "添加失败",
                            "EN": "Add Failed"
                        }, 5);
                }
      });

      
    }
    //隐藏OrderItem编辑页面
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
              //遍历smartTableDataOrderItem, 找出待删除的OrderItem的ID
              angular.forEach( $scope.smartTableDataOrderItem, function(element, index) {
                if(element.id === orderItemId) {
                  deleteIndex = index;
                }
              });
              //将删除的OrderItem从smartTableDataOrderItem数组中移除
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

   //从smartTableDataOrderItem数组中取到待编辑OrderItem的信息
   $scope.editOrderItem = function(orderItemId){
    angular.forEach( $scope.smartTableDataOrderItem, function(element, index) {
      if(element.id === orderItemId) {
        $scope.OrderItem = {id: element.id, name: element.name, price: element.price, amount: element.amount};
      }
    });
    //显示OrderItem编辑界面
    $scope.isadd = true;

   }

   


  //添加OrderItem, 显示OrderItem编辑页面
   $scope.addneworderitem = function(){
    $scope.isadd = true;
   }

   //隐藏OrderItem编辑页面
   $scope.hide = function(){
    $scope.isadd = false;
    $scope.OrderItem = {};
   }
   

  //customer选择设定
  //经过search过滤后的名单，目前时空的
   $scope.withSearchItem = {};

  //取得所有客户的列表：


  //先初始化存储客户列表的数组
  $scope.selectWithSearchItems = [];


  //去数据库中取的所有客户的列表,并放入数组
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

  //执行上面的方法,取得客户列表
  $scope.query();

   //初始化空白的Order对象
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
      //itemsArray 存储有所有已经添加到数据库的OrderItems的键值,将他们关联到order表
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