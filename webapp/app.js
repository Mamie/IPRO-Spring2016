console.log("quiz questions based on http://www.chemistry.uoguelph.ca/educmat/chm19104/nomenclature/quizes.html")

var app = angular.module('quizApp', []);



app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
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
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id,scope.score);
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					console.log(scope.id/10*100+'%');
					$('.progress-bar').css('width', scope.id/10*100+'%');
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {				
				switch( scope.type ) {
					case "0":
						if(!$('input[name=answer]:checked').length) return;

						var ans = $('input[name=answer]:checked').val();

						if(ans == scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "1":
						var ans = $('textarea').val();
						if (!ans.length) return;
						if (ans == scope.answer) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "3":
						scope.correctAns = false;
						break;
				}
				
				

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.directive('quiz2', function(quizFactory2) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template22.html',
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
			}

			scope.getQuestion = function() {
				var q = quizFactory2.getQuestion(scope.id,scope.score);
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					console.log(scope.id/10*100+'%');
					$('.progress-bar').css('width', scope.id/10*100+'%');
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {				
				switch( scope.type ) {
					case "0":
						if(!$('input[name=answer]:checked').length) return;

						var ans = $('input[name=answer]:checked').val();

						if(ans == scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "1":
						var ans = $('textarea').val();
						if (!ans.length) return;
						if (ans == scope.answer) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "3":
						scope.correctAns = false;
						break;
				}
				

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.directive('quiz3', function(quizFactory3) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template3.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
				score=0;
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory3.getQuestion(scope.id,scope.score);
				if(q) {
					
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					console.log(scope.id/10*100+'%');
					$('.progress-bar').css('width', scope.id/10*100+'%');
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {				
				switch( scope.type ) {
					case "0":
						if(!$('input[name=answer]:checked').length) return;

						var ans = $('input[name=answer]:checked').val();

						if(ans == scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "1":
						var ans = $('textarea').val();
						if (!ans.length) return;
						if (ans == scope.answer) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "3":
						scope.correctAns = false;
						break;
				}
				

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.directive('quiz4', function(quizFactory4) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template4.html',
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
			}

			scope.getQuestion = function() {
				var q = quizFactory4.getQuestion(scope.id);
				if(q) {
					scope.hint=q.hint;
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
					$('textarea').val('');
					console.log(scope.id/3*100+'%');
					$('.progress-bar').css('width', scope.id/3*100+'%');
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {				
				switch( scope.type ) {
					case "0":
						if(!$('input[name=answer]:checked').length) return;

						var ans = $('input[name=answer]:checked').val();

						if(ans == scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "1":
						var ans = $('textarea').val();
						if (!ans.length) return;
						if (ans == scope.answer) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case "3":
						scope.correctAns = false;
						break;
				}
				

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{	
			type: '0',
			question: "Select a correct IUPAC name for the structure below.",
			options: ["2-iodo-4-ethyl-4-methylpentane", "3,3-dimethyl-5-iodohexane", "2-iodo-4,4-dimethylhexane", "2-ethyl-2-methyl-4-iodopentane"],
			imgs:'1.PNG',
			answer: 2
		},
		{
			type: '0',
			question: "Select a correct IUPAC name for the structure below.",
			options: ["1-ethyl-1-isopropylhexane", "2-methyl-3-ethyloctane", "3-ethyl-2-methyloctane", "2-methyl-3-pentylpentane"],
			imgs:'2.PNG',
			answer: 2
		},
		{
			type: '0',
			question: "Select a correct IUPAC name for the structure below.",
			options: ["2-methyl-3-ethylheptane", "3-butyl-2-methylpentane", "3-ethyl-2-methylheptane", "5-isopropylheptane"],
			imgs:'3.PNG',
			answer: 2
		},
		{
			type: '1',
			question: "Name the following compound according to the IUPAC system",
			options: [],
			imgs:'4.PNG',
			answer: '2-ethyl-1,1-dimethylcyclopropane'
		},
		{
			type: '1',
			question: "Name the following compound according to the IUPAC system",
			options: [],
			imgs: '6.PNG',
			answer: '3-ethyl-2-methylpentane'
		},
		{	
			type: '3', 
			question: "Build 5-ethyl-2,3,4-trimethylheptane.",
			options: [],
			imgs:'',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build 2-chlorobutane.",
			options: [],
			imgs:'',
			answer: 'C(CO)C(CO)CI'
		},
		{	
			type: '3', 
			question: "Build 2-ethylthiobutane.",
			options: [],
			imgs:'',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build 1- methoxybutane.",
			options: [],
			imgs:'',
			answer: 'CCC(O)(O)OC'
		}
	];
var question2 = [
		
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-1.PNG',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-2.PNG',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-3.PNG',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-4.PNG',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-5.PNG',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-6.PNG',
			answer: '?'
		},
		{	
			type: '3', 
			question: "Build the following molecule",
			options: [],
			imgs:'23-7.PNG',
			answer: 'CCC(O)(O)OC'
		}
	];
	return {
		getQuestion: function(id, score) {
			if(id < 10 /*questions.length*/) {
				if(score < 5)
				{
					return question2[Math.floor(Math.random() * question2.length)/*id*/];

				} else
				{
					return questions[Math.floor(Math.random() * questions.length)/*id*/];
				}
			} else {
				return false;
			}
		}
	};
});

app.factory('quizFactory2', function() {
	var questions = [
		{	
			type: '0',
			question: "Select a correct configuration of the following molecule?",
			options: ["S", "R"],
			imgs:'21-1.PNG',
			answer: 0
		},
		{	
			type: '0',
			question: "Select a correct configuration of the following molecule?",
			options: ["S", "R"],
			imgs:'21-2.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: "Select a correct configuration of the following molecule?",
			options: ["S", "R"],
			imgs:'21-3.PNG',
			answer: 0
		},
		{	
			type: '0',
			question: "Select a correct configuration of the following molecule?",
			options: ["S", "R"],
			imgs:'21-4.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: "Select a correct configuration of the following molecule?",
			options: ["S", "R"],
			imgs:'21-5.PNG',
			answer: 0
		},
		
		{	
			type: '0',
			question: "Select a correct configuration of the following molecule?",
			options: ["S", "R"],
			imgs:'21-6.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: "Is the molecule chiral or achiral",
			options: ["chiral", "achiral"],
			imgs:'22-1.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: "Is the molecule chiral or achiral",
			options: ["chiral", "achiral"],
			imgs:'22-2.PNG',
			answer: 1
		},
		{	
			type: '0',
			question: "Is the molecule chiral or achiral",
			options: ["chiral", "achiral"],
			imgs:'22-3.PNG',
			answer: 0
		},
		{	
			type: '0',
			question: "Is the molecule chiral or achiral",
			options: ["chiral", "achiral"],
			imgs:'22-4.PNG',
			answer: 1
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-1.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-2.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-3.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-4.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-5.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-6.PNG',
			answer: 'S'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-7.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-8.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-9.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-10.PNG',
			answer: 'R'
		},
		{
			type: '1',
			question: "What is the configuration of the following molecule?",
			options: [],
			imgs: '20-11.PNG',
			answer: 'R'
		}
		
	];
var questions2 = [
		{	
			type: '3', 
			question: "Build 5-ethyl-2,3,4-trimethylheptane.",
			options: [],
			imgs:'',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build 5-ethyl-2,3,4-trimethylheptane.",
			options: [],
			imgs:'',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		}
		];
	return {
		getQuestion: function(id,score) {
			if(id < 10 /*questions.length*/) {
				if(score > 9)
				{
					return questions2[Math.floor(Math.random() * questions2.length)/*id*/];

				} else
				{
					return questions[Math.floor(Math.random() * questions.length)/*id*/];
				}
			}else 
			{
				return false;
			}
		}
	};
});

app.factory('quizFactory3', function() {
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
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'25-8.PNG',
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
var questions2 = [
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'24-1.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'24-2.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'24-3.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'24-4.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'11.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		}
		];
var questions3 = [
		{
			type: '1',
			question: "What is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: [],
			imgs: '14.PNG',
			answer: 'CH3CH2O-Na+ethanol'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'24-6.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{	
			type: '3', 
			question: "Build the result of the reaction sequence shown?",
			options: [],
			imgs:'24-5.PNG',
			answer: 'CCC(CC)C(C)C(C)C(C)C'
		},
		{
			type: '1',
			question: "What is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: [],
			imgs:'13.PNG',
			answer: 'NaSH; DMSO'
		},
		{
			type: '1',
			question: "What is the result of the reaction sequence shown?",
			options: [],
			imgs: '16.PNG',
			answer: 'CH3CH2CH2CH2OCH3'
		},
		
		{
			type: '1',
			question: "What is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: [],
			imgs: '14.PNG',
			answer: 'CH3CH2O-Na+ethanol'
		},
		{
			type: '1',
			question: "What is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: [],
			imgs: '18.PNG',
			answer: 'i)KOH ii)DMSO'
		},
		{
			type: '1',
			question: "What is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: [],
			imgs: '19.PNG',
			answer: 'NH3'
		},
		{
			type: '1',
			question: "What is the best reaction sequence to use if one wants to accomplish the synthesis shown?",
			options: [],
			imgs: '17.PNG',
			answer: 'CH3CH2OH'
		}
		];
	return {
		getQuestion: function(id,score) {
			console.log(score);
			if(id < 10 /*questions.length*/) {
				if(score <3)
				{
					return questions2[Math.floor(Math.random() * questions2.length)/*id*/];

				} else if(score>2&& score<8)
				{
					return questions[Math.floor(Math.random() * questions.length)/*id*/];
				}
				{
					return questions3[Math.floor(Math.random() * questions3.length)/*id*/];
				}
			} else {
				return false;
			}
			
		}
	};
});

app.factory('quizFactory4', function() {
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
		},
		
	];

//	var question = questions[Math.floor(Math.random() * questions.length)];
	
	return {
		getQuestion: function(id) {
			
			if(id < 3) {
				return questions[Math.floor(Math.random() * questions.length)];
			} else {
				return false;
			}
			/*
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}*/
		}
	};
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
 
  navigator.getUserMedia(mediaOptions, success, function(e) {
    console.log(e);
	
  });
 
  function success(stream){
    var video = document.querySelector("#player");
    video.src = window.URL.createObjectURL(stream);
  }
  });
  
start = function() {

    //Compatibility
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
		btnRecord = document.getElementById("btnRecord")
        btnPhoto = document.getElementById("btnPhoto"),
		btnStop = document.getElementById("btnStop"),
        videoObj = {
            video: true,
            audio: false
        };
	$('#btnStart').prop('disabled', true);
	
    btnRecord.addEventListener("click", function() {
        var localMediaStream;

        if (navigator.getUserMedia) {
            navigator.getUserMedia(videoObj, function(stream) {              
                video.src = (navigator.webkitGetUserMedia) ? window.URL.createObjectURL(stream) : stream;
                localMediaStream = stream;
                
            }, function(error) {
                console.error("Video capture error: ", error.code);
            });

            btnStop.addEventListener("click", function() {
                localMediaStream.getVideoTracks()[0].stop();
            });

            btnPhoto.addEventListener("click", function() {
                context.drawImage(video, 0, 0, 250, 180);

            });
        }
    });
};

