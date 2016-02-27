Template.login.events({
  'submit #login-form': function(e) {
    e.preventDefault();
    var form = $('#login-form');
    // Meteor.loginWithPassword(user, password, [callback])
    Meteor.loginWithPassword(
      form.find('#login-email-input').val(),
      form.find('#login-password-input').val(),
      function(error) {
        console.log(error);
        if (error) {
          form.addClass('has-error');
          toastr.error('Wrong username or password', 'Error'); 
        } else {
          // if there are no errors then send the user
          // into their dashboard
          Router.go('profileEdit');
        }
      } //end callback
    );
  }
})
