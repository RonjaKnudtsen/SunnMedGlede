/* Global connection to the firebase server
 * Firebaseurl, apikey etc is saved as app "constants" in the sunn_sterk.session module
 * in the file firebase_api_keys.js which is hidden from github. See config_firebase_api_keys to set up your own firebase. 
 */
var app = angular.module('sunn_sterk.services', ['firebase']);
console.log("Angular services");

//---- Can get all data if path is provided
//Must also check for authentication
app.factory('DataService', function(Firebase, $firebaseObject, $firebaseArray){
	console.log("DataService");
	var factory = {};
	//var dataRef = Firebase.rootRef.child('home');

	/*factory.getAllDataInfo = function(){
		return $firebaseArray(packageRef);
	}*/

	factory.getData = function(path){
		var dataRef = Firebase.rootRef.child(path);
		console.log("path: "+path);
		return $firebaseObject(dataRef);
	}

	factory.updateData = function(data, path){
	/*	console.log("DATA: ");
		console.log(data);
		console.log("PATH: ");
		console.log(path);



	  firebase.database().ref(path).set({
	    text: data.text,
	    title: data.title,
	   // profile_picture : imageUrl
	  });*/


	}
	factory.postData = function(data){

	}

	return factory;
});

app.factory('PackageServices', function(Firebase, $firebaseObject, $firebaseArray){
	console.log("PackageServices");
	var factory = {};
	var packageRef = Firebase.rootRef.child('packages');

	factory.getPackages = function(){
		return $firebaseArray(packageRef);
	}
	factory.getPackage = function(packagename){
		return $firebaseObject(packageRef.child(packagename));
	}

	factory.postReview = function(review){

	}
	factory.updateReview = function(review){

	}

	return factory;
});
	
app.factory('ProgramServices', function(Firebase, $firebaseObject, $firebaseArray){
	console.log("PackageServices");
	var factory = {};
	var programRef = Firebase.rootRef.child('programs');

	factory.getProgram = function(){
		return $firebaseArray(programRef);
	}
	factory.getProgram = function(programname){
		return $firebaseObject(programRef.child(programname));
	}

	factory.postReview = function(review){

	}
	factory.updateReview = function(review){

	}

	return factory;
});
	
