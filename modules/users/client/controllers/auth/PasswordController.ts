(function () {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['$scope', '$stateParams', 'UsersService', '$location', 'AuthenticationService', 'PasswordValidator', 'Notification'];

  function PasswordController($scope, $stateParams, UsersService, $location, authenticationService, PasswordValidator, Notification) {
    var vm = this;

    vm.resetUserPassword = resetUserPassword;
    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = authenticationService;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    function askForPasswordReset(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

        return false;
      }

      UsersService.sendPasswordResetToken(vm.credentials).$promise
        .then(onRequestPasswordResetSuccess)
        .catch(onRequestPasswordResetError);
    }

    // Change user password
    function resetUserPassword(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');

        return false;
      }

      vm.passwordDetails.token = $stateParams.token;
      UsersService.resetPasswordWithToken(vm.passwordDetails).$promise
        .then(onResetPasswordSuccess)
        .catch(onResetPasswordError);
    }

    // Password Reset Callbacks

    function onRequestPasswordResetSuccess(response) {
      // Show user success message and clear form
      vm.credentials = null;
      Notification.success({ message: response.message, title: '<i class="fas fa-check-circle"></i> Password reset email sent successfully!' });
    }

    function onRequestPasswordResetError(response) {
      // Show user error message and clear form
      vm.credentials = null;
      Notification.error({ message: response.data.message, title: '<i class="fas fa-exclamation-triangle"></i> Failed to send password reset email!', delay: 4000 });
    }

    function onResetPasswordSuccess(response) {
      // If successful show success message and clear form
      vm.passwordDetails = null;

      // Attach user profile
      authenticationService.user = response;
      Notification.success({ message: '<i class="fas fa-check-circle"></i> Password reset successful!' });
      // And redirect to the index page
      $location.path('/password/reset/success');
    }

    function onResetPasswordError(response) {
      Notification.error({ message: response.data.message, title: '<i class="fas fa-exclamation-triangle"></i> Password reset failed!', delay: 4000 });
    }
  }
}());