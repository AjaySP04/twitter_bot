// index.js 
// This is the main file for Twitter Bot entry
// This contain all the code required for twitter bot

var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config)

//search parameters
params = {
	q: '#HappyBirthdayARRahman',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

T.get('search/tweets', params, function(err, data, response){

	if(!err)
	{
		//loop through the returned tweets

		for (var i = data.statuses.length - 1; i >= 0; i--) {

			data.statuses[i];

			let id = { id: data.statuses[i].id_str }

			//Try to favorite the selected tweets

			T.post('favorites/create', id, function(err, response){
				// if favorite fails
				if(err)
				{ 
					console.log(err[0].message);
				}
				// if favorite is successful, log the url of the tweet
				else
				{ 
					let username = response.user.screen_name;
					let tweetId = response.id_str;

					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
				}
			})
		}
	}else
	{
		console.log(err);
	}
})
