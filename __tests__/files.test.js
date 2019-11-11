'use strict';

jest.mock('fs');

const app = require('../app');

describe('testing file function', () => {

  it('can read a file', (done) => {
    app.readFile('test.txt')
      .then(contents => {
        expect(Buffer.isBuffer(contents)).toBeTruthy();
        done();
      });
  });
});
