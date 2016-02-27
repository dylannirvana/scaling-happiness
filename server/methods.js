Meteor.methods({
  registerUser: function(userObj, roles) {
    var id = Accounts.createUser(userObj);
    Accounts.sendVerificationEmail(id);
    if (roles.length > 0) {
      Roles.addUsersToRoles(id, roles);
    }
  },

  updatePhoto: function(photoUrl) {
    Meteor.users.update(this.userId, {
      $set: {
        'profile.photo': photoUrl
      }
    });
  },
  updateProfile: function(profileData) {
    //console.log(profileData);
    Meteor.users.update(this.userId, {
      $set: {
        'profile.name': profileData.name,
        'profile.firstName': profileData.firstName,
        'profile.lastName': profileData.lastName,
        'profile.lastName': profileData.lastName,
        'username': profileData.email,
        'emails': [{
          address: profileData.email,
          verified : false
        }]
      }
    });
  },
  getPublicUserInfo: function(publicUserId) {
    return Users.find();
  }
});
