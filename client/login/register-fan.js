Template.registerFan.events({
  'submit #registration-form-fan': function(e) {
    e.preventDefault();

    var form = $('#registration-form-fan');
    var formValues = GK.convertSerializedArray(form.serializeArray()); //serilize form array
    var accountType = 'fan';

    // gather up the user info into an object
    var userObj = {
      username: formValues.email,
      email: formValues.email,
      password: formValues.password,
      profile: {
        email: formValues.email,
        name: formValues.first_name + ' ' + formValues.last_name,
        photo: '/images/default_profile.png',
        firstName: formValues.first_name,        
        lastName: formValues.last_name,
        country: $('#registration-form-fan #country_select').val(),
        accountType: accountType    
      },
      settings: {}
    };

    function isInvited(emailAddress) {
      Meteor.subscribe('invitations');
      var invitations = Invitations.find({
        email: emailAddress
      });
      return invitations.count() > 0;
    }

    //var allowedEmail = isInvited(formValues.email);


    form.validate({
      rules: {
        first_name: {
          minlength: 2
        },
        last_name: {
          minlength: 2
        },
        country_select: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        password: {
          minlength: 6
        },
        repeat_password: {
          equalTo: "#password"
        }
      },
      messages: {
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com"
        }
      },
      submitHandler: function () {

        // create the user when form is valid
        Accounts.createUser(userObj, function(err) {
          // console.log('there was an issue creating the account...', err);
          if(!err) {
            // send the user into their dashboard
            Router.go('profileEdit');

          } else {
            toastr.error(err.reason, 'Error');
          }
        });

      }
    });
  }
});