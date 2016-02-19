angular.module('studyMate')

<<<<<<< ac216f0106c318571ac89ac7c14aa56b4b9818ac
.controller('eventsListCtrl',function($scope, $window, eventsListFact, logFact){
  $scope.data = [];
  $scope.allGuestLists = {};

  $scope.signout = function () {
    logFact.signout();
  }

  $scope.upcomingEvents = function (obj) {
    var date = new Date();
    var eventDate = new Date(obj.datetime);
    return eventDate >= date;
  };

  $scope.displayEvent = function(){
    console.log('++line 6 inside eventsListCtrl');
    eventsListFact.getEvents()
    .then(function(data){
      data.forEach(function(value){
        value.formatted = moment(value.datetime, moment.ISO_8601).utcOffset(480).format('MMM Do YYYY, h:mm A');
      });
      $scope.data = data;
      console.log('++line 10 in eventsListCtrl Success: ',$scope.data);
    }).catch(function(err) {
      console.log('++line 12 in eventsList Ctrl Error: ',err);
    });
  };

  $scope.eventJoin = function(event) {
    console.log('++line 20 in eventJoin in eventsListCtrl');

    var token = $window.localStorage.getItem('com.studymate');

    var eventJoinData = {
      token: token,
      event: event
    };

    eventsListFact.eventJoin(eventJoinData)
    .then(function(response) {
      if (response.isValid) {
        console.log('Valid response from eventsListFact');
        $scope.getGuestList(event);
      } else {
        console.log('Event join failed');
      }
    })
  };

  $scope.getGuestList = function (event) {
    var list = [];
    eventsListFact.getGuestList(event.id).then(function (data) {
      data.forEach(function (item) {
        list.push(item.username);
      })
      $scope.allGuestLists[event.id] = list;
      // console.log('++line59 inside getGuestList: ', list);
    })
  }

  $scope.displayEvent();

});
