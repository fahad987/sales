// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
 var app = angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})
app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    $stateProvider
    .state("login",{
        url: "/login",
        templateUrl: "view/login.html",
        controller: "loginCtrl"
    })
  
    .state("order",{
        url: "/order",
        templateUrl: "view/order.html",
        controller: "orderCtrl"
    })
    $urlRouterProvider.otherwise("login");
})
app.controller("loginCtrl",function($scope,$http,$state){
     $scope.user = {};
     var a = "http://localhost:8000";
     $scope.attemptLogin=function(){
         console.log($scope.user);
         
         $http.post(a + "/api/login", {data :$scope.user})
         
         .success(function(response){
             console.log(response);
             if(response.token){
              localStorage.setItem('token',response.token);
          localStorage.setItem('AdminId',response.AdminId);
          localStorage.setItem('email',response.Email);

        }
        $state.go("order");
      })
      .error(function(err){
        console.log(err);
      

         }); 
     }
     });
     app.controller("orderCtrl",function($scope,$http,$state,$firebaseArray){
         $scope.user = {};
         var a= "http://localhost:8000";
     
     var ref = new Firebase("https://saylanifahad.firebaseio.com/users").child("order")
var syncedArr = $firebaseArray(ref);
  console.log($scope.orders);
  $scope.placeOrders=function()    
  {
      console.log("In Order function");
      $scope.orders.SellmanId = localStorage.getItem("token");
      $scope.orders.Email = localStorage.getItem("email");
      console.log($scope.orders);
      
      syncedArr.$add($scope.orders);
      $http.post(a + "/api/placeOrder", {data: $scope.orders})
      .success(function(response){
          console.log(response);
          $state.go("login")
      })
      .error(function(err){
      
             console.log(err);
      });
  };

   
     })