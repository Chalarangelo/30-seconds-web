/* eslint-disable camelcase */

const Twitter = require('twitter');
const fs = require('fs');

const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

const client = new Twitter({
  consumer_key: process.env['CONSUMER_KEY'],
  consumer_secret: process.env['CONSUMER_SECRET'],
  access_token_key: process.env['ACCESS_TOKEN_KEY'],
  access_token_secret: process.env['ACCESS_TOKEN_SECRET'],
});

const tweet = promisify(description => {
  const snippetImage = fs.readFileSync('snippet.png');
  client.post('media/upload', {media: snippetImage}, function(error, media) {
    console.log('hi');
    if (!error) {

      // If successful, a media object will be returned.
      console.log(media);

      // Lets tweet it
      var status = {
        status: description,
        media_ids: media.media_id_string, // Pass the media id string
      };

      client.post('statuses/update', status, function(error, tweet) {
        if (!error) console.log(tweet);
      });
    } else
      console.log(error);

  });
});

module.exports = tweet;
