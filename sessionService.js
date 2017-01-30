var app = angular.module('sunn_sterk.session');

//THis is only history, to check if logged in use AuthService.isLoggedIn().
app.constant('UserHistory', {
  email: '',
  username: '',
  uid: '',
});

app.service('Firebase', function(firebase, firebaseURL, firebaseApiKey, firebaseAuthDomain, storageBucket){
  var app = {}
  var config = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    databaseURL: firebaseURL,
    storageBucket: storageBucket,
    };
  firebase.initializeApp(config);
  app.database = firebase.database();
  app.rootRef = firebase.database().ref();
  app.storage= firebase.storage();
  app.auth = firebase.auth();
  //I en controller eller resolve kan auth.signInWithEmailAndPassword(email, pass); brukes
  
  return app;
});

app.factory('AuthService', function(Firebase, $q, $state, UserHistory){
	var authService = {};
	var loggedIn = false;

	//Returns true or false.
	authService.isLoggedIn = function(){
 		return loggedIn;
	}


	//This function watches for state changes and updates the loggedIn variable accordingly. 
	//Do not use this directly to check if a user is logged in, use the isLoggedIN()
	authService.watch = function(){
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  	console.log("watch: true");
		   loggedIn = true;
		  } else{
		  	console.log("watch: false");
		  	loggedIn = false;
		  }
		});
	}

	authService.resolve = function(){
		//Returns a promise of wether or not the user is logged in 
		var task = $q.defer();
		if(Firebase.auth.currentUser){
			console.log("RESOLVE: resolved.")
			task.resolve(Firebase.auth.currentUser);

		} else{
	    	console.log("AUTHSERVICE NOT AUTHORIZED");
		    task.reject('NOT_AUTHORIZED');
	    } return task.promise;
	}
	authService.login = function(credentials){
		authService = this;
	    const promise = Firebase.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	    promise.then(function (res){
	    	console.log("Logged in, constants saved in history");
	     	 //returns userid provider, token 
	     	UserHistory.email = credentials.email;
	      	UserHistory.uid = credentials.uid;
	      	loggedIn = true;


	      //return res.uid;
	      return credentials.email;
	    })
	    .catch(e=> console.log(e.message));
	    return promise;
	}

	authService.logout = function(){
    	const promise = Firebase.auth.signOut();
    	promise.then(function (res){
      		console.log("Signing out");    
      		loggedIn = false;  		
    	})
	    .catch(e=> console.log(e.message));
    	return promise;
  	}

  return authService;
})

app.factory('UserService', function(Firebase, $state, $firebaseObject, AuthService){
	var userService = {};
	var userRef = Firebase.rootRef.child('user');

	userService.registerUser = function(){
		return null;
	}
	userService.getCurrentUser = function(){
		return firebase.auth().currentUser;
	}
	userService.getUserRole = function(){
		return null;
	}
	return userService;

});


