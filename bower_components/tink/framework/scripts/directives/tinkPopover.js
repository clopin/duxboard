'use strict';
angular.module('tink.popOver', ['tink.tooltip'])
.directive( 'tinkPopoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'templates/popover.html'
  };
})
.directive( 'tinkPopover', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tinkPopover', 'popover', 'click' );
}]);