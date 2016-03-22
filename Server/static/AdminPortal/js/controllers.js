angular.module('starter')
	.controller("loginCtrl", function($scope, $http, $state){
		$scope.user = {};
		$scope.doLogin = function(){
			$http.post("/api/login", {data : $scope.user})
				.success(function(response){
   				if(response.token){
						localStorage.setItem('token', response.token);
						$state.go("home");
					}
				})
				.error(function(err){
					console.log(err);
				});
		};
		
	})
	.controller("signupCtrl", function($scope, $http, $state){
		$scope.user = {};
		$scope.signupUser = function(eve){
            console.log("Hello")
			$http.post("/api/signup", {data : $scope.user})
				.success(function(response){
					console.log(response);
					$state.go("login");
				})
				.error(function(err){
					console.log(err);
				});
		};
		
		
	})
	.controller("homeCtrl", function($scope, $http){
	
		$http.get("/api/salesmen")
		.success(function(response){
			console.log(response);
		})
		.error(function(){
			console.log("Error in finding User");
		});
		
	})
	
	.controller("SalesMan", function($scope, $http, $state){
		$scope.user = {};
		$scope.signupUsersaleman = function(){
            //console.log("gtygty")
		$http.post("/api/signup", {data : $scope.user})
        .success(function(response){
			console.log(response);
			alert("Sellsmen Added");
				// .success(function(response){
					console.log(response);
					$state.go("AddSalesman");
				})
				.error(function(err){
					console.log(err);
				});
				
		};
		
	})
	.controller("AddSalesman", function($scope, $http, $state){
		 $scope.signupUsersaleman = function(){
			$http.post("/api/AddSalesman", {data : $scope.user})
				.success(function(response){
   				if(response.token){
						localStorage.setItem('token', response.token);
						$state.go("home");
					}
				})
				.error(function(err){
					console.log(Error);
				});
		};
		
	})
	
	// .controller("orderCtrl", function($scope, $http, $state){
	// 	$scope.signupUsersaleman = function(){
	// 		$http.post("/api/AddSalesman", {data : $scope.user})
	// 			.success(function(response){
   	// 			if(response.token){
	// 					localStorage.setItem('token', response.token);
	// 					$state.go("home");
	// 				}
	// 			})
	// 			.error(function(err){
	// 				console.log(Error);
	// 			});
    //     };
    // })
    
	.controller("addcompany", function($scope, $http, $state){
		$scope.signupUsersaleman = function(){
			$http.post("/api/AddSalesman", {data : $scope.user})
				.success(function(response){
   				if(response.token){
						localStorage.setItem('token', response.token);
						$state.go("home");
					}
				})
				.error(function(err){
					console.log(Error);
				});
        };
    })
    
//     .controller("orderCtrl",function($scope,$http,$state,$firebaseArray)
// {
//   //constant("FirebaseURL", "https://sellmenapp.firebaseio.com/");

//   $scope.orders={};
//   var a = "http://localhost:8000";
//   var ref =new Firebase("https://saylanifahad.firebaseio.com/order")
// //   var syncedArr = $firebaseArray(ref);
//   $scope.orders=[];

//     console.log("------Orders--------");

//     console.log($scope.orders);
//     $scope.orders = $firebaseArray(ref);

//     console.log("------$firebaseArray--------");


//     console.log($scope.orders);

//     $scope.orderComplete = function (order) {
//         $scope.orders.$remove(order);
//         alert("Order Complete")

//     }

//     $scope.signOut=function()
//     {
//         alert("Sigout");
//     }
// })