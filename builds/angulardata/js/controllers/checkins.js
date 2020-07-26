myApp.controller('CheckInsController', 
	['$scope','$rootScope','$location','$routeParams','$firebaseObject','$firebaseArray', 
	function($scope,$rootScope,$location,$routeParams,$firebaseObject,$firebaseArray) {
  	
  	var ref,checkinsList;
  	$scope.whichmeeting=$routeParams.mId;
  	$scope.whichuser=$routeParams.uId;
  	$scope.order='firstname';
  	$scope.query='';
  	$scope.recordId='';
  	$scope.direction=null;

  	ref=firebase.database().ref()
  	.child('users').child($scope.whichuser)
  	.child('meetings').child($scope.whichmeeting)
  	.child('checkins');

  	checkinsList=$firebaseArray(ref);
  	$scope.checkins=checkinsList;

  	$scope.deleteLove=function(myCheckin,key){
  		var refLove= ref.child(myCheckin.$id).child('awards').child(key);
  		var record=$firebaseObject(refLove);
  		record.$remove(key);
  	}//deleteLove

  	$scope.giveLove=function(myCheckin,myGift){
  		var refLove=ref.child(myCheckin.$id).child('awards');
  		var checkinsArray=$firebaseArray(refLove);
  		checkinsArray.$add({
  			name: myGift,
  			date: firebase.database.ServerValue.TIMESTAMP
  		})
  	}//giveLove

  	$scope.addCheckin=function(){
  		$firebaseArray(ref).$add({
  			firstname:$scope.user.firstname,
  			lastname: $scope.user.lastname,
  			email: $scope.user.email,
  			date: firebase.database.ServerValue.TIMESTAMP
  		}).then(function(){
  			$location.path('/checkins/'+$scope.whichuser+'/'+$scope.whichmeeting+'/checkinslist');
  		});//add
  	}//addCheckin

  	$scope.deleteCheckin=function(id){
  		var refDel=ref.child(id);
  		var record=$firebaseObject(refDel);
  		record.$remove(id);
  	}//deleteCheckin

  	$scope.pickRandom=function(){
  		var whichRecord=Math.round(Math.random()*(checkinsList.length -1));
  		$scope.recordId=checkinsList.$keyAt(whichRecord);
  	}// pick a random winner

  	$scope.showLove=function(myCheckin){
  		myCheckin.show=!myCheckin.show;
  		if(myCheckin.userState=='expanded'){
  			myCheckin.userState='';
  		}else{
  			myCheckin.userState='expanded';
  		}
  	}// showLove or hide 

}]); //myApp.controller