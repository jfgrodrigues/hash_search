angular.module("hashSearch").controller("hashSearchCtrl", function($scope, $http, $cookies){
	$scope.server = "http://localhost:8080";
	
	var getUser = function(){
		$http.get($scope.server+'/user', { withCredentials: true }).success(function(data){
			$scope.user = data;
		});
	}
	
	var getOauth = function(){
		$http.get($scope.server+'/getOauth').success(function(data){
			$scope.oauth = data;
		});
	}
	
	var getSearch = function(){
		$http.get($scope.server+'/search/result', { withCredentials: true }).success(function(data){
			$scope.search = data.data;
		});
	}
	
	$scope.postSearch = function(){
		var access_token_cookie = $cookies.get('access_token');
		var timestamp = new Date();
		var req = {
			method: 'POST',
			url: $scope.server+'/search/save',
			headers: {
				'Content-Type': 'application/html'
			},
			data: { 
				acces_token: access_token_cookie,
				timestamp: timestamp,
				data: $scope.search
			}
		};
		$http(req).success(function(){
			$scope.getSavedSearches();
		});
	}
	
	var getSavedSearches = function(){
		$http.get($scope.server+'/search/saved', { withCredentials: true }).success(function(data){
			$scope.savedSearches = data;
		});
	}
	
	var newSearch;
	if(typeof newSearch == 'undefined'){ newSearch = true } else { newSearch = newSearch };
	
	$scope.visualizarBuscaSalva = function(data){
		$scope.search = data;
		newSearch = false;
	}
	
	$scope.setNewSearch = function(test){
		newSearch = test;
	}
	
	$scope.isNewSearch = function(){
		return newSearch;
	}
	
	getUser();
	getOauth();
	getSearch();
	getSavedSearches();
});
