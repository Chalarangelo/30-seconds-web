import React from 'react';
import HomePage from 'components/templates/homePage';

const IndexPage = ({ context }) => {
  return <HomePage pageContext={context} />;
};

export async function getStaticProps() {
  const glob = require('glob');
  const path = require('path');
  const fs = require('fs-extra');
  const util = require('util');

  const readFile = util.promisify(fs.readFile);
  const readJSON = file =>
    new Promise(res => readFile(file).then(d => res(JSON.parse(d))));

  const files = glob
    .sync(`.content/home/!(index).json`)
    .map(x => path.resolve(x));

  const jsonData = await Promise.all(files.map(readJSON));
  const pageData = jsonData.reduce((acc, data) => {
    return { ...data, ...acc };
  }, {});

  return {
    props: {
      context: pageData,
    },
  };
}

export default IndexPage;
