import React from 'react';
import CollectionsPage from 'components/templates/collectionsPage';
import DeveloperPage from 'components/templates/developerPage';
import HomePage from 'components/templates/homePage';
import ListingPage from 'components/templates/listingPage';
import NotFoundPage from 'components/templates/notFoundPage';
import SearchPage from 'components/templates/searchPage';
import SettingsPage from 'components/templates/settingsPage';
import SnippetPage from 'components/templates/snippetPage';
import StaticPage from 'components/templates/staticPage';

const DynamicPage = ({ dynamic: { template, context }, dynamic }) => {
  console.log(template);
  switch (template) {
    case 'CollectionsPage':
      return <CollectionsPage pageContext={context} />;
    case 'DeveloperPage':
      return <DeveloperPage pageContext={context} />;
    case 'HomePage':
      return <HomePage pageContext={context} />;
    case 'ListingPage':
      return <ListingPage pageContext={context} />;
    case 'NotFoundPage':
      return <NotFoundPage pageContext={context} />;
    case 'SearchPage':
      return <SearchPage pageContext={context} />;
    case 'SettingsPage':
      return <SettingsPage pageContext={context} />;
    case 'StaticPage':
      return <StaticPage pageContext={context} />;
    case 'SnippetPage':
      return <SnippetPage pageContext={context} />;
    default:
      return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(dynamic, null, 2)}
        </div>
      );
  }
};

export async function getStaticPaths() {
  const glob = require('glob');
  const path = require('path');
  const fs = require('fs-extra');
  const util = require('util');

  const pages = glob.sync('.content/**/index.json').map(x => path.resolve(x));
  const readFile = util.promisify(fs.readFile);
  const readJSON = file =>
    new Promise(res => readFile(file).then(d => res(JSON.parse(d))));
  const pageDatas = await Promise.all(pages.map(readJSON));
  return {
    paths: pageDatas.map(p => ({
      params: { relRoute: p.relRoute.split('/').filter(Boolean) },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const glob = require('glob');
  const path = require('path');
  const fs = require('fs-extra');
  const util = require('util');

  const readFile = util.promisify(fs.readFile);
  const readNamedJSON = file =>
    new Promise(res => readFile(file).then(d => res([file, JSON.parse(d)])));

  const files = glob
    .sync(`.content/${params.relRoute.join('/')}/*.json`)
    .map(x => path.resolve(x));

  const jsonData = await Promise.all(files.map(readNamedJSON));
  const pageData = jsonData.reduce(
    (acc, [fileName, data]) => {
      if (fileName.endsWith('index.json')) return { ...data, ...acc };
      else return { ...acc, context: { ...acc.context, ...data } };
    },
    { context: {} }
  );

  return {
    props: {
      dynamic: pageData,
    },
  };
}

export default DynamicPage;
