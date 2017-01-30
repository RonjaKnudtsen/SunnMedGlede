var app = angular.module('sunn_sterk.slider', ['ngAnimate']);
// 
// Thanks!  http://onehungrymind.com/build-sweet-photo-slider-angularjs-animate/ 

app.directive('slider', function(AuthService, DataService, $document, $interval){
	return{
		restrict: 'E',
		
		templateUrl: 'templates/slider.html',
	
		controller: function($scope){

			$scope.sliderpath = "frontpage/slider";
			$scope.slides = DataService.getData($scope.sliderpath);
			$scope.index = 0;
			$scope.numOfslides = 0;
			$scope.direction = 'left';
			$scope.pause = false;
			$scope.skip = false;

			$scope.setPause = function(){				
				if($scope.pause){
					$scope.pause = false;
					
				} else{
					$scope.pause = true;					
				}
			}

			$scope.pauseClass = function(){
				if($scope.pause){
					return 'fa fa-play'					
				} else{					
					return 'fa fa-pause';					
				}				
			}

			$scope.slides.$loaded().then(function(){
				console.log("Slides:");
				console.log($scope.slides);
				
				//Count slides etc.. 
				angular.forEach($scope.slides, function(value, key) {
					$scope.numOfslides++				
				});
				console.log($scope.slides);
			
				
			});
			//$scope.theTime = new Date().toLocaleTimeString();
		    $scope.loop = $interval(function () {		    	
		    	if(!$scope.pause && !$scope.skip){
		    		$scope.nextSlide();		    		
		    	} 
		    	if($scope.skip){
		    		console.log("Skip");
		    		$scope.skip = false;

		    	}		    	
		    }, 5000);



			$scope.changeSlide = function (index) {
				$scope.direction = (index > $scope.index) ? 'left' : 'right';
		        $scope.index = index;
		    };
		    $scope.isSlide= function (index) {
		        return $scope.index === index;
		    };
		    $scope.nextSlideBtn = function(){
		    	$scope.skip = true;
		    	$scope.nextSlide();
		    }

		    $scope.nextSlide = function(){
		    	 $scope.direction = 'right';
		    	 
		    	$scope.index = ($scope.index < $scope.numOfslides - 1) ? ++$scope.index : 0;
		    }
		    $scope.prevSlide = function(){
		    	$scope.direction = 'left';
		    	$scope.index = ($scope.index > 0) ? --$scope.index : $scope.numOfslides - 1;
		    }

		},
	}
			
});
