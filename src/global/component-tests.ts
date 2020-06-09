/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { merge } from "lodash-es";
/** @todo fix Exported Tests so that all interfaces are exported on index */
import { ExportedTest, TestSuite } from 'exported-tests/dist/types/parsers/base';
import { isObject, createSelector, getElement, elementNotFound } from './utilities';

export interface Selectors {
  root: string;
}

export interface Classes {
  root: string;
}

export interface TestConfig {
  selectors: Selectors;
  classes: Classes;
  clearClasses: boolean;
}

/**
 * Defines the static methods of the ComponentTests Class
 */
export interface ComponentTestsConstructor {
  new (config: TestConfig): ComponentTestsInterface;
  defaults: TestConfig;
}

/**
 * Defines the instance properties and methods of the ComponentTests class
 */
export interface ComponentTestsInterface {
  settings: TestConfig;
  tests: (ExportedTest|TestSuite)[];
  createSelectorsObj: Function;
  getTests: Function;
  getComponent: Function;
}

/**
 * Base class to create component tests in Exported Tests format
 * @class
 */
class ComponentTests implements ComponentTestsInterface {

  /**
   * Default component test configurations
   * @type {TestConfig}
   */
	static defaults = {
		selectors: {
			root: '',
		},
		classes: {
      root: '',
    },
    clearClasses: false,
  };
  // Is there a way to have this defined
	settings = null;
	tests = [];

  /**
   * Creates the settings property that can be used for each test and an array of
   * test-suite objects under property `tests` that contains a set of shared component
   * tests (currently this includes nothing... and I'm not sure
   * if it ever will. HTML validation would be a candidate but we are looking at removing
   * that from the per-component tests)
   * @param {TestConfig} configs
   */
	constructor(configs = {}) {
		this.settings = merge({}, (this.constructor as ComponentTestsConstructor).defaults, configs);
  }

  /**
   * Converts a component's `selectors` object in to a testConfig `selectors` object
   * By making sure the classes are in a CSS selector format
   * @param {object} classesObj component `selectors` object found in COMPONENT_NAME/selectors.js file
   * @param {string[]} [elementArray] scopes the elements converted to only those listed in the array
   * @returns {testConfig.selectors}
   */
  createSelectorsObj(classesObj: Classes, elementArray?: string[]): Selectors|{} {
    const selectorsObj = {};
    const elements = elementArray || Object.keys(classesObj);

    elements.forEach(element => {
      if (typeof classesObj[element] === 'string') {
        selectorsObj[element] = createSelector(classesObj[element]);
      } else {
        if (typeof selectorsObj[element] === 'undefined') {
          selectorsObj[element] = {};
        }
        selectorsObj[element] = this.createSelectorsObj(classesObj[element]);
      }
    });

    return selectorsObj;
  }

  /**
   * Searches through a group of exported test objects based on keys to determine which tests should be executed
   * @param {object} tests object of exported tests identified with a test-suite unique key
   * @param {string[]} [includedTests] ID/key of tests to include; if undefined, all tests are included
   * @returns {test-suite.tests} array of tests
   */
	getTests(tests: object, includedTests?: string[]): ExportedTest[] {
		let scopedTests;

    if (Array.isArray(includedTests)) {
      scopedTests = [];
      includedTests.forEach(testID => {
        if (isObject(tests[testID])) {
          scopedTests.push(tests[testID]);
        }
      });
    }

    return scopedTests || Object.keys(tests).map(i => tests[i]);
	}

  /**
   * Grabs component specific elements that are to be tested from a document fragment
   * At the base level we only know that all components have the root element so all other
   * elements will need to be an extension of this function.
   * @param {DocumentFragment} fragment being tested
   * @param {string} selector - CSS selector used to find the component
   * @returns {DocumentFragment} root element of the component
   */
	getComponent(fragment: DocumentFragment, selectors: Selectors): Element {
		const root =
      getElement(selectors.root, fragment) ||
      elementNotFound(selectors.root, fragment);

    return (root as Element);
	}
}

export default ComponentTests;
