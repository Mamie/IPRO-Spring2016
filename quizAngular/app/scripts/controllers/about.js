'use strict';

/**
 * @ngdoc function
 * @name quizAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizAngularApp
 */
angular.module('quizAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
