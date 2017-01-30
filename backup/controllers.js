var app = angular.module('sunn_sterk.controllers', ['sunn_sterk.services']); 
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

//Data, title and images for the slider:
$scope.sliderpath = "home/slider/";
$scope.slider = DataService.getData($scope.sliderpath);
//$scope.slider.path = sliderpath;

//Text that appears before the packageovweview. 
$scope.introtextpath = "home/intro/";
$scope.introtext = DataService.getData($scope.introtextpath);


//The actual package overview.
$scope.packageOverview = PackageServices.getPackages();

//The author of the website should be able to alter the text.
//Text that appears in bulcks after the packages have been introduced.
var extratextpath = "home/extratext/"
$scope.extratext = DataService.getData(extratextpath);
$scope.extratext.path = extratextpath;

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
		$('#carousel-example-generic').carousel("cycle");
	} else{
		$('#carousel-example-generic').carousel("pause");
	}
});

//Fix carousel text
//Initalize by hiding all carousel-text except the first.
$( document ).ready(function() {
    $("#carousel-text-1").fadeToggle();
console.log($("#carousel-text-0"));
});

$('#carousel-example-generic').on('slide.bs.carousel', function (e) {
	var slideFrom = $(this).find('.active').index();
	var slideTo = $(e.relatedTarget).index();
	$("#carousel-text-"+slideFrom).toggle();
	//console.log($("#carousel-text-"+slideFrom));
	$("#carousel-indicator-"+slideFrom).toggleClass('active');
	$("#carousel-text-"+slideTo).fadeToggle();
	$("#carousel-indicator-"+slideTo).toggleClass('active');
})
//	$scope.slider[slideFrom].show = false;
//	$scope.slider[slideTo].show = true;

});

app.controller('package-controller', function($scope, $stateParams, $state, $sce, PackageServices){

	console.log("Package controller");
	console.log($stateParams.packagename);
	var packagename = $stateParams.packagename;
	$scope.package = PackageServices.getPackage(packagename);
	console.log($scope.package);
	//$scope.package.name = $stateParams.packagename;
	//console.log(PackageServices.getDrinks)

// Static text to be converted to firebase objects/array..

$scope.long = "Med rett kosthold får du en mye brattere kurve for å nå målet. "
+"Jeg leverer fullstendig kostholdsplaner proppfull av sunn næring helt skreddersydd "
+"til dine mål og behov fra hvor du er. Dette vil gi deg maksimalt utbytte "
+"for å nå målet ditt raskere. Uansett hvilke du velger, så følger jeg deg opp hele veien. ";

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


});

app.controller('program-controller', function($scope, $stateParams, $state, $sce, ProgramServices){
	var programname = $stateParams.programname;
	console.log(programname);

	$scope.program = ProgramServices.getProgram(programname);
	

});