/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'mocha';
import { expect } from 'chai';
import * as utilities from '../utilities';

describe('getElement function', () => {
  it('exists as a function', () => {
    expect(utilities.getElement).to.be.a('function');
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
});

describe('isObject function', () => {
  it('exists as a function', () => {
    expect(utilities.isObject).to.be.a('function');
  });
});
