Router.route('newSelfie', {
  path: '/profile/selfies/new',
  template: 'newSelfie',
  waitOn: function() {
    return Meteor.subscribe('selfies', Meteor.userId());
  }
});

Router.route('selfieDetails', {
  path: '/profile/selfies/:_id',
  template: 'selfieDetails',
  waitOn: function() {
    return Meteor.subscribe('selfies', Meteor.userId());
  },
  data: function() {
    var that = this;
    var templateData = {
      selfie: Selfies.findOne(that.params._id)
    }
    return templateData;
  }
});

Router.route('profileSelfies', {
  path: '/profile/selfies',
  template: 'selfies',
  waitOn: function() {
    return Meteor.subscribe('selfies', Meteor.userId());
  }
});

// selfies for public users are in public-user.js routes file


