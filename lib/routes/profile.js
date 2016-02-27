/* Profile routes */

// profile summary screen
Router.route('profile', {
  path: '/profile/me',
  waitOn: function() {

    Meteor.subscribe('followings');
    Meteor.subscribe('connections');
    var allFollowings = Followings.find().fetch();
    var allFollowedUsersIds = _.map(allFollowings, function(following){
        return following.user.id;
    });
    if(allFollowings.length > 0) {
      return Meteor.subscribe('userAndFollowedPosts', allFollowedUsersIds);
    } else {
      return Meteor.subscribe('userposts', Meteor.userId());
    }
  }
});

// profile summary screen
Router.route('profileMusician', {
  path: '/profile/musician',
  template: 'profileMusician'
});

Router.route('profileEdit', {
  path: '/profile/edit',
  template: 'profileEdit'
});

Router.route('profileSettings', {
  path: '/profile/settings',
  before: function() {
    if(Meteor.user() && Meteor.user().profile.accountType == 'musician') {
      this.render('profileSettingsMusician');
    } else {
      this.render('profileSettingsFan');
    }
  }
});

Router.route('profileBilling', {
  path: '/profile/billing',
  template: 'profileBilling'
});


Router.route('profileBio', {
  path: '/profile/bio',
  template: 'profileBio'
});

Router.route('profileDiary', {
  path: '/profile/diary',
  template: 'profileDiary',
  onBeforeAction: function() {
    if(Meteor.user().profile.accountType === 'musician') {
      Router.go('profile');
    } else {
      this.next();
    }
  },
  waitOn: function() {
    return Meteor.subscribe('diary', Meteor.userId());
  }
});

Router.route('profileChangePassword', {
  path: '/profile/change-password',
  template: 'changePassword'
});


Router.route('profileEvents', {
  path: '/profile/events',
  template: 'profileEvents',
  onBeforeAction: function() {
    if(Meteor.user().profile.accountType !== 'musician') {
      Router.go('profile');
    } else {
      this.next();
    }
  },
  waitOn: function() {
    var calendar = Meteor.subscribe('calendar', function () {
      Session.set('superCalendarReady', true);
    });
    return calendar;
  }
});
