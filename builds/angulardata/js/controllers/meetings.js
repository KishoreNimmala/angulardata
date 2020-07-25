myApp.controller('MeetingsController', 
	['$scope','$rootScope','$firebaseAuth','$firebaseArray', 
	function($scope,$rootScope,$firebaseAuth,$firebaseArray) {
  		var ref = firebase.database().ref();
  		var auth = $firebaseAuth();
  		auth.$onAuthStateChanged(function(authUser) {
		    if(authUser) {
		      var meetingRef=ref.child('users').child(authUser.uid).child('meetings');
		      var meetingsInfo=$firebaseArray(meetingRef);
		      $scope.meetings=meetingsInfo;

		      meetingsInfo.$loaded().then(function(data){
		      	$rootScope.howManyMeetings=meetingsInfo.length;
		      });// make sure meeting data is loaded

		      meetingsInfo.$watch(function(data){
		      	$rootScope.howManyMeetings=meetingsInfo.length;
		      });//Update meetings chages

		      $scope.addMeeting=function(){
		      	meetingsInfo.$add({
		      		name:$scope.meetingname,
		      		data:firebase.database.ServerValue.TIMESTAMP
		      	}).then(function(){
		      		$scope.meetingname='';
		      	});//promise
		      }//addMeeting

		      $scope.deleteMeeting=function(key){
		      	meetingsInfo.$remove(key);
		      }//deletemeeting
		    } //authUser
	  	});//onAuthStateChanged
}]); //myApp.controller