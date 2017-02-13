var app = angular.module('sunn_sterk.controllers', ['sunn_sterk.services', 'ui.bootstrap']); 
/* Home controller
Frontpage of SunnSterk. Contains the following components:

		1. Carousel with slides
				Slides have images and text with carousel controllers
		2. Package overview
				Intro text with heading
		4. Programs with name, description and image/icon
		5. Extra-information- blocks
				With heading and text
*/
app.controller('home-controller', function($scope, $stateParams, $state, $sce, DataService, PackageServices, UserService, AuthService){	
	//Text that appears before the packageovweview. 
	$scope.toppath = "frontpage/top";
	$scope.top = DataService.getData($scope.toppath);

	//The actual package overview.
	$scope.packageOverview = PackageServices.getPackages();

	//Text that appears in bulcks after the packages have been introduced.
	$scope.bottompath = "frontpage/bottom";
	$scope.bottom = DataService.getData($scope.bottompath);

});

app.controller('program-controller', function($scope, $stateParams, $state, $sce, ProgramServices, MailService){
	var programname = $stateParams.programname;
	console.log(programname);
	$scope.program = ProgramServices.getProgram(programname);	
	$scope.mail ={};
	$scope.program.$loaded().then(function(){
		$scope.mail.program = $scope.program.programname + "-" + $scope.program.shortdesc;
	});	

	$scope.sendMail = function(data){
		console.log(data);
		MailService.sendMail(data);
		//console.log(result);

	}

});


app.controller('package-controller', function($scope, $stateParams, $state, $sce, PackageServices, DataService, ProgramServices){
	//Get the packagename from the state. (Its important that the correct state name is provided from the frontpage)
	var packagename = $stateParams.packagename;
	$scope.package = PackageServices.getPackage(packagename);

	$scope.programs = {};
	$scope.programs = ProgramServices.getAllPrograms();

	$scope.programs.$loaded().then(function(){
		console.log($scope.programs);
			//Add appropriate class based on how many programs we have loaded. 
		$scope.columnClass = function(package){
			console.log("programlength:"+package.programlength);
			if(package.programlength == 3){
				return "col-sm-4 ";
			} else {
				return "col-sm-3";
			}	
		}

		$scope.imageColumnClass  = function(package){
			console.log("programlength"+package.programlength);		
			if(package.programlength == 3){
				return "package-icon";
			} else {
				return "package-icon package-icon-smaller";
			}	
		}
		/*
		Structure of database:
		Package
			Programs
				id:true
				id:true
		for each on programs using key will get the corresponding programs. 
		*/
		$scope.package.$loaded().then(function(){
			console.log($scope.package);
			$scope.package.programlength = 0;
			angular.forEach($scope.package.programs, function(value, key) {
				 $scope.package.programs[key] = $scope.programs[key];
				 $scope.package.programs[key].path = "programs/"+key;
				 $scope.package.programs[key].programname = key;
				 $scope.package.programlength ++;
			});
			console.log($scope.package.programs);
		});

	}); //End of programs.$loaded

}); // End of package controller

