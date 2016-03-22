angular.module('starter', ['ui.router','firebase'])
  .config(function($stateProvider, $urlRouterProvider,$httpProvider ){
    
    
    $stateProvider
      .state("login", {
        url : "/login",
        templateUrl : "/adminPortal/templates/login.html",
        controller  : "loginCtrl" 
      })
      .state("signup", {
        url : "/signup",
        templateUrl : "/adminPortal/templates/signup.html",
        controller  : "signupCtrl" 
      })
      .state("home", {
        url : "/",
        templateUrl : "/adminPortal/templates/home.html",
        controller  : "homeCtrl",
        loginCompulsory : true
      })
      
      .state("SalesMan", {
        url : "/salesman",
        templateUrl : "/adminPortal/templates/SalesMan.html",
        controller  : "SalesMan",
        loginCompulsory : true
      })
      .state("AddSalesman", {
        url : "/AddSalesman",
        templateUrl : "/adminPortal/templates/AddSalesman.html",
        controller  : "AddSalesman" 
      })
      .state("order", {
        url : "/order",
        templateUrl : "/adminPortal/templates/order.html",
        controller  : "order" 
      })
      .state("addcompany", {
        url : "/addcompany",
        templateUrl : "/adminPortal/templates/addcompany.html",
        controller  : "addcompany" 
      })
      
      
      
      $urlRouterProvider.otherwise("/login");
      
      
      $httpProvider.interceptors.push('httpInterceptor');
  })
  .run(function($rootScope, $state){
    
    $rootScope.$on("$stateChangeStart", function(event, toState){
      var firebaseLocalToken = localStorage.getItem("token");
        
      if(toState.loginCompulsory && !firebaseLocalToken){ 
        event.preventDefault();
        $state.go("login");
      }
        
    });
    
  })
  .factory("httpInterceptor", function(){
    return {
      request : function(config){
        var token = localStorage.getItem("token");
        if(token){
          config.url = config.url + "?token="+token;
        }
        return config;
      }
    }       
  })
  
   .service('MyService', function($http,$q) {
          this.getsellmen = function() {
          var q =$q.defer(); 
          $http.get('/api/getsalesmen')
          .success(function(response){
    
         q.resolve(response);
        })      
        .error(function(err){
          q.reject(err);
        })
        return q.promise;
          
        }
});