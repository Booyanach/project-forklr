require.config({
    // alias libraries paths
    baseUrl: './static/scripts',
    paths: {
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min',
        'angularResource': '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-resource.min',
        'uiRouter': '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min',
        'forklr': './forklr',       // The main app file

        // Modules
        'coreModule': './core/module',
        'pageModule': './page/module',

        //  Controllers
        'pageController': './page/pageController',
        'urlController': './pages/urlController',

        // Directives - Add all directives bellow this line
        'urlPage': './page/urlPage',

        // Services - Add all services bellow this line
        'apiService': './core/apiService'
    },
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularResource': {
            deps: ['angular']
        },
        'uiRouter': {
            deps: ['angular']
        }
    },
    // Attach the application
    deps: ['./bootstrap']
});