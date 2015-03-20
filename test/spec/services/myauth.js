'use strict';

describe('Service: myAuth', function () {

  // load the service's module
  beforeEach(module('hotpotApp'));

  // instantiate service
  var myAuth;
  beforeEach(inject(function (_myAuth_) {
    myAuth = _myAuth_;
  }));

  it('should do something', function () {
    expect(!!myAuth).toBe(true);
  });

});
