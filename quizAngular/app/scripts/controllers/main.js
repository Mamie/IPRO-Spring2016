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
				var size = quizFactory.setSize;
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					$('input:radio:checked').prop('checked', false);
					$('.progress-bar').css('width', scope.id/size*100+'%');
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
			imgs:'1.PNG',
			answer: 2
		},
		{
			type: '0',
			question: 'Select a correct IUPAC name for the structure below.',
			options: ['1-ethyl-1-isopropylhexane', '2-methyl-3-ethyloctane', '3-ethyl-2-methyloctane', '2-methyl-3-pentylpentane'],
			imgs:'2.PNG',
			answer: 2
		},
		{
			type: '0',
			question: 'Select a correct IUPAC name for the structure below.',
			options: ['2-methyl-3-ethylheptane', '3-butyl-2-methylpentane', '3-ethyl-2-methylheptane', '5-isopropylheptane'],
			imgs:'3.PNG',
			answer: 2
		},
		{
			type: '1',
			question: 'Name the following compound according to the IUPAC system',
			options: [],
			imgs:'4.PNG',
			answer: '2-ethyl-1,1-dimethylcyclopropane'
		},
		{
			type: '1',
			question: 'Name the following compound according to the IUPAC system',
			options: [],
			imgs: '6.PNG',
			answer: '3-ethyl-2-methylpentane'
		},
		{	
			type: '3', 
			question: 'Build ethanol.',
			options: [],
			imgs:'',
			answer: 'CCO'
		},
		{	
			type: '3', 
			question: 'Build 5-ethyl-2,3,4-trimethylheptane.',
			options: [],
			imgs:'',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: 'Build 2-chlorobutane.',
			options: [],
			imgs:'',
			answer: 'CCC(C)Cl'
		},
		{	
			type: '3', 
			question: 'Build 2-ethylthiobutane.',
			options: [],
			imgs:'',
			answer: 'CCSC(C)CC'
		},
		{	
			type: '3', 
			question: 'Build 1-methoxybutane.',
			options: [],
			imgs:'',
			answer: 'CCCCOC'
		}
	];

	return {
		setSize: questions.length,
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
		templateUrl: 'views/template2.html',
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
				var size = quizFactory2.setSize;
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					$('input:radio:checked').prop('checked', false);
					$('.progress-bar').css('width', scope.id/size*100+'%');
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

function quizFactory2() {
	var questions = [
		{	
			type: '3', 
			question: 'Build water.',
			options: [],
			imgs:'',
			answer: 'HOH'
		},
		{	
			type: '0',
			question: 'Select a correct configuration of the following molecule?',
			options: ['S', 'R'],
			imgs:'21-1.PNG',
			answer: 0
		},
		{	
			type: '0',
			question: 'Select a correct configuration of the following molecule?',
			options: ['S', 'R'],
			imgs:'21-2.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: 'Select a correct configuration of the following molecule?',
			options: ['S', 'R'],
			imgs:'21-3.PNG',
			answer: 0
		},
		{	
			type: '0',
			question: 'Select a correct configuration of the following molecule?',
			options: ['S', 'R'],
			imgs:'21-4.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: 'Select a correct configuration of the following molecule?',
			options: ['S', 'R'],
			imgs:'21-5.PNG',
			answer: 0
		},
		
		{	
			type: '0',
			question: 'Select a correct configuration of the following molecule?',
			options: ['S', 'R'],
			imgs:'21-6.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: 'Is the molecule chiral or achiral',
			options: ['chiral', 'achiral'],
			imgs:'22-1.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: 'Is the molecule chiral or achiral',
			options: ['chiral', 'achiral'],
			imgs:'22-2.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: 'Is the molecule chiral or achiral',
			options: ['chiral', 'achiral'],
			imgs:'22-3.PNG',
			answer: 0
		},
		{	
			type: '0',
			question: 'Is the molecule chiral or achiral',
			options: ['chiral', 'achiral'],
			imgs:'22-4.PNG',
			answer: 1
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-1.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-2.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-3.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-4.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-5.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-6.PNG',
			answer: 'S'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-7.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-8.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-9.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-10.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: 'What is the configuration of the following molecule?',
			options: [],
			imgs: '20-11.PNG',
			answer: 'R'
		}
	];

	return {
		setSize: questions.length,
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
}

function quiz3(quizFactory3) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'views/template3.html',
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
				var q = quizFactory3.getQuestion(scope.id);
				var size = quizFactory3.setSize;
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					$('input:radio:checked').prop('checked', false);
					$('.progress-bar').css('width', scope.id/size*100+'%');
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
  
function quizFactory3() {
	var questions = [
		{	
			type: '0',
			question: "Which is the best reaction sequence to use if one wants to accomplish an alcohol synthesis shown? ",
			options: ["NaOH/H2O", " KMnO4/H2O", " i) Hg(OAc)2/H2O; ii) NaBH4", " i) BH3; ii)H2O2/HO"],
			imgs:'10.PNG',
			answer: 2
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-1.PNG',
			answer: 'CH3CH2CH=CH2'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-2.PNG',
			answer: 'CH3CH2CH2CH2PCH3'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-3.PNG',
			answer: 'SCH2CH3'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-4.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-5.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-6.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-7.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{
			type: '0',
			question: "Which is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: ["KMnO4/H2O", "Hg(OAc)2/H2O; ii) NaBH4", " i) KOC(CH3)3; ii) (CH3)3COH", " i) BH3; ii)H2O2/HO"],
			imgs:'12.PNG',
			answer: 2
		}
	];

	return {
		setSize: questions.length,
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
}

