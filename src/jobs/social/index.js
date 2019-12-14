const screenshot = require('./screenshot');
const tweet = require('./tweet');
const fetch = require('node-fetch');

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const sitemapUrl = 'https://www.30secondsofcode.org/sitemap.xml';
const sitemapLinkRegex = /<loc>(https:\/\/www\.30secondsofcode\.org\/js\/s\/.*)<\/loc>/g;
const randomBackgroundImageUrl = `https://api.unsplash.com/photos/random?collections=9038183&client_id=${process.env['UNSPLASH_KEY']}`;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


(async() => {
  const response = await fetch(randomBackgroundImageUrl);
  const { user, urls } = await response.json();

  const sitemap = await fetch(sitemapUrl);
  let links = await sitemap.text();
  links = links.match(sitemapLinkRegex).map(s => s.replace(sitemapLinkRegex, '$1'));

  const link = sample(links);
  const linkRes = await fetch(link.replace('js', 'page-data/js') + '/page-data.json');
  let linkDescription = await linkRes.json();
  linkDescription = linkDescription.result.pageContext.snippet.description;

  screenshot(link, urls.regular, user.name);
  await sleep(15000);
  await tweet(`${linkDescription} #30secondsofcode #javascript #js`);
})();
