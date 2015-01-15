angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListsCtrl', function($scope, Lists) {
  $scope.lists = Lists.all();
  $scope.remove = function(list) {
	  Lists.remove(list);
  }
})

.controller('ListDetailCtrl', function($scope, $stateParams, Lists, $cordovaDeviceMotion) {
  $scope.list = Lists.get($stateParams.listId);

  //watch Acceleration
  $scope.accElement = 'Obtaining data...';
  document.addEventListener("deviceready", function() 
  {
	  $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
	    	$scope.accElement = 
	    		'Acceleration X: ' + result.x + '\n' +
	    		'Acceleration Y: ' + result.y + '\n' +
	    		'Acceleration Z: ' + result.z + '\n' +
	    		'Timestamp:' + result.timestamp;
	    }, function(err) {
	      // An error occurred. Show a message to the user
	    	$scope.accElement = 'error';	
	    });
	  
	  $scope.startWatch = function()
	  {
		  document.getElementById('dot').style.display = 'block';
		  var options = { frequency: 100 };
		  
		  $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
		  $scope.watch.then(
		      null,
		      function(error) {
		    	  // An error occurred
		    	  $scope.accElement = 'error';
		      },
		      function(result) {
		    	  //radius
		    	  var radius = 50;
		    	  //position vars
		    	  var x = 0;
		    	  var y = 0;
		    	  //speed vars
		    	  var vx = 0;
		    	  var vy = 0;
		    	  //acceleration vars
		    	  var accX = 0;
		    	  var accY = 0;
		    	  //multiplier to create proper pixel measurements
		    	  var multiplier = 100;
		    	  //create a reference to the div element
		    	  var dot = document.getElementById('dot');
		    	  
		    	  //calculate the dot motions
		    	  accX = result.x;
		    	  accY = result.y;
		    	  vy = vy + -(accY);
		    	  vx = vx + accX;
		    	  y = parseInt(y + vy * multiplier);
		    	  x = parseInt(x + vx * multiplier);
		    	  
		    	  if(x < 0){ x = 0; vx = 0;}
		    	  if(y < 0){ y = 0; vy = 0;}
		    	  if( x > document.documentElement.clientWidth - radius){
		    		  x = document.documentElement.clientWidth - radius;
		    		  vx = 0;
		    	  }
		    	  if( y > document.documentElement.clientHeight - radius){
		    		  y = document.documentElement.clientHeight - radius;
		    		  vy = 0;
		    	  }
		    	  
		    	  //move the dot on the screen based on calculations above
		    	  dot.style.top = y + "px";
		    	  dot.style.left = x + "px";
		    	  
		    	  //display the acceleration values on the screen
		    	  $scope.accElement = 
			    		'Acceleration X: ' + result.x + '\n' +
			    		'Acceleration Y: ' + result.y + '\n' +
			    		'Acceleration Z: ' + result.z + '\n' +
			    		'Timestamp:' + result.timestamp + '\n' +
			    		'Move Top: ' + y + 'px\n' +
			    		'Move Left: ' + x + 'px';		    	  
		    });
	  }
	  
	  $scope.stopWatch = function()
	  {
		  $scope.watch.clearWatch();
		  document.getElementById('dot').style.display = 'none';
	  }
	  
  });  //end deviceready  

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
