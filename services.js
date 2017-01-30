/* Global connection to the firebase server
 * Firebaseurl, apikey etc is saved as app "constants" in the sunn_sterk.session module
 * in the file firebase_api_keys.js which is hidden from github. See config_firebase_api_keys to set up your own firebase. 
 */
var app = angular.module('sunn_sterk.services', ['firebase']);
console.log("Angular services");

//---- Can get all data if path is provided
//Must also check for authentication
app.factory('DataService', function(Firebase, $firebaseObject, $firebaseArray, $http){
	console.log("DataService");
	var factory = {};
	//var dataRef = Firebase.rootRef.child('home');

	/*factory.getAllDataInfo = function(){
		return $firebaseArray(packageRef);
	}*/

	factory.getData = function(path){
		var dataRef = Firebase.rootRef.child(path);
	/*	var object = {};
		var dataRef = dataRef.orderByChild('weight').once("value",function(snapshot){
			snapshot.forEach(function(data){
				object[data.key] = data.val();
			})
			console.log(object);
			return object;
		})*/
/*
		.on('child_added', function(snapshot){
			console.log(snapshot.val());
			console.log(snapshot.val().weight);
			console.log(snapshot);
			
		});*/
		return $firebaseObject(dataRef);
	}
	factory.updateData = function(data, path){
		//All data should have an ID attatched to them
	console.log("Upload DATA: ");
		console.log(data);
		console.log("to PATH: ");
		console.log(path);

		/*upload = {
			
		}
		*/
		//Removes hash objects 
		//var upload = angular.toJson(data);
		firebase.database().ref(path).set(data);

	  /*firebase.database().ref(path).set({
	    
	   		text: data.text,
	   	 	title: data.title,
	   	 	path: data.path,

	  });*/


	}
	factory.postData = function(data, path){
		if(path!=undefined || path!=null || path == "/" || path < 10){
			console.log("DATA:"+data);
		console.log("PATH:" +path);

		 var newPostKey = firebase.database().ref().child(path).push().key;
		// data.key = newPostKey;
		 data.path = path + '/'+newPostKey;
		 console.log("POST: data");
		 console.log(data);
		  var updates = {};
		  updates[data.path] = data;
			
		return firebase.database().ref().update(updates);
		} else {
			console.log("Path is undefined or null");
			return "error";
		}
		
	}

	factory.delData = function(path){
		console.log("Deleted data on PATH: "+path);
		return firebase.database().ref(path).remove();
	}
	//Used to generate an imagelist
	factory.getImageList = function(){
		return $http({
		  method: 'GET',
		  url: 'allImages.php'
		});
		/*.then(function successCallback(response) {
		//	console.log(response);
		    // RESPONSE CONTAINS YOUR FILE LIST
		    console.log("imagelist: ");
		    console.log(response.data);
		    return response.data;

		  }, function errorCallback(response) {
		  	console.log("Error: "+response);
		  	return response;
		    // ERROR CASE

		  });*/

	}
	//A function that addsWeight to frontpage/top. Use this to update data internally. 	
	factory.addWeightKey = function(){
		//Adds weight value that can be changed on all data.
		var dataRef = Firebase.rootRef.child('frontpage/top');
		var updates = {};
		console.log("firebase:");
		var programs = $firebaseObject(dataRef);
		programs.$loaded().then(function(){
			angular.forEach(programs, function(value, key){
				updates['/'+key+'/weight'] = 1;
			});
			console.log(updates);
			return Firebase.rootRef.child('frontpage/top').update(updates);
		});
		
		
		//updates['']
		//return true;
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

	factory.getAllPrograms = function(){
		return $firebaseObject(programRef);
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
	
