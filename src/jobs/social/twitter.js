/* eslint-disable camelcase */

const Twitter = require('twitter');
const snippetImage = require('fs').readFileSync('snippet.png');

const client = new Twitter({
  consumer_key: process.env['CONSUMER_KEY'],
  consumer_secret: process.env['CONSUMER_SECRET'],
  access_token_key: process.env['ACCESS_TOKEN_KEY'],
  access_token_secret: process.env['ACCESS_TOKEN_SECRET'],
});

// Make post request on media endpoint. Pass file data as media parameter
client.post('media/upload', {media: snippetImage}, function(error, media) {

  if (!error) {

    // If successful, a media object will be returned.
    console.log(media);

    // Lets tweet it
    var status = {
      status: '',
      media_ids: media.media_id_string, // Pass the media id string
    }

    client.post('statuses/update', status, function(error, tweet) {
      if (!error) console.log(tweet);
    });
  }
});
