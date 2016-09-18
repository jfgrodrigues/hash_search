angular.module("hashSearch").config(function($routeProvider){
	$routeProvider.when("/home",{
		templateUrl: "view/home.html",
		controller: "hashSearchCtrl"
	});
	$routeProvider.when("/privacy-policy",{
		templateUrl: "view/privacy-policy.html",
		controller: "hashSearchCtrl"
	});
	$routeProvider.when("/search",{
		templateUrl: "view/search.html",
		controller: "hashSearchCtrl"
	});
	$routeProvider.otherwise({redirectTo: "/home"});
});
