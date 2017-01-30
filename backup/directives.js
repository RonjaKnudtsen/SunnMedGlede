var app = angular.module('sunn_sterk.directive', ['sunn_sterk.session', 'ui.bootstrap']);

app.directive('login', function(AuthService){
	return{
		restrict: 'E',
		templateUrl: 'templates/login.html',
		controller: function($scope){

			  $scope.currentUser = null;


			  $scope.login = function(credentials){
			 	console.log("Trying to log in");

			  	AuthService.login(credentials).then(function (user){
			  		$("#loginModal").modal("toggle"); //Closes the login window. 
		        //	$scope.setCurrentUser(user); 
		        	console.log("LOGIN SUCCESS");
		        	$scope.$apply();
		      	}, function(err){
		        	Popup.alertPopup("<center>" + err + "</center>", "Bearly sorry");
		        	console.log("LOGIN FAILED");
		      	});
			 }

			 $scope.logout = function(){
			 	AuthService.logout().then(function(){
			 		console.log("Logout success");
			 		$scope.$apply();
			 	}, function(err){
			 		console.log("Logout failed:"+err);
			 	});
			 }
			$scope.loggedIn = false;
			$scope.loggedIn = AuthService.isLoggedIn();
			//Watch if we are beeing logged in or not. 
			$scope.$watch(AuthService.isLoggedIn, function(newVal, oldVal){
				if(newVal!=oldVal){					
					$scope.loggedIn = newVal;
				} 
			});


		},
		
	}
})

/*
The data structure.. somewhat. 
home
	slider
 		1
		 	image
		 	text
		 	title
	intro
		title
		text
	packages..
	extratext
		title
		text

1 pakke: 
tittel
introtext
goals
endtext

1 program:
tittel
introtekst
includes
focus

path
titlepath

*/
app.directive('edit', function(AuthService, DataService){
	return{
		restrict: 'E',
		scope: {
			path: "=",
			edit: "=data",
		},
		templateUrl: 'templates/edit.html',
		controller: function($scope, AuthService, DataService, $uibModal){
			$scope.editAllowed = false;
			$scope.editAllowed = AuthService.isLoggedIn();

			//Sope edit is the data we manipulate. 
		//	$scope.edit = {};
		//	console.log("path: "+$scope.path);

		/*$("#editModal").modal("toggle");
		modalInstance = $modal.open({
            templateUrl:'iframe-preview.html',
            scope: $scope
			https://github.com/angular-ui/bootstrap/issues/2110#issuecomment-54551321 
			http://stackoverflow.com/questions/18924577/scope-issues-with-angular-ui-modal */
			//$scope, $timeout, $dialog
			
			$scope.open = function(){
				console.log("OPEN");
				var modalInstance = $uibModal.open({
			      animation: true,

			      templateUrl: 'templates/editmodal.html',
			      scope: $scope,
			    });

			    

			    $scope.dismiss = function () {                
		            modalInstance.dismiss();
		        }

		       	$scope.upload = function(edit){
		       		modalInstance.close();


				 	if($scope.editAllowed == true){
				 		console.log("Upload: Edit:"); 
					 	console.log(edit);
					 	console.log("PATH: "+$scope.path);
		       		DataService.updateData(edit, $scope.path);
					 	
					 	//DataService.saveData(edit);
				 	} else{
				 		console.log("Error with authentication: Try logging in first.");
				 	}


			 }
			}
//https://angular-ui.github.io/bootstrap/#/getting_started --


/*       $scope.ok = function () {
            modalInstance.close({ my: 'data' });
        }
    */    

			//Watch if we are beeing logged in or not. 
			$scope.$watch(AuthService.isLoggedIn, function(newVal, oldVal){
				if(newVal!=oldVal){					
					$scope.editAllowed = newVal;
				} 

			});

		},
		
	}
})