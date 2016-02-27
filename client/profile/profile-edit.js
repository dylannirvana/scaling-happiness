Template.profileEdit.helpers({
  profileData: function() {
    var profileData = {};
    if (Meteor.user()) {
      if (Meteor.user().profile.photo !== '') {
        profileData.photo = Meteor.user().profile.photo;
      } else {
        profileData.photo = '/images/default_profile.png';
      }
      profileData.username = Meteor.user().username || "";
      profileData.firstName = Meteor.user().profile.firstName || "";
      profileData.lastName = Meteor.user().profile.lastName || "";
      profileData.name = Meteor.user().profile.name || "";
      profileData.email = Meteor.user().emails[0].address || "";
      //profileData.bio = Meteor.user().profile.bio || "";
    }

    return profileData;
  }
});

Template.profileEdit.events({
  'change #photo': function(e,t) {
    var files = e.target.files;

    S3.upload({files:files, path:"/data/"} , function(e, r) {
      Meteor.call('updatePhoto', r.secure_url, function(e, r) {
        if(e) throw(e);
        toastr.success('Photo updated successfully', 'Success!')
      });
    });
  },


  'submit #profile-edit': function(e, t) {
    e.preventDefault();
    var form    = e.target;
    var fname   = form.fname.value;
    var lname   = form.lname.value;
    var email   = form.email.value;
    var pass    = form.password.value;
    var newPass = form.confirmation.value;

    // xxx: Remove some of the redundancy here
    Meteor.users.update( Meteor.userId(), {
      $set: {
        'firstName':          fname,
        'lastName':           lname,
        'profile.name':       fname + ' ' + lname,
        'profile.firstName':  fname,
        'profile.lastName':   lname,
        'profile.email':      email,
        'username':           email
      }
    }, function(error){
      if(error){
        toastr.error(error.message, 'Error updating');
      } else {
        toastr.success('Profile updated', 'Success!');
      }
    });

    // Password changed?
    if(pass && newPass){
      Accounts.changePassword(pass, newPass, function (err) {
        if(err)
          toastr.error(err.message,'Error changing password');
      });
    }
    // reset password fields, successful or not
    form.password.value = '';
    form.confirmation.value = '';
  },

  'click #delete-profile': function(e){
    if(confirm('Are you sure you want to delete your account?')) {

      if(Meteor.user().profile.billing){
        var customer = Meteor.user().profile.billing.id;
        Meteor.call('deleteStripeCustomer', customer, function(err, result) {
          Meteor.users.remove({_id: Meteor.userId()}, function(){});
        });
      } else {
          Meteor.users.remove({_id: Meteor.userId()}, function(){});
      }

    }
  }

});
