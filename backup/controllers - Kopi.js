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
app.controller('home-controller', function($scope, $stateParams, $state, $sce, PackageServices, UserService, AuthService){

	

				//Making some variables: This should be fetched from database.
				var text1 = "<h2>Velkommen</h2> <p> Og gratulerer med å ta det første skrittet for å virkelig investere i deg selv! "
				+"Sunnsterk.no er veien til en sunn, energisk og strålende deg. Sammen skal vi jobbe for en sunn og sterk kropp i "
				+"balanse og oppnå dine mål. Ikke minst kan du nyte herlig, sunne oppskrifter på naturlige råvarer og starte en aktiv" 
				+"hverdag tilpasset akkurat deg og hvor du er. </p> <p>Jeg ser frem til å jobbe med deg! ";
				/* For langt.. 
				+"Ernæringsfysiolog og Personlig trener Rubina Olsen,</br> Mastergrad i Ernæring fra Universitetet i Bergen</br>"
				+"Lisensiert Personlig trener fra SAFE Education</p>";*/	
				var text2 ="<h2>Vi kan oppnå følgende resultater:</h2><p> <ul><li>Sunn mat- og treningsglede i hverdagen</li><li>En sunn og sterk kropp i balanse</li><li>Mer overskudd, energi og velvære</li><li>Maks utbytte av kosthold og trening</li><li>Gå ned i vekt (1-15 kg+)</li><li>Redusere % kroppsfett</li><li>Øke % muskelmasse</li><li>Sprekere og mer utholdende</li><li>En sterkere og mer rustet kropp</li></p>"

				var introtextstring=		"Her kan du kan velge et 1-1 veiledningsprogram program helt skreddersydd"
									+"til dine mål og behov fra hvor du er. Dette vil gi deg maks utbytte av tiden du investerer i egen helse."
									+"Uansett hvilke du velger, så følger jeg deg opp hele veien."
									+"Jeg ser frem til  å jobbe med deg!";


				var homepageInfo2 = 	"<p>&bull; Bli-kjent-konsultasjon<br>"
										+"&bull; 6 måneder fullt ut</br>"
										+"&bull; Fullstendig skreddersøm etter ditt ønske</br>"
										+"</p>"

//Scope objects: (Should also be fetched from database). 
//Slider:
$scope.slider = [
		{title: "title", text: text1, image: "images/2.JPG"},
		{title: "title", text: text2, image: "images/3.JPG"},
	];

//Text that appears before the packageovweview. 
$scope.introtext = {title: "Ønsker du å investere i egen helse, og få en sunn og sterk kropp i balanse?", text: introtextstring};
//The actual package overview.
$scope.packageOverview = PackageServices.getPackages();
console.log($scope.packageOverview);
/*$scope.packageOverview = [
		{title: "Sunn", description: "Ditt kostholdsprogram", image: "icons/freepik_flaticon/juice.png", packagename :"sunn" }, //Maybe also add link?
		{title: "Sterk", description: "Din personlige trener", image: "icons/freepik_flaticon/dumbbell.png", packagename :"sterk" },
		{title: "SunnSterk", description: "Komplett program", image: "icons/freepik_flaticon/cardiogram.png", packagename :"sunnsterk" },
	]*/
//The author of the website should be able to alter the text.
//Text that appears in bulcks after the packages have been introduced.
$scope.homepageInfoBox =[

		{title: "Matallergi, intoleranse, gravid, i barsel eller andre behov?", text: "På våre skreddersøm-programmer tilpasser vi kostholdet og treningen etter dine behov." },
		{title: "I tillegg har vi følgende timer å tilby:", text: homepageInfo2},

	]


//Caourosel controllers and settings.
//Set carousel settings.
$('.carousel').carousel({
	interval: 5000,
});
//Carousel pause button
var pause = false;	
$("#carousel-pause").click(function(){
	console.log("click");
	$(this).toggleClass('fa-pause');
	$(this).toggleClass('fa-play');
	if(pause){
		$('#carousel-example-generic').carousel("cycle");
	} else{
		$('#carousel-example-generic').carousel("pause");
	}
});


//$scope.slider[1].ng-hide();

//console.log($scope.slider[1]);
//$scope.slider[0].show = true;
//console.log($scope.slider[0]);


//Fix carousel text
//Initalize by hiding all carousel-text except the first.
$( document ).ready(function() {
    $("#carousel-text-1").fadeToggle();
console.log($("#carousel-text-0"));
});

//$scope.slider[1].active = true;
//$scope.slider[0].active = false;
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