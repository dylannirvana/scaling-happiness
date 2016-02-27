/*

  handling password reset link is in login.js @AB

*/

Template.forgotPassword.events({
  'submit #form-forgot-password': function(e) {

    e.preventDefault();

    var resetForm = $('#form-forgot-password');  
    var email = resetForm.find('#username').val();    
    
    Accounts.forgotPassword({email: email}, function(err){

      if(err) {

        toastr.error(
          err.reason,
          'Reset password failed'
        );

      } else {

        toastr.success(
          'Check your email address to complete resetting your password.',
          'Reset Started'
        );
      
      }

    });
  }
});


Template.forgotPassword.helpers({ });