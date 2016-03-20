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

app.directive('quiz2', function(quizFactory) {
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
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.type = q.type;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.imgs = q.imgs;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				
				switch( scope.type ) {
					case 0:
						if(!$('input[name=answer]:checked').length) return;

						var ans = $('input[name=answer]:checked').val();

						if(ans == scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}
						break;
					case 1:
						var ans = $('textarea').val();
						if (!ans.length) return;
						if (ans == scope.answer) {
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
			imgs:'1.png',
			answer: 2
		},
		{
			type: '0',
			question: "Select a correct IUPAC name for the structure below.",
			options: ["1-ethyl-1-isopropylhexane", "2-methyl-3-ethyloctane", "3-ethyl-2-methyloctane", "2-methyl-3-pentylpentane"],
			imgs:'2.png',
			answer: 2
		},
		{
			type: '0',
			question: "Select a correct IUPAC name for the structure below.",
			options: ["2-methyl-3-ethylheptane", "3-butyl-2-methylpentane", "3-ethyl-2-methylheptane", "5-isopropylheptane"],
			imgs:'3.png',
			answer: 2
		},
		{
			type: '1',
			question: "Name the following compound according to the IUPAC system",
			options: [],
			imgs:'4.png',
			answer: '2-ethyl-1,1-dimethylcyclopropane'
		},
		{
			type: '1',
			question: "Name the following compound according to the IUPAC system",
			options: [],
			imgs: '6.png',
			answer: '3-ethyl-2-methylpentane'
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
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
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