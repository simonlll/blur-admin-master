/**
 * @author Simon LIN
 * created on 15.06.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
      //只保留dashboard, tables, 其他的隐藏
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables'
    // 'BlurAdmin.pages.charts',
    // 'BlurAdmin.pages.maps',
    // 'BlurAdmin.pages.profile',
  ])
      .config(routeConfig);

  /** @ngInject */

  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    // 隐藏了附加的登录页等
    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Menu Level 1',
      icon: 'ion-ios-more',
      subMenu: [{
        title: 'Menu Level 1.1',
        disabled: true
      }, {
        title: 'Menu Level 1.2',
        subMenu: [{
          title: 'Menu Level 1.2.1',
          disabled: true
        }]
      }]
    });
  }

})();
