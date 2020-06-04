/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Tests for true Document or JSDOM style elements
 * @param {string} selector - CSS selector
 * @param {DocumentFragment} fragment - Document or JSDOM fragment
 * @returns {DocumentFragment} - fragment or sub-fragment that matches the provided selector
 */
export const getElement = (selector: string, fragment: DocumentFragment | Element): DocumentFragment | Element => {
  return typeof (fragment as Element).matches === 'function' && (fragment as Element).matches(selector)
    ? fragment
    : fragment.querySelector(selector);
};

/**
 * Throws an error with console logs for referencing when an element is not found for a test
 * @param {string} selector - selector used to try and grab the element
 * @param {DocumentFragment} docFrag - Document or JSDOM fragment searched
 * @param {string} [message='Carbon Shared Tests: element could not be found'] - message prefix for error
 */
export const elementNotFound = (
  selector: string,
  docFrag: DocumentFragment,
  message = 'Carbon Shared Tests: element could not be found'
): void => {
  console.error(docFrag); // eslint-disable-line no-console
  throw new Error(`${message}: ${selector}`);
};

/**
 * Takes a string from the classNames object and makes it a CSS selector
 *
 * @param {string} classString - string from className object to convert
 * @returns {string} - classString in a CSS selector format
 */
export const createSelector = (classString: string): string => {
  if (
    typeof classString !== 'string' ||
    (typeof classString === 'string' && classString.length < 1)
  )
    return classString;

  return `.${classString.split(' ').join('.')}`;
};


/**
 * Tests that a variable is actually an object and not an array  or null
 * which can mistakenly be flagged as an object
 * @param {variable} item - variable to tests
 * @returns {boolean} - value if item is actually an Object
 */
export const isObject = (item: object): boolean => {
  if (Array.isArray(item)) return false;
  if (item === null) return false;
  return item instanceof Object;
};
