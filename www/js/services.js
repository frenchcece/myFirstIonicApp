angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})


.factory('Lists', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var lists = [{
    id: 0,
    name: 'Accelerometer',
    desc: 'Detecting device movement using accelerometer',
    page: 'templates/phonegap/0.html'
  }, {
    id: 1,
    name: 'Geolocation',
    desc: 'Obtaining device geolocation sensor information',
    page: 'templates/phonegap/1.html'
  }, {
    id: 2,
    name: 'Google Map',
    desc: 'Retrieving map data through geolocation coordinates',
    page: 'templates/phonegap/2.html'
  }, {
    id: 3,
    name: 'Compass',
    desc: 'Creating a visual compass tho show the device direction',
    page: 'templates/phonegap/3.html'
  }, {
    id: 4,
    name: 'Storage',
    desc: 'Saving a file to device storage',
    page: 'templates/phonegap/4.html'
  }];

  return {
    all: function() {
      return lists;
    },
    get: function(listId) {
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id === parseInt(listId)) {
          return lists[i];
        }
      }
      return null;
    }
  }
})



.factory('Ranks', function($http, $q) {
	// web service that returns a JSON array
    var webservice_url = "http://www.dupuyworld.com/ncaafootball/cfc/footballdao.cfc";
   
    return {
	    getRanking : function(){
	    	var deferred = $q.defer();
	    	
		    	// $http returns a promise, which has a then function, which also returns a promise
		    	$http.get(webservice_url+"?method=getaptop25teams&season=2014")
		        	.then(
		       		//handle success
		        	function (response) {
		            // The then function here is an opportunity to modify the response
		            //console.log(response.data);
		            // The return value gets picked up by the then in the controller.
		            return deferred.resolve(response.data);
		        	},
					//handle failure
					function(error){
						console.log('error getting web service:'+error.message);
					});

	         // Return the promise to the controller
	         return deferred.promise;
	    },
	    getTeamStats : function(teamid){ 	
	    	var deferred = $q.defer();
	    	
	    	// $http returns a promise, which has a then function, which also returns a promise
	    	$http.get(webservice_url+"?method=getteamstatsjsonformat&season=2014&teamid="+teamid)
	        	.then(
	       		//handle success
	        	function (response) {
	            // The then function here is an opportunity to modify the response
	            console.log(response.data);
	            // The return value gets picked up by the then in the controller.
	            return deferred.resolve(response.data);
	        	},
				//handle failure
				function(error){
					console.log('error getting web service:'+error.message);
				});

         // Return the promise to the controller
         return deferred.promise;
	    }
    }    
    
return null;
})


/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
