//To use the controller: angular.module('sunn_sterk.controllers').controller('new-controller-name', function($scope...){...})
angular.module('sunn_sterk.session', []); //Session before services
angular.module('sunn_sterk.services', ['sunn_sterk.session']); //Services before session

angular.module('sunn_sterk.controllers', ['sunn_sterk.services']); 
angular.module('sunn_sterk.directive', ['sunn_sterk.session', 'ui.bootstrap']);

var app = angular.module('sunn_sterk', ['ui.router', 'sunn_sterk.controllers', 'sunn_sterk.services','sunn_sterk.session', 'sunn_sterk.directive','ngSanitize' ]);
/*
Hjem - Home 
  Pakker - Packages/{packagename}
    Programoversikt - Program/{programname}
      Programbestilling - Programorder
    }
*/
app.run(function(AuthService){
 AuthService.watch();
 //Watches for log in or log out. 
});

app.config(function($stateProvider, $urlRouterProvider){
  console.log("TEST");
  $stateProvider
  .state('home',{
    url: "/home",
    templateUrl: "templates/home.html",
    controller: "home-controller",
  })
  .state('home.edit', {
    url: "/edit",
    templateUrl: "templates/home.html",
    controller: "home-controller",
    resolve: {
      userAuthenticated : ["AuthService", function(AuthService){
       return AuthService.resolve();
     }]
   }
  })
  .state('package',{
    url: "/package/{packagename}",
    controller: "package-controller",
    templateUrl: "templates/packages.html",
  })
  .state('package.edit', {
    url: "/edit", //Dont't include package/packagename, its inherited. 
    controller: "package-controller",
    templateUrl: "templates/packages.html"
  })
  .state('program',{
    url: "/program/{programname}",
    templateUrl: "templates/program.html",
    controller: "program-controller",
   })
  .state('program.edit',{
    url: "/edit",
    templateUrl: "templates/program.html",
    controller: "program-controller",
  })
  
  $urlRouterProvider.otherwise('/home');
});
