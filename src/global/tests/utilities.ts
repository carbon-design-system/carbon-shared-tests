/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

import * as utilities from '../utilities';

describe('getElement function', () => {
  const testHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Div: Variant One: Preview Layout</title>
    </head>
    <body>
      <main role="main" id="main-content" style="min-height: 100vh">
        <div class="bx--test bx--test--variant-one">
          <span>Meow unique text</span>
          <p>Cat's meow</p>
          <p class="fails-conditions">Dog's bark</p>
          <p>Bird's tweet</p>
          <input id="test-input" type="checkbox" checked />
        </div>
      </main>
    </body>
    </html>`;

  const testWindow = new JSDOM(testHTML, { resources: 'usable' }).window;
  const testFrag = testWindow.document.getElementById('main-content');


  it('exists as a function', () => {
    expect(utilities.getElement).to.be.a('function');
  });

  it('returns correct element when it is the root', () => {
    expect(utilities.getElement('#main-content', testFrag)).to.equal(testFrag);
  });

  it('returns correct element when it is a child', () => {
    const child = testFrag.getElementsByClassName('fails-conditions').item(0);
    expect(utilities.getElement('.fails-conditions', testFrag)).to.equal(child);
  });
});

describe('elementNotFound function', () => {
  it('exists as a function', () => {
    expect(utilities.elementNotFound).to.be.a('function');
  });
});

describe('createSelector function', () => {
  it('exists as a function', () => {
    expect(utilities.createSelector).to.be.a('function');
  });
  it('returns original parameter if not passed a string', () => {
    const myObject = {};

    // @ts-expect-error
    expect(utilities.createSelector(myObject)).to.equal(myObject);
  });
  it('returns original parameter if passed an empty string', () => {
    expect(utilities.createSelector('')).to.equal('');
  });
  it('takes space delimitated string of classNames and converts to valid CSS selector', () => {
    expect(utilities.createSelector('meow')).to.equal('.meow');
    expect(utilities.createSelector('foo bar')).to.equal('.foo.bar');
  });

});

describe('isObject function', () => {
  it('exists as a function', () => {
    expect(utilities.isObject).to.be.a('function');
  });

  it('returns false for non-objects', () => {
    // @ts-expect-error
    expect(utilities.isObject('hello world')).to.be.false;
  });
  it('returns false for arrays', () => {
    expect(utilities.isObject([])).to.be.false;
  });
  it('returns false for null', () => {
    expect(utilities.isObject(null)).to.be.false;
  });
  it('returns true for an object', () => {
    expect(utilities.isObject({})).to.be.true;
  });
});
