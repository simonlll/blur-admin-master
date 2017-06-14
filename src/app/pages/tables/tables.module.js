/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', ['ui.bootstrap.demo'])
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
        }).state('tables.basic', {
          url: '/basic',
          templateUrl: 'app/pages/tables/basic/tables.html',
          controller: 'OrderPageCtrl',
          title: '订单管理',
          sidebarMeta: {
            order: 0,
          },
        }).state('tables.smart', {
          url: '/smart',
          controller: 'TablesPageCtrl',
          templateUrl: 'app/pages/tables/smart/tables.html',
          title: '用户管理',
          sidebarMeta: {
            order: 100,
          },
        });
    $urlRouterProvider.when('/tables','/tables/basic');
  }

})();
