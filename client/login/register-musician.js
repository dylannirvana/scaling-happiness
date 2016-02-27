Template.registerMusician.events({
  'submit #registration-form-musician': function(e) {
    e.preventDefault();



    var form = $('#registration-form-musician');
    var formValues = GK.convertSerializedArray(form.serializeArray()); //serilize form array
    var accountType = 'musician';
    var allow = $('#allow-chat').is(':checked');

    //var accountType = $('input[name=account]:checked', '#registration-form').val();
    //console.log(formValues);

    function isInvited(emailAddress) {
      Meteor.subscribe('invitations');
      var invitations = Invitations.find({
        email: emailAddress
      });
      return invitations.count() > 0;
    }

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
        country: $('#registration-form-musician #country_select').val(),
        phone: formValues.phone,
        website: formValues.website,
        dob: formValues.dob,
        gender: formValues.gender,
        accountType: accountType, 
        settings: {allowFollowers: allow}
      }
    };



    //Validation method for date of birth input
    // TODO: make validation rule
    // $.validator.addMethod('dob', function(value, element) {
    //   return this.optional(element) || /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(value);
    // }, "Please specify the correct date of birth");

    form.validate({
      rules: {
        first_name: {
          minlength: 2
        },
        last_name: {
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        country_select: {
          required: true
        },
        dob: {
          required: true
        },
        // website: {
        //   url: true
        // },
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
})