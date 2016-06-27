(function(angular, module, inject) {
    'use strict';

    let RandomNumberService, $httpBackend, RandomNumberURL, CacheFactory;

    beforeEach(function() {
        angular
            .module('app.config', [])
            .constant('CacheItemLifetime', 2)
            .constant('RandomNumberURL', '/randomNumber');
        module('app.random-number');
    });

    beforeEach(inject(function(_RandomNumberService_, _RandomNumberURL_, _$httpBackend_, _CacheFactory_) {
        $httpBackend = _$httpBackend_;
        CacheFactory = _CacheFactory_;
        RandomNumberService = _RandomNumberService_;
        RandomNumberURL = _RandomNumberURL_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        CacheFactory.destroyAll();
    });

    describe('RandomNumberService', function() {
        it('should return a random number. First the cached value, then the one from the web service.', function() {
            jasmine.clock().install();
            $httpBackend.expectGET(RandomNumberURL).respond(200, '5');
            expect(RandomNumberService.getRandomNumber().val).toMatch(/^cached:/);
            jasmine.clock().tick(1001); // necessary to run timeout function in random-number.service.js
            $httpBackend.flush();

            expect(RandomNumberService.getRandomNumber().val).toMatch(/^fresh:/);
        });
    });

}(angular, angular.mock.module, angular.mock.inject));
