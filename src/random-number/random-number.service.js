(function(angular) {
    'use strict';

    angular
        .module('app.random-number')
        .factory('RandomNumberService', RandomNumberService);

    RandomNumberService.$inject = ['$http', 'RandomNumberURL', 'CacheFactory', 'CacheItemLifetime'];

    function RandomNumberService($http, RandomNumberURL, CacheFactory, CacheItemLifetime) {
        let randomNumber = { val: 'cached: 4' };
        let timedCache = CacheFactory.get('timedCache') ||
            CacheFactory('timedCache', {
                maxAge: CacheItemLifetime
            });

        return {
            getRandomNumber: getRandomNumber.bind(this)
        };

        function getRandomNumber(clearCache) {
            requestRandomNumber(clearCache);
            return randomNumber;
        }

        function requestRandomNumber(clearCache) {
            if (clearCache) {
                timedCache.remove(RandomNumberURL);
            }

            setTimeout(function() {
                $http
                    .get(RandomNumberURL, { cache: timedCache })
                    .then(function(response) {
                        // this if is necessary to prevent an endless $digest cycle-loop
                        let num = response.data.trim();
                        if (!randomNumber.val.match(/' ' + num + '$'/)) {
                            randomNumber = { val: 'fresh: ' + num };
                        }

                    }).catch(function(error) {
                        console.error('Requesting RandomNumberURL failed:', error);
                        throw 'Requesting RandomNumberURL failed';
                    });
            }, 1000); // Delay request for demo purposes
        }
    }
}(angular));
