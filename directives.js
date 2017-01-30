/*(function () {
  'use strict';	
	tinyMCE.init({
		mode: "textareas",
		theme: "modern"
	});*/
		
var app = angular.module('sunn_sterk.directive', ['sunn_sterk.session', 'ui.bootstrap', 'ui.tinymce']);

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
			
			edit: "=data",
		},
		templateUrl: 'templates/edit.html',
		controller: function($scope, AuthService, DataService, $uibModal, $timeout){
			$scope.editAllowed = false;
			$scope.editAllowed = AuthService.isLoggedIn();

			$scope.tinymceOptions = {
				themes: "modern",
				plugins: "lists link",
				toolbar: 'undo redo | bold italic underline removeformat | link unlink | bullist numlist | fullscreen',
				statusbar:  false,
				menubar:    false,
				setup: function(editor) {
			      //Focus the editor on load
			    //	$timeout(function(){ editor.focus(); });
			    	editor.on("init", function() {
			        	console.log("init");
			    	});
			    	editor.on("click", function() {
			        	console.log("click");
			    	});
			  	}
			};

			DataService.getImageList().then(function successCallback(response) {
			//	console.log(response);
			    // RESPONSE CONTAINS YOUR FILE LIST
			    	//$scope.init();
			    $scope.images = response.data;

			  }, function errorCallback(response) {
			  	console.log("Error: "+response);
			  //	return response;
			    // ERROR CASE

			  });
			//console.log("IMAGES");
			//console.log($scope.images);
/*			$scope.images.success(function(data){
				console.log("IMAGES");
				console.log(data);	    
		  	}, function errorCallback(response) {
			  	console.log("Error: "+response);
			  	return response;
			    // ERROR CASE
		  	});*/

			$scope.open = function(){
			//	$scope.init();
				console.log("OPEN");
				console.log($scope.edit);
				var modalInstance = $uibModal.open({
			      animation: true,

			      templateUrl: 'templates/editmodal.html',
			      scope: $scope,
			    });		    

			    $scope.dismiss = function () {                
		            modalInstance.dismiss();
		        }

		       	$scope.upload = function(){	       		       		
				 	if($scope.editAllowed == true){
				 		
				 		var update = {};
				 		//Removes hashKey.
				 		angular.forEach($scope.edit, function(val, key) {
					        if(key!="$$hashKey"){
					        	update[key] = val;
					        }				    
					      });
				 		

		       			DataService.updateData(update, $scope.edit.path);
				 	} else{
				 		console.log("Error with authentication: Try logging in first.");
				 	}
					modalInstance.close();		
			 	}

			 	//Should also give option to regret/undo
			 	$scope.delete = function(){
		       		if($scope.edit.path || $scope.editAllowed == true){
		       			console.log("Ready to delete: ");
		       			console.log($scope.edit);
		       			console.log("at: "+$scope.edit.path);
		       			DataService.delData($scope.edit.path);
		       			
		       			modalInstance.close();	 
		       		}
		       		else if($scope.edit.path == null) {
		       			console.log("Missing path in: ");
		       			console.log($scope.edit);
		       			console.log($scope.edit.path);
		       			modalInstance.dismiss();
		       		} else if($scope.editAllowed == false){
		       			console.log("Error with authentication: Try logging in first.");
		       			modalInstance.dismiss();
		       		}       		      					 	
			 };
			}

			//Watch if we are beeing logged in or not. 
			$scope.$watch(AuthService.isLoggedIn, function(newVal, oldVal){
				if(newVal!=oldVal){					
					$scope.editAllowed = newVal;
				} 

			});

		},
		
	}
})


app.directive('new', function(AuthService, DataService){
	return{
		restrict: 'E',
		scope: {
			dest: "=",
			image: "=",			
		},
		templateUrl: 'templates/new.html',
		controller: function($scope, AuthService, DataService, $uibModal){
			$scope.editAllowed = false;
			$scope.editAllowed = AuthService.isLoggedIn();

			$scope.newdata = {};
			console.log("image?"+$scope.image);
			//Watch if we are beeing logged in or not. 
			$scope.$watch(AuthService.isLoggedIn, function(newVal, oldVal){
				if(newVal!=oldVal){					
					$scope.editAllowed = newVal;
				} 

			});
			//Should not be a duplicate..
			DataService.getImageList().then(function successCallback(response) {
			//	console.log(response);
			    // RESPONSE CONTAINS YOUR FILE LIST

			    $scope.imagelist = response.data;

			  }, function errorCallback(response) {
			  	console.log("Error: "+response);
			  //	return response;
			    // ERROR CASE

			 });

			$scope.new = function(){
				var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'templates/newmodal.html',
			      scope: $scope,
			    });		    

			    $scope.dismiss = function () {                
		            modalInstance.dismiss();
		        };

		       	$scope.upload = function(){
		       		modalInstance.close();	       		

				 	if($scope.editAllowed == true){
				 		console.log("NEW UPLOAD: "); 
					 	console.log($scope.newdata);
					 	console.log("dest: "+$scope.dest);

		       			DataService.postData($scope.newdata, $scope.dest);
		       			//clear object. 
		       			
					 	
					 	//DataService.saveData(edit);
				 	} else{
				 		console.log("Error with authentication: Try logging in first.");
				 	}


			 };
			}

		},
		
	}
});
/*
app.directive('delete', function(AuthService, DataService){
	return{
		restrict: 'E',
		scope: {
			data: "=",
		},
		templateUrl: 'templates/delete.html',
		controller: function($scope, AuthService, DataService, $uibModal){
			$scope.editAllowed = false;
			$scope.editAllowed = AuthService.isLoggedIn();
			//Watch if we are beeing logged in or not. 
			$scope.$watch(AuthService.isLoggedIn, function(newVal, oldVal){
				if(newVal!=oldVal){					
					$scope.editAllowed = newVal;
				} 

			});

			$scope.del = function(){
				var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'templates/delmodal.html',
			      scope: $scope,
			    });		
			    console.log("Data to delete:");
			    console.log($scope.data.path);    

			    $scope.dismiss = function () {                
		            modalInstance.dismiss();
		        };

		       	$scope.upload = function(){
		       		if($scope.data.path || $scope.editAllowed == true){
		       			console.log("Ready to delete: ");
		       			console.log($scope.data);
		       			console.log("at: "+$scope.data.path);
		       			DataService.delData($scope.data.path);
		       			$scope.data = {}; 
		       			modalInstance.close();	 
		       		}
		       		else if($scope.data.path == null) {
		       			console.log("Missing path in: ");
		       			console.log($scope.data);
		       			console.log($scope.data.path);
		       			modalInstance.dismiss();
		       		} else if($scope.editAllowed == false){
		       			console.log("Error with authentication: Try logging in first.");
		       			modalInstance.dismiss();
		       		}       		      					 	
			 };
			}

		},
		
	}
})*/