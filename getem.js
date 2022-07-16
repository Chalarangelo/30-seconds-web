const fs = require('fs');
const path = require('path');

const remark = require('remark');
const remarkGfm = require('remark-gfm');
const visit = require('unist-util-visit');

// Setup Remark using the appropriate options.
const remarkOptions = {
  commonmark: true,
  footnotes: true,
  gfm: true,
  pedantic: true,
};
const remarkParser = new remark()
  .use(remarkGfm)
  .data('settings', remarkOptions);

const parseMarkdown = markdown => {
  const ast = remarkParser.parse(markdown);

  let inlineBlocks = new Set();
  // Highlight inline code blocks
  visit(ast, `inlineCode`, node => {
    inlineBlocks.add(node.value);
  });

  return inlineBlocks;
};

const directory = './content/sources/30code/snippets';
const snippetNames = fs.readdirSync(directory);

let codeBlocks = new Set();

for (let snippet of snippetNames) {
  const snippetPath = path.join(directory, snippet);
  const snippetContent = fs.readFileSync(snippetPath, 'utf8');
  codeBlocks.add(...parseMarkdown(snippetContent));
}

fs.writeFileSync(
  '30code.json',
  JSON.stringify(
    Array.from(codeBlocks).sort((a, b) => a.localeCompare(b)),
    null,
    2
  )
);
