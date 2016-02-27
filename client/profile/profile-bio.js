Template.profileBio.onRendered(function() {

    if(Meteor.user()) {
      var country = Meteor.user().profile.country;
      $('#country_select').val( country );
    }

});


Template.profileBio.events({
  // 'click #update-bio': function(t) {

  //   Meteor.users.update({_id: Meteor.userId()}, {
  //     $set: {
  //       'profile.bio': $('#profile-bio-editor .froala-view').html()
  //     }
  //   }, function(error){
  //     if(error){
  //       toastr.error(error.message, 'Missing value'); 
  //     } else {
  //       toastr.success('Profile updated', 'Success!')
  //     }
  //     //console.log(error);
  //   });
  // },

  'submit #profile-bio-form': function(e) {
    e.preventDefault();
    var birthday = $('#profile-bio-birthday').val();
    var country = $('#country_select').val();
    var interests = $('#profile-bio-interests').val();
    var history = $('#profile-bio-history').val();

    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.dob': birthday,
        'profile.country': country,
        'profile.bio.interests': interests,
        'profile.bio.history': history
      }
    }, function(error, res){
      if(error){
        toastr.error(error.message, 'Missing value'); 
      } else {
        toastr.success('Bio updated', 'Success!')
      }
    });

  }

});


Template.profileBio.helpers({

  'birthdayFormatted': function() {
    return Meteor.user() ? moment(Meteor.user().profile.dob).format('YYYY-MM-DD') : '';
  }

});

