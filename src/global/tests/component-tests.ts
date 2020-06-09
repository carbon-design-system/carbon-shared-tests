/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import ComponentTests, { TestConfig } from '../component-tests';

const divHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Div: Variant One: Preview Layout</title>
</head>
<body>
  <main role="main" id="main-content" style="min-height: 100vh">
    <div class="bx--meow bx--meow--variant-one">
      <span>Meow unique text</span>
      <p>Cat's meow</p>
      <p class="fails-conditions">Dog's bark</p>
      <p>Bird's tweet</p>
      <input id="my-input" type="checkbox" checked />
    </div>
  </main>
</body>
</html>`;

/**
 * Adjusts global window and document to be from the HTML we're gonna test
 */
const divWindow = new JSDOM(divHTML, { resources: 'usable' }).window;

describe('ComponentTests', () => {
  it('must have all static functions and properties', () => {
    expect(ComponentTests).to.be.a('function');
    expect(ComponentTests.defaults).to.be.an('object');
  });

  it('must have defaults', () => {
    expect(ComponentTests.defaults.clearClasses).to.be.a('boolean');
    expect(ComponentTests.defaults.selectors).to.be.an('object');
    expect(ComponentTests.defaults.classes).to.be.an('object');
  });

  it('getComponent returns the root', () => {
    const myComponent = new ComponentTests({
      selectors: {
        root: 'div',
      },
    });
    expect(myComponent.getComponent).to.be.a('function');

    const myRoot = myComponent.getComponent(
      divWindow.document,
      myComponent.settings.selectors
    );
    expect(myRoot.tagName).to.equal('DIV');

    const testComponent = new ComponentTests({
      selectors: {
        root: 'main',
      },
    });

    const testRoot = testComponent.getComponent(
      divWindow.document,
      testComponent.settings.selectors
    );
    expect(testRoot.id).to.equal('main-content');
  });

  it('getTests returns correct test-suite tests array', () => {
    const myComponent = new ComponentTests({
      selectors: {
        root: 'div',
      }
    });
    const tests = {
      test1: {},
      test2: {},
      test3: {},
    };
    expect(myComponent.getTests).to.be.a('function');

    const allTests = myComponent.getTests(tests);
    expect(allTests).to.have.lengthOf(3);

    const subset = myComponent.getTests(tests, ['test2']);
    expect(subset).to.have.lengthOf(1);
  });
});
