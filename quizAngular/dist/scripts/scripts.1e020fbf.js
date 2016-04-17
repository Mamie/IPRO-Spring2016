"use strict";function quiz(a){return{restrict:"AE",scope:{},templateUrl:"views/template.html",link:function(b,c,d){b.start=function(){b.id=0,b.quizOver=!1,b.inProgress=!0,b.getQuestion()},b.reset=function(){b.inProgress=!1,b.score=0},b.getQuestion=function(){var c=a.getQuestion(b.id),d=a.setSize;c?(b.type=c.type,b.question=c.question,b.options=c.options,b.answer=c.answer,b.imgs=c.imgs,b.answerMode=!0,$("textarea").val(""),$("input:radio:checked").prop("checked",!1),$(".progress-bar").css("width",b.id/d*100+"%")):b.quizOver=!0},b.checkAnswer=function(){switch(b.type){case"0":if(!$("input[name=answer]:checked").length)return;var a=$("input[name=answer]:checked").val();a===b.options[b.answer]?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"1":var a=$("textarea").val();if(!a.length)return;a===b.answer?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"3":if(console.log("SMILES is"+SMILES),!SMILES)return;b.answer===SMILES?(b.score++,b.correctAns=!0):b.correctAns=!1}b.answerMode=!1},b.nextQuestion=function(){b.id++,b.getQuestion()},b.reset()}}}function quizFactory(){var a=[{type:"0",question:"Select a correct IUPAC name for the structure below.",options:["2-iodo-4-ethyl-4-methylpentane","3,3-dimethyl-5-iodohexane","2-iodo-4,4-dimethylhexane","2-ethyl-2-methyl-4-iodopentane"],imgs:"1.png",answer:2},{type:"0",question:"Select a correct IUPAC name for the structure below.",options:["1-ethyl-1-isopropylhexane","2-methyl-3-ethyloctane","3-ethyl-2-methyloctane","2-methyl-3-pentylpentane"],imgs:"2.png",answer:2},{type:"0",question:"Select a correct IUPAC name for the structure below.",options:["2-methyl-3-ethylheptane","3-butyl-2-methylpentane","3-ethyl-2-methylheptane","5-isopropylheptane"],imgs:"3.png",answer:2},{type:"1",question:"Name the following compound according to the IUPAC system",options:[],imgs:"4.png",answer:"2-ethyl-1,1-dimethylcyclopropane"},{type:"1",question:"Name the following compound according to the IUPAC system",options:[],imgs:"6.png",answer:"3-ethyl-2-methylpentane"},{type:"3",question:"Build ethanol.",options:[],imgs:"",answer:"CCO"},{type:"3",question:"Build 5-ethyl-2,3,4-trimethylheptane.",options:[],imgs:"",answer:"CCC(CC)C(C)C(C)C(C)C"},{type:"3",question:"Build 2-chlorobutane.",options:[],imgs:"",answer:"CCC(C)Cl"},{type:"3",question:"Build 2-ethylthiobutane.",options:[],imgs:"",answer:"CCSC(C)CC"},{type:"3",question:"Build 1-methoxybutane.",options:[],imgs:"",answer:"CCCCOC"}];return{setSize:a.length,getQuestion:function(b){return b<a.length?a[b]:!1}}}function quiz2(a){return{restrict:"AE",scope:{},templateUrl:"views/template2.html",link:function(b,c,d){b.start=function(){b.id=0,b.quizOver=!1,b.inProgress=!0,b.getQuestion()},b.reset=function(){b.inProgress=!1,b.score=0},b.getQuestion=function(){var c=a.getQuestion(b.id),d=a.setSize;c?(b.type=c.type,b.question=c.question,b.options=c.options,b.answer=c.answer,b.imgs=c.imgs,b.answerMode=!0,$("textarea").val(""),$("input:radio:checked").prop("checked",!1),$(".progress-bar").css("width",b.id/d*100+"%")):b.quizOver=!0},b.checkAnswer=function(){switch(b.type){case"0":if(!$("input[name=answer]:checked").length)return;var a=$("input[name=answer]:checked").val();a===b.options[b.answer]?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"1":var a=$("textarea").val();if(!a.length)return;a===b.answer?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"3":if(console.log("SMILES is"+SMILES),!SMILES)return;b.answer===SMILES?(b.score++,b.correctAns=!0):b.correctAns=!1}b.answerMode=!1},b.nextQuestion=function(){b.id++,b.getQuestion()},b.reset()}}}function quizFactory2(){var a=[{type:"3",question:"Build water.",options:[],imgs:"",answer:"HOH"},{type:"0",question:"Select a correct configuration of the following molecule?",options:["S","R"],imgs:"21-1.PNG",answer:0},{type:"0",question:"Select a correct configuration of the following molecule?",options:["S","R"],imgs:"21-2.PNG",answer:1},{type:"0",question:"Select a correct configuration of the following molecule?",options:["S","R"],imgs:"21-3.PNG",answer:0},{type:"0",question:"Select a correct configuration of the following molecule?",options:["S","R"],imgs:"21-4.PNG",answer:1},{type:"0",question:"Select a correct configuration of the following molecule?",options:["S","R"],imgs:"21-5.PNG",answer:0},{type:"0",question:"Select a correct configuration of the following molecule?",options:["S","R"],imgs:"21-6.PNG",answer:1},{type:"0",question:"Is the molecule chiral or achiral",options:["chiral","achiral"],imgs:"22-1.PNG",answer:1},{type:"0",question:"Is the molecule chiral or achiral",options:["chiral","achiral"],imgs:"22-2.PNG",answer:1},{type:"0",question:"Is the molecule chiral or achiral",options:["chiral","achiral"],imgs:"22-3.PNG",answer:0},{type:"0",question:"Is the molecule chiral or achiral",options:["chiral","achiral"],imgs:"22-4.PNG",answer:1},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-1.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-2.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-3.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-4.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-5.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-6.PNG",answer:"S"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-7.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-8.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-9.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-10.PNG",answer:"R"},{type:"1",question:"What is the configuration of the following molecule?",options:[],imgs:"20-11.PNG",answer:"R"}];return{setSize:a.length,getQuestion:function(b){return b<a.length?a[b]:!1}}}function quiz3(a){return{restrict:"AE",scope:{},templateUrl:"views/template3.html",link:function(b,c,d){b.start=function(){b.id=0,b.quizOver=!1,b.inProgress=!0,b.getQuestion()},b.reset=function(){b.inProgress=!1,b.score=0},b.getQuestion=function(){var c=a.getQuestion(b.id),d=a.setSize;c?(b.type=c.type,b.question=c.question,b.options=c.options,b.answer=c.answer,b.imgs=c.imgs,b.answerMode=!0,$("textarea").val(""),$("input:radio:checked").prop("checked",!1),$(".progress-bar").css("width",b.id/d*100+"%")):b.quizOver=!0},b.checkAnswer=function(){switch(b.type){case"0":if(!$("input[name=answer]:checked").length)return;var a=$("input[name=answer]:checked").val();a===b.options[b.answer]?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"1":var a=$("textarea").val();if(!a.length)return;a===b.answer?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"3":if(console.log("SMILES is"+SMILES),!SMILES)return;b.answer===SMILES?(b.score++,b.correctAns=!0):b.correctAns=!1}b.answerMode=!1},b.nextQuestion=function(){b.id++,b.getQuestion()},b.reset()}}}function quizFactory3(){var a=[{type:"0",question:"Which is the best reaction sequence to use if one wants to accomplish an alcohol synthesis shown? ",options:["NaOH/H2O"," KMnO4/H2O"," i) Hg(OAc)2/H2O; ii) NaBH4"," i) BH3; ii)H2O2/HO"],imgs:"10.PNG",answer:2},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-1.PNG",answer:"CH3CH2CH=CH2"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-2.PNG",answer:"CH3CH2CH2CH2PCH3"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-3.PNG",answer:"SCH2CH3"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-4.PNG",answer:"CCC(CC)C(C)C(C)C(C)C"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-5.PNG",answer:"CCC(CC)C(C)C(C)C(C)C"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-6.PNG",answer:"CCC(CC)C(C)C(C)C(C)C"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-7.PNG",answer:"CCC(CC)C(C)C(C)C(C)C"},{type:"3",question:"Build the result of the reaction sequence shown?",options:[],imgs:"25-8.PNG",answer:"CCC(CC)C(C)C(C)C(C)C"},{type:"0",question:"Which is the best reaction sequence to use if one wants to accomplish the synthesis shown?",options:["KMnO4/H2O","Hg(OAc)2/H2O; ii) NaBH4"," i) KOC(CH3)3; ii) (CH3)3COH"," i) BH3; ii)H2O2/HO"],imgs:"12.PNG",answer:2}];return{setSize:a.length,getQuestion:function(b){return b<a.length?a[b]:!1}}}function quiz4(a){return{restrict:"AE",scope:{},templateUrl:"views/template4.html",link:function(b,c,d){b.start=function(){b.id=0,b.quizOver=!1,b.inProgress=!0,b.getQuestion()},b.reset=function(){b.inProgress=!1,b.score=0},b.getQuestion=function(){var c=a.getQuestion(b.id),d=a.setSize;c?(b.type=c.type,b.question=c.question,b.options=c.options,b.answer=c.answer,b.imgs=c.imgs,b.answerMode=!0,$("textarea").val(""),$("input:radio:checked").prop("checked",!1),$(".progress-bar").css("width",b.id/d*100+"%")):b.quizOver=!0},b.checkAnswer=function(){switch(b.type){case"0":if(!$("input[name=answer]:checked").length)return;var a=$("input[name=answer]:checked").val();a===b.options[b.answer]?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"1":var a=$("textarea").val();if(!a.length)return;a===b.answer?(b.score++,b.correctAns=!0):b.correctAns=!1;break;case"3":if(console.log("SMILES is"+SMILES),!SMILES)return;b.answer===SMILES?(b.score++,b.correctAns=!0):b.correctAns=!1}b.answerMode=!1},b.nextQuestion=function(){b.id++,b.getQuestion()},b.reset()}}}function quizFactory4(){var a=[{type:"3",question:"Build the molecule that does NOT contain carbon atoms: A) Water B) Propane C) Carbonite ",options:[],imgs:"",answer:"",hint:"hint"},{type:"3",question:"Build a Dihydrogen Monoxide molecule.",options:[],imgs:"",answer:"DHMO",hint:"hint"},{type:"3",question:"A Cyclohexane molecule consists of 6 carbons that form a hexagon shape. Build a Cyclopentane molecule.",options:[],imgs:"",answer:"C1CCCCC1",hint:"hint"},{type:"3",question:"Build the molecule that is an alcohol: A) Ethane B)Ethene C)Ethanol (pictures shown?)",options:[],imgs:"",answer:"",hint:"hint"},{type:"3",question:"Build the molecule that is an alkane: A) Ethane B)Ethene C)Ethanol (pictures shown?)",options:[],imgs:"",answer:"",hint:"hint"},{type:"3",question:"Build a Carbon Dioxide molecule (Assume single bond piece represents double bond)",options:[],imgs:"",answer:"CO2",hint:"hint"},{type:"3",question:"Build a Hydrogen Peroxide molecule.",options:[],imgs:"",answer:"H2O2",hint:"hint"},{type:"3",question:"Build an Octane molecule.",options:[],imgs:"",answer:"C8H18",hint:"hint"},{type:"3",question:"Build a Hydrogen Molecule.",options:[],imgs:"",answer:"H",hint:"hint"},{type:"3",question:"2 molecules of H2O were formed by combining 2 molecules of H2 and 1 molecule of X. Build this molecule.",options:[],imgs:"",answer:"CCC(CC)C(C)C(C)C(C)C",hint:"hint"}];return{setSize:a.length,getQuestion:function(b){return b<a.length?a[b]:!1}}}angular.module("quizAngularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]);var SMILES;quiz.$inject=["quizFactory"],quiz2.$inject=["quizFactory2"],quiz3.$inject=["quizFactory3"],quiz4.$inject=["quizFactory4"],angular.module("quizAngularApp").directive("quiz",quiz).directive("quiz2",quiz2).directive("quiz3",quiz3).directive("quiz4",quiz4).factory("quizFactory",quizFactory).factory("quizFactory2",quizFactory2).factory("quizFactory3",quizFactory3).factory("quizFactory4",quizFactory4).controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),$("#start").on("click",function(){function a(a){var b=document.querySelector("#player");b.src=window.URL.createObjectURL(a)}var b={audio:!1,video:!0};return navigator.getUserMedia||(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia),navigator.getUserMedia?void navigator.getUserMedia(b,a,function(a){console.log(a)}):alert("getUserMedia not supported in this browser.")});var start=function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var a=document.getElementById("canvas"),b=a.getContext("2d"),c=document.getElementById("video"),d=document.getElementById("btnRecord"),e=document.getElementById("btnPhoto"),f=document.getElementById("btnStop"),g={video:!0,audio:!1};$("#btnStart").prop("disabled",!0),d.addEventListener("click",function(){var d;navigator.getUserMedia&&(navigator.getUserMedia(g,function(a){c.src=navigator.webkitGetUserMedia?window.URL.createObjectURL(a):a,d=a},function(a){console.error("Video capture error: ",a.code)}),f.addEventListener("click",function(){d.getVideoTracks()[0].stop()}),e.addEventListener("click",function(){function d(){$.ajax({type:"POST",data:j,url:"https://brumebleu.pythonanywhere.com/detect/",processData:!1,contentType:!1,success:e})}function e(c){SMILES=c.SMILES,alert("Picture Posted. Results are "+SMILES),b.clearRect(0,0,a.width,a.height)}b.drawImage(c,0,0,250,180);var f=a.toDataURL("image/png",1),g=[];f=atob(f.split(",")[1]);for(var h=0;h<f.length;h++)g.push(f.charCodeAt(h));var i=new Blob([new Uint8Array(g)],{type:"image/png"}),j=new FormData;j.append("image",i),d()}))})};angular.module("quizAngularApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);