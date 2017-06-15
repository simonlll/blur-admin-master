/**
 * @author Simon LIN
 * created on 14.06.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.tables', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tables', {
                url: '/tables',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: '订单用户管理',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300,
                },
            }).state('tables.orders', {
            url: '/orders',
            templateUrl: 'app/pages/tables/order/ordertable.html',
            controller: 'OrderTablesPageCtrl',
            title: '订单管理',
            sidebarMeta: {
                order: 0,
            },
        }).state('tables.users', {
            url: '/users',
            controller: 'UserTablesPageCtrl',
            templateUrl: 'app/pages/tables/user/usertable.html',
            title: '用户管理',
            sidebarMeta: {
                order: 100,
            },
        });
        $urlRouterProvider.when('/tables','/tables/users');
    }

})();
