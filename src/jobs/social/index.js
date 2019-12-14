const screenshot = require('./screenshot');
const fetch = require('node-fetch');

const link = 'https://www.30secondsofcode.org/js/s/pipe-async-functions';
const randomBackgroundImageUrl = `https://api.unsplash.com/photos/random?collections=9038183&client_id=${process.env['UNSPLASH_KEY']}`;

(async() => {
  const response = await fetch(randomBackgroundImageUrl);
  const { user, urls } = await response.json();

  screenshot(link, urls.regular, user.name);
})();
