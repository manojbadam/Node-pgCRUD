var app = angular.module("app",[]);

app.controller("testCtrl",function($scope,$http){
	$scope.resultHTML = "Test Html";

	$scope.Insert = function(){
		alert("Hello");
		$http.post("http://localhost:5433/postMatchPred",{"username":"manoj", "matchid" : "1","selection": "KKR"}).success(function(html){
			$scope.resultHTML = html;
		});
	}
	

});