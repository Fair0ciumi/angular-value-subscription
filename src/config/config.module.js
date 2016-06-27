(function(angular) {
    'use strict';

    angular
        .module('app.config', [])
        .constant('CacheItemLifetime', 5 * 1000)
        .constant('RandomNumberURL', 'https://www.random.org/integers/?num=1&min=0&max=100&col=1&base=10&format=plain&rnd=new');
        // .constant('RandomNumberURL', '/randomNumber');

}(angular));
