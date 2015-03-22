var app = angular.module("app",[]);

app.controller("DataController",function($scope,$http){
	var listRecords = function(){
	 	$http.get("http://localhost:5433/")
	 		.then(function(res){
				$scope.data = res.data;	
			},function(err){
				$scope.data = err;
			});
	}
	listRecords();
	$scope.Insert = function(fname,lname){
		$http.post("http://localhost:5433/Insert",{"fname":fname, "lname" : lname}).success(function(html){
			$scope.resultHTML = html;
		})
	}
	$scope.getRecords = function(){
		$scope.resultHTML = "";
		$scope.newFname = "";
		$scope.newLname = "";
		listRecords();
	}
	$scope.update = function(obj){
		$http.post("http://localhost:5433/Update",{"fname":obj.fname,"id":obj.id}).success(function(html){
			$scope.resultHTML = html;
		})
	}

	$scope.Delete = function(obj){
		$http.post("http://localhost:5433/del",{"id":obj.id}).success(function(html){
			$scope.resultHTML = html;
		})
	}

});