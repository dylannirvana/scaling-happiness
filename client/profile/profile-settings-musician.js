Template.profileSettingsMusician.helpers({

  'allowFollowers': {

  }

});


Template.profileSettingsMusician.events({

  'change #profile-dont-allow-followers': function(e, template) {
    var allow = $('#profile-dont-allow-followers').is(':checked');

    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.settings.allowFollowers': allow
      }
    }, function(error, res){
      console.log(res);
      if(error){
        toastr.error(error.message, 'Missing value'); 
      } else {
        toastr.success('Profile updated', 'Success!')
      }
      //console.log(error);
    });
  },

  'change #profile-dont-allow-birthday': function(e, template) {
    var allow = $('#profile-dont-allow-birthday').is(':checked');

    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.settings.allowBirthday': allow
      }
    }, function(error, res){
      console.log(res);
      if(error){
        toastr.error(error.message, 'Missing value'); 
      } else {
        toastr.success('Profile updated', 'Success!')
      }
      //console.log(error);
    });
  },

});


