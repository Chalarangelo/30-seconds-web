/**
 * Chunks an array into smaller arrays of a specified size.
 * @param {array} arr - The array to be chunked.
 * @param {number} size - The size of each chunk.
 */
export const chunk = <T>(arr: Array<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size)
  );

/**
 * Returns all unique values of an array.
 * @param {array} arr - The array to be deduplicated.
 */
export const uniqueElements = <T>(arr: Array<T>): Array<T> => [...new Set(arr)];

/**
 * Gets a random element from an array.
 * @param {array} arr - The array to be sampled.
 */
export const sample = <T>(arr: Array<T>): T =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Randomizes the order of the values of an array, returning a new array.
 * @param {array} arr - The array to be shuffled.
 * @returns {array} - The shuffled array
 */
export const shuffle = <T>([...arr]: Array<T>): Array<T> => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
