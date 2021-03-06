var app = angular.module('UserProfileModule', ['socialLogin', 'ngRoute']);
	
app

	.config(function(socialProvider){
		socialProvider.setLinkedInKey("779g2rct9ezt1u");
	})

    .controller("UserProfileController", function($scope, $rootScope, $http, $route, $location){

    	$scope.isConnected = function() {
    		if(localStorage.getItem('linkedInImageUrl'))
    			return true;
    		return false;
    	};

    	//This event is called by the angular-social-login bower package
    	$rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
    		localStorage.setItem("linkedInImageUrl", userDetails.imageUrl);
    		$location.path('/profile');
    	});

    	$scope.fullName = $rootScope.fullName;

    	$scope.imageUrl = localStorage.getItem('linkedInImageUrl');

   		//Just remove the localstorage item then reload the route (which reinstantiates this controller)
    	$scope.removeLinkedIn = function() {
    		localStorage.removeItem('linkedInImageUrl');
    		$route.reload();
    	};

    	$scope.selectedRow = null;

		$scope.setClickedRow = function(index) {
			$scope.selectedRow = index;
		};

        $scope.getCurrentCourse = function() {
            $http.get("http://localhost:1337/vm344e.se.rit.edu/api/StudentClass.php?action=get_classIds_by_student_id&studentid=3")
                .success(function(data) {
                	$scope.currCourses = data;
                    console.log(data);
                })
                .error(function(data){
                    console.log("Error pulling data from student");
                });
    	};

    	$scope.getCurrentCourse();

        $scope.reloadRoute = function() {
            $location.path('/home');
        };
    });