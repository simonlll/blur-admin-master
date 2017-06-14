(function () {
  	'use strict';
	angular.module("LoginApp", []).controller('LoginCtrl', function( $scope, $http, $timeout){
		$scope.user = {};

		$scope.loginfailed = false;
		
		$scope.Login = function(){

			$http({
	            url: "http://localhost:8099/auth",    
	            method: "POST",
	            timeout: 15000,
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            xhrFields: {
	                withCredentials: true
	            },
	            crossDomain: true,
	            data: {
	            "username": $scope.user.username,
	            "password": $scope.user.password
	        	}
	        }).success(function (result) {
	            setCookie("Islogin", "online");
				setCookie("token", "Bearer "+result.token);
				console.log("token:" + result.token);
				location.href = "index.html";
	        }).error(function (result, data, status, headers, config) {
	            $scope.loginfailed = true;
	        });

		};
	});
})();