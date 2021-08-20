/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to be capitalized.
 * @param {bool} lowerRest - Should the rest of the characters be lowercased?
 */
export const capitalize = (
  [first, ...rest]: string,
  lowerRest = false
): string =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * Optimizes nodes in an HTML string.
 * @param {string} data - The HTML string to be optimized.
 * @param {RegExp} regexp - The matcher for the optimization.
 * @param {string} replacer - The replacement for the matches.
 */
export const optimizeNodes = (
  data: string,
  regexp: RegExp,
  replacer: (substring: string, ...args: any[]) => string
): string => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null) ++count;
  } while (count > 0);
  return output;
};

/**
 * Optimizes all nodes in an HTML string.
 * @param {string} html - The HTML string to be optimized.
 */
export const optimizeAllNodes = (html: string): string => {
  let output = html;
  // Optimize punctuation nodes
  output = optimizeNodes(
    output,
    /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
    (_match, p1, p2, p3): string =>
      `<span class="token punctuation">${p1}${p2}${p3}</span>`
  );
  // Optimize operator nodes
  output = optimizeNodes(
    output,
    /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
    (_match, p1, p2, p3) =>
      `<span class="token operator">${p1}${p2}${p3}</span>`
  );
  // Optimize keyword nodes
  output = optimizeNodes(
    output,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (_match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
  );
  return output;
};

/**
 * Returns an object containing the parameters of the current URL.
 * @param {string} url - The URL to be parsed.
 */
export const getURLParameters = (url: string): Record<string, string> =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a: Record<string, string>, v: string) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );

/**
 * Strips markdown format from a string.
 * @param {string} str - The markdown string to be stripped.
 */
export const stripMarkdownFormat = (str: string): string => {
  return str
    .replace(/[`*]/g, '')
    .replace(/\n/g, '')
    .replace(/\[(.*)\]\(.*\)/g, '$1')
    .replace(/_(.*?)_/g, '$1');
};

/**
 * Converts a given string to kebab-case.
 * @param {string} str - The string to be converted.
 */
export const toKebabCase = (str: string): string => {
  const segments: string[] =
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || [];
  return segments.map(x => x.toLowerCase()).join('-');
};

/**
 * Converts a slug to a SEO-friendly representation.
 * Steps:
 *  - Kebab-case
 *  - Add a '/' in the front
 * @param {string} str - The string to be converted.
 */
export const convertToSeoSlug = (str: string): string => `/${toKebabCase(str)}`;

/**
 * Adds a trailing `/` to a slug, if necessary.
 * @param {string} str - The string to be converted.
 * */
export const addTrailingSlashToSlug = (str: string): string => {
  if (str.includes('?'))
    return str.includes('/?') ? str : str.replace('?', '/?');
  return str.endsWith('/') ? str : `${str}/`;
};

/**
 * Replaces unsafe characters with HTML-safe ones.
 * @param {string} str - The string to be escaped.
 */
export const escapeHTML = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Truncates a string down to the specified number of characters
 * @param {string} str - The string to be truncated.
 * @param {number} num - The maximum length of the string.
 */
export const truncateString = (str: string, num: number): string =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
