'use strict';

describe('Service: myReference', function () {

  // load the service's module
  beforeEach(module('hotpotApp'));

  // instantiate service
  var myReference;
  beforeEach(inject(function (_myReference_) {
    myReference = _myReference_;
  }));

  it('should do something', function () {
    expect(!!myReference).toBe(true);
  });

});
