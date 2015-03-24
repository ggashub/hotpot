'use strict';

describe('Service: myConfig', function () {

  // load the service's module
  beforeEach(module('hotpotApp'));

  // instantiate service
  var myConfig;
  beforeEach(inject(function (_myConfig_) {
    myConfig = _myConfig_;
  }));

  it('should do something', function () {
    expect(!!myConfig).toBe(true);
  });

});
