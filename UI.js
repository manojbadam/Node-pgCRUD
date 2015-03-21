var app = angular.module("app",[]);

app.controller("DataController",function($scope,$http){
	$http.get("http://localhost:5433/").then(function(res){
		$scope.data = res.data;	
	},function(err){
		$scope.data = err;
	});
	
});