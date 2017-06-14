angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
//必须要引入的模块有两个ngAnimate\ui.bootstrap,一个都不能少,必须在这个模板加载的时候引入
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
//然后就是主控制器,没什么,注意$uibModal这个东西,也是要在控制器中引入的
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    //这里很关键,是打开模态框的过程
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,//打开时的动画开关
      templateUrl: 'myModalContent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
      controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
      size: size,//模态框的大小尺寸
      resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
        items: function () {//items是一个回调函数
          return $scope.items;//这个值会被模态框的控制器获取到
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
      $scope.selected = selectedItem;//模态框的返回值
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
  $scope.items = items;//这里就可以去外层主控制器的数据了
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
    $uibModalInstance.dismiss('cancel');
  };
});