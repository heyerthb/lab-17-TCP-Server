'use stict';

const logger = require('../logger');

describe('testing logger', () => {
  it('should log properly', () => {
    // const data = data;
    const spy = jest.spyOn(console, 'log');
    const testBuffer = Buffer.from(JSON.stringify({event: 'test', text: 'test'}));
    logger.handleData(testBuffer);
    expect(spy).toHaveBeenCalledWith('Ignored');
    
  });


  // it('can read an error', () => {
  //   const spy = jest.spyOn(console, 'error');
  //   const testBuffer = Buffer.from(JSON.stringify({event: 'test', text: 'test'}));    
  //   logger.handleData(testBuffer);
  //   expect(spy).toHaveBeenCalledWith('data');
  // });


});