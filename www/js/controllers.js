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
		  var options = { frequency: 2000 };
		  $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
		  $scope.watch.then(
		      null,
		      function(error) {
		      // An error occurred
		      $scope.accElement = 'error';
		      },
		      function(result) {
		    	  $scope.accElement = 
			    		'Acceleration X: ' + result.x + '\n' +
			    		'Acceleration Y: ' + result.y + '\n' +
			    		'Acceleration Z: ' + result.z + '\n' +
			    		'Timestamp:' + result.timestamp;
		    });
	  }
	  
	  $scope.stopWatch = function()
	  {
		  $scope.watch.clearWatch();
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
