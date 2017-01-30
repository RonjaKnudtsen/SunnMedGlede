var app = angular.module('sunn_sterk.controllers', ['sunn_sterk.services', 'ui.bootstrap']); 
/* Home controller
Frontpage of SunnSterk. Contains the following components:

		1. Carousel with slides
				Slides have images and text with carousel controllers
		2. Package overview
				Intro text with heading
				3 packages with name, description and image/icon
		3. Extra-information- blocks
				With heading and text
*/
app.controller('home-controller', function($scope, $stateParams, $state, $sce, DataService, PackageServices, UserService, AuthService){

	
/*
//Data, title and images for the slider:
$scope.sliderpath = "frontpage/slider";
$scope.sliderData = DataService.getData($scope.sliderpath);
console.log("SLIDER:");

//$scope.slider.path = sliderpath;



$scope.interval = 5000;
$scope.noWrapSlides = false;
$scope.active = 0;
$scope.slider = {};
var currIndex = 0;
$scope.slideTemplate = "templates/carousel.html";

//Wait for sliderdata to be downloaded
$scope.sliderData.$loaded().then(function(){
//Then go trough each and give them an index. 
	angular.forEach($scope.sliderData, function(value, key) {
		//var newWidth = 600 + $scope.slider.length + 1;
		$scope.slider[currIndex] = value;
		$scope.slider[currIndex].id = currIndex;
		$scope.slider[currIndex].show = false;
		//$scope.slider[currIndex].show = false;
		
		console.log("curr index:" + currIndex);
		currIndex++
		

	});
	
	
	//Hide all except 0.
	
	//$scope.slider[0].show = true;

console.log($scope.slider);
});




//Caourosel controllers and settings.
//Set carousel settings.
$('.carousel').carousel({
	interval: 5000,
});


//Carousel pause button
var pause = false;	
$("#carousel-pause").click(function(){
	//console.log("click");
	$(this).toggleClass('fa-pause');
	$(this).toggleClass('fa-play');
	if(pause){
		$('#smg-carousel').carousel("cycle");
	} else{
		$('#smg-carousel').carousel("pause");
	}
	
});


$scope.slideFrom = 0;
$scope.slideTo = 1;
//angular.element('#carousel-text-0').hide();
//angular.element('#carousel-text-1').show();
//Initalize by hiding all carousel-text except the first.
$( document ).ready(function() {
 
//console.log($("#carousel-text-0"));
});
$(".carousel-text").hide();
$('#smg-carousel').on('slide.bs.carousel', function (e) {
$(".carousel-text").show();
	$scope.slideFrom  = $(this).find('.active').index();
	$scope.slideTo = $(e.relatedTarget).index();
	//$scope.slider[$scope.slideTo].show = true;
	//$scope.slider[$scope.slideFrom].show = false;
	console.log($scope.slideFrom);
	console.log($scope.slideTo);
	$("#carousel-text-"+$scope.slideFrom).hide();
	$("#carousel-text-"+$scope.slideTo).show();
	
	//$scope.slider[slideFrom].show = false;
	//$scope.slider[slideTo].show = true;
});*/
/*
$scope.isActive = function(id){
	if($scope.slideTo == id){
		return true;
	} else{
		return false;
	}
}*/





















//Text that appears before the packageovweview. 
$scope.toppath = "frontpage/top";
$scope.top = DataService.getData($scope.toppath);
/*$scope.top.$loaded().then(function(){

	 angular.forEach($scope.top, function(value, key) {
          
       });
});*/

//The actual package overview.
$scope.packageOverview = PackageServices.getPackages();

//The author of the website should be able to alter the text.
//Text that appears in bulcks after the packages have been introduced.
$scope.bottompath = "frontpage/bottom";
$scope.bottom = DataService.getData($scope.bottompath);




});


	/*
	longdesc
	shortdesc
	title
	top
	programs
	eventuelt bottom
	*/

app.controller('package-controller', function($scope, $stateParams, $state, $sce, PackageServices, DataService, ProgramServices){
	
	var packagename = $stateParams.packagename;
	$scope.package = PackageServices.getPackage(packagename);

$scope.programs = {};
$scope.programs = ProgramServices.getAllPrograms();
	$scope.programs.$loaded().then(function(){
	console.log($scope.programs);


	$scope.columnClass = function(package){
		console.log("programlength");
		console.log(package.programlength);
		if(package.programlength == 3){
			return "col-sm-4 ";
		} else {
			return "col-sm-3";
		}	
	}
	$scope.imageColumnClass  = function(package){
		console.log("programlength");
		console.log(package.programlength);
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

});
/*$scope.package.$loaded().then(function(){
	angular.forEach($scope.package.programs, function(value, key) {
	  console.log("_______PROGRAMS");
	  console.log(key + ': ' + value);
	  //KEYs are programs connected to this package. 
	  $scope.programs[key] = ProgramServices.getProgram(key);
	  $scope.programs[key].$loaded().then(function(){
	  	$scope.programs[key].path = "programs/"+key;
	  
	  	console.log($scope.programs[key]);
	  	console.log($scope.programs);
	  });

	});



});*/

/*
$scope.programs = [
		{title: "Start", time: "50 min",image: "icons/freepik_flaticon/juice.png", programname :"sunn-start" }, //Maybe also add link?
		{title: "Næringsboost", time: "6 uker",image: "icons/freepik_flaticon/dumbbell.png", programname :"sunn-neringsboost" },
		{title: "Strålende", time: "12 uker",  image: "icons/freepik_flaticon/cardiogram.png", programname :"sunn-stralende" },
		{title: "Fullstendig", time: "6 måneder", image: "icons/freepik_flaticon/cardiogram.png", programname :"sunn-fullstendig" },
	];

$scope.goals = ["Sunn matglede i hverdagen", 
"En sunn kropp i balanse",
 "Mer overskudd, energi og velvære", 
 "Redusert sukkerhunger og jevt blodsukker",
 "Gå ned i vekt(1-15kg+)",
  "Redusere % kroppsfett"];
*/

});

app.controller('program-controller', function($scope, $stateParams, $state, $sce, ProgramServices){
	var programname = $stateParams.programname;
	console.log(programname);

	$scope.program = ProgramServices.getProgram(programname);
	

});