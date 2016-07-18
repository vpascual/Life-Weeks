'use strict';

describe('Service: DataModel', function () {

  // load the service's module
  beforeEach(module('lifeWeeksApp'));

  // instantiate service
  var DataModel;
  beforeEach(inject(function (_DataModel_) {
    DataModel = _DataModel_;
  }));

  it('should do something', function () {
    expect(!!DataModel).toBe(true);
  });

});