function quiz4(quizFactory4) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'views/template4.html',
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
				var q = quizFactory4.getQuestion(scope.id);
				var size = quizFactory4.setSize;
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					$('input:radio:checked').prop('checked', false);
					$('.progress-bar').css('width', scope.id/size*100+'%');
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
  
function quizFactory4() {
	var questions = [
		{	
			type: '3',
			question: "Build the molecule that does NOT contain carbon atoms: A) Water B) Propane C) Carbonite ",
			options: [],
			imgs:'',
			answer: '',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build a Dihydrogen Monoxide molecule.",
			options: [],
			imgs:'',
			answer: 'DHMO',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "A Cyclohexane molecule consists of 6 carbons that form a hexagon shape. Build a Cyclopentane molecule.",
			options: [],
			imgs:'',
			answer: 'C1CCCCC1',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build the molecule that is an alcohol: A) Ethane B)Ethene C)Ethanol (pictures shown?)",
			options: [],
			imgs:'',
			answer: '',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build the molecule that is an alkane: A) Ethane B)Ethene C)Ethanol (pictures shown?)",
			options: [],
			imgs:'',
			answer: '',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build a Carbon Dioxide molecule (Assume single bond piece represents double bond)",
			options: [],
			imgs:'',
			answer: 'CO2',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build a Hydrogen Peroxide molecule.",
			options: [],
			imgs:'',
			answer: 'H2O2',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build an Octane molecule.",
			options: [],
			imgs:'',
			answer: 'C8H18',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "Build a Hydrogen Molecule.",
			options: [],
			imgs:'',
			answer: 'H',
			hint:"hint",
		},
		{	
			type: '3', 
			question: "2 molecules of H2O were formed by combining 2 molecules of H2 and 1 molecule of X. Build this molecule.",
			options: [],
			imgs:'',
			answer: 'CCC(CC)C(C)C(C)C(C)C',
			hint:"hint",
		}
	];

	return {
		setSize: questions.length,
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
  .directive('quiz3', quiz3)
  .directive('quiz4', quiz4)
  .factory('quizFactory', quizFactory)
  .factory('quizFactory2', quizFactory2)
  .factory('quizFactory3', quizFactory3)
  .factory('quizFactory4', quizFactory4)
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
                context.drawImage(video, 0, 0, 640, 480);
				var data = canvas.toDataURL('image/PNG', 1.0), array = [];
				data = atob(data.split(',')[1]);
				for (var i=0; i<data.length; i++) {
					array.push(data.charCodeAt(i));
				}
				var file = new Blob([new Uint8Array(array)], {type:'image/PNG'});
				var formdata = new FormData();
				formdata.append('image', file);
				function post() {
					$.ajax({
						type: 'POST',
						data: formdata,
						url: 'https://brumebleu.pythonanywhere.com/detect/',
						processData:false,
						contentType: false,
						success: handleData
					});
				}
				function handleData(serverData) {
						SMILES = serverData.SMILES;
						alert('Picture Posted. Results are ' + SMILES);
						context.clearRect(0, 0, canvas.width, canvas.height);
					}
				post();
            });
        }
    });
};

