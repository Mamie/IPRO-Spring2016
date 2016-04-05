'use strict';

/**
 * @ngdoc function
 * @name quizAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quizAngularApp
 */

var SMILES;
function quiz(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'views/template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					console.log(scope.id/6*100+'%');
					$('.progress-bar').css('width', scope.id/6*100+'%');
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {				
				switch( scope.type ) {
					case '0':
						if(!$('input[name=answer]:checked').length) {
							return;
						}
						var ans = $('input[name=answer]:checked').val();

						if(ans === scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case '1':
						var ans = $('textarea').val();
						if (!ans.length) {return;}
						if (ans === scope.answer) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case '3':
						console.log('SMILES is'+SMILES);
						if(!SMILES) {return;}
						if(scope.answer === SMILES) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
				}
				

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			};

			scope.reset();
		}
	};
}
  
function quizFactory() {
	var questions = [
		{	
			type: '0',
			question: 'Select a correct IUPAC name for the structure below.',
			options: ['2-iodo-4-ethyl-4-methylpentane', '3,3-dimethyl-5-iodohexane', '2-iodo-4,4-dimethylhexane', '2-ethyl-2-methyl-4-iodopentane'],
			imgs:'1.png',
			answer: 2
		},
		{
			type: '0',
			question: 'Select a correct IUPAC name for the structure below.',
			options: ['1-ethyl-1-isopropylhexane', '2-methyl-3-ethyloctane', '3-ethyl-2-methyloctane', '2-methyl-3-pentylpentane'],
			imgs:'2.png',
			answer: 2
		},
		{
			type: '0',
			question: 'Select a correct IUPAC name for the structure below.',
			options: ['2-methyl-3-ethylheptane', '3-butyl-2-methylpentane', '3-ethyl-2-methylheptane', '5-isopropylheptane'],
			imgs:'3.png',
			answer: 2
		},
		{
			type: '1',
			question: 'Name the following compound according to the IUPAC system',
			options: [],
			imgs:'4.png',
			answer: '2-ethyl-1,1-dimethylcyclopropane'
		},
		{
			type: '1',
			question: 'Name the following compound according to the IUPAC system',
			options: [],
			imgs: '6.png',
			answer: '3-ethyl-2-methylpentane'
		},
		{	
			type: '3', 
			question: 'Build ethanol.',
			options: [],
			imgs:'',
			answer: 'CCO'
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
}
function quiz2(quizFactory2) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'views/template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};

			scope.getQuestion = function() {
				var q = quizFactory2.getQuestion(scope.id);
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					/*console.log(scope.id/6*100+'%');*/
					$('.progress-bar').css('width', scope.id/6*100+'%');
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {				
				switch( scope.type ) {
					case '0':
						if(!$('input[name=answer]:checked').length) {
							return;
						}
						var ans = $('input[name=answer]:checked').val();

						if(ans === scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case '1':
						var ans = $('textarea').val();
						if (!ans.length) {return;}
						if (ans === scope.answer) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case '3':
						console.log('SMILES is'+SMILES);
						if(!SMILES) {
							return;
						}
						if(scope.answer === SMILES) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
				}
				

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			};

			scope.reset();
		}
	};
}

function quizFactory2() {
	var questions = [
		{	
			type: '3', 
			question: 'Build water.',
			options: [],
			imgs:'',
			answer: 'HOH'
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
}

angular.module('quizAngularApp')
  .directive('quiz', quiz)
  .directive('quiz2', quiz2)
  .factory('quizFactory', quizFactory)
  .factory('quizFactory2', quizFactory2)
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

$('#start').on('click',
  function(){
  var mediaOptions = { audio: false, video: true };
 
  if (!navigator.getUserMedia) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }
 
  if (!navigator.getUserMedia){
    return alert('getUserMedia not supported in this browser.');
  }
  
  function success(stream){
    var video = document.querySelector('#player');
    video.src = window.URL.createObjectURL(stream);
  }
 
  navigator.getUserMedia(mediaOptions, success, function(e) {
    console.log(e);
  });
 

  });
  


var start = function() {
    //Compatibility
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        video = document.getElementById('video'),
		btnRecord = document.getElementById('btnRecord'),
        btnPhoto = document.getElementById('btnPhoto'),
		btnStop = document.getElementById('btnStop'),
        videoObj = {
            video: true,
            audio: false
        };
	$('#btnStart').prop('disabled', true);
	
    btnRecord.addEventListener('click', function() {
        var localMediaStream;

        if (navigator.getUserMedia) {
            navigator.getUserMedia(videoObj, function(stream) {              
                video.src = (navigator.webkitGetUserMedia) ? window.URL.createObjectURL(stream) : stream;
                localMediaStream = stream;
                
            }, function(error) {
                console.error('Video capture error: ', error.code);
            });

            btnStop.addEventListener('click', function() {
                localMediaStream.getVideoTracks()[0].stop();
            });

            btnPhoto.addEventListener('click', function() {
                context.drawImage(video, 0, 0, 250, 180);
				var data = canvas.toDataURL('image/png', 1.0), array = [];
				data = atob(data.split(',')[1]);
				for (var i=0; i<data.length; i++) {
					array.push(data.charCodeAt(i));
				}
				var file = new Blob([new Uint8Array(array)], {type:'image/png'});
				var formdata = new FormData();
				formdata.append('image', file);
				function post() {
					$.ajax({
						type: 'POST',
						data: formdata,
						url: 'http://localhost:8080/detect/',
						processData:false,
						contentType: false,
						success: handleData
					});
				}
				function handleData(serverData) {
						SMILES = serverData.SMILES;
						alert('Picture Posted. Results are ' + SMILES);
					}
				post();
            });
        }
    });
};

