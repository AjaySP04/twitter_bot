// index.js 
// This is the main file for Twitter Bot entry
// This contain all the code required for twitter bot

var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config)

//search parameters
params = {
	q: '#IndianFootball',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

//make request using twiter api and get the seach result as response 
T.get('search/tweets', params, function(err, data, response){

	if(!err)
	{
		//loop through the returned tweets
		for (var i = data.statuses.length - 1; i >= 0; i--) {
			// record screen name here
			screen_name =  data.statuses[i].user.screen_name;
			
			//Try to favorite the selected tweets
			T.post('friendships/create', {screen_name}, function(err, response){
				// if unable to follow then print error message.
				if(err){ 
					console.log(err[0].message);
				}
				// if favorite is successful, log the url of the tweet.
				else{ 
					console.log(screen_name + ': **FOLLOWED')
				}
			});
		}
	}else
	{
		console.log(err);
	}
})
