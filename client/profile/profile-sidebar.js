Template.profileSidebar.onCreated(function () {
  var url = Router.current().originalUrl;
  var template = this;
  template.isProfilePublic = url.indexOf('/profile/public/') > -1;

  if(template.isProfilePublic){
    template.profileId = Router.current().params._id;
    Meteor.subscribe('publicUser', template.profileId);

    // Request the connection status from the server.
    // this is done so that we don't have to sync all friends, past friendships,
    // etc to the client
    template.connectionStatus = new ReactiveVar();
    template.autorun(function () {
      var connection = Connections.findOne({
        userIds: { $all: [Meteor.userId(), template.profileId] }
      });
      template.connectionStatus.set( connection ? connection.status : '' );
    });
  }
});

Template.profileSidebar.helpers({

  // Returns the user being viewed when viewing a public profile, or the current
  //   user if looking at a private profile page.
  'user': function() {
    var template = Template.instance();
    return template.isProfilePublic ?
      Meteor.users.findOne( template.profileId ) :
      Meteor.user();
  },

  'isPublic': function() {
    return Template.instance().isProfilePublic;
  },

  // check if the current user is following this public profile
  'isFollowing': function() {
    var currentPublicUser = Followings.find({
      'user.id': Template.instance().profileId
    }).fetch();

    if (currentPublicUser && currentPublicUser.length > 0){
      Session.set('publicFollowId', currentPublicUser[0]._id);
      return true; // return true if user follows public profile
    } else {
      Session.set('publicFollowId', false);
      return false;
    }
  },

  'isPublicMusician': function(user) {
    if(user && user.profile) {
      return user.profile.accountType === 'musician';
    }
  },

  // on the profile-sidebar template, this is only used around connections,
  // which is different from followings. Not sure if the rules are applied
  // correctly.
  'canFollow': function() {
    var currentPublicUserId = this.publicUser ? this.publicUser._id : '';
    var user = Meteor.users.findOne(currentPublicUserId);
    if(user) {
      return user.profile.accountType === 'musician' ? user.profile.settings.allowFollowers : true;
    }
  },

  connectionExists: function () {
    return Template.instance().connectionStatus.get();
  },

  'approved': function() {
    return Template.instance().connectionStatus.get() === 'approved';
  },

  'pending': function () {
    return Template.instance().connectionStatus.get() === 'pending';
  },

  'messages': function() {
    return Chats.find({}, {sort: {createdAt: -1}});
  },

  userProfile: function() {
    var that = this;
    var userProfile = Meteor.users.findOne(that.senderId);
    return userProfile;
  }

});


Template.profileSidebar.events({
  // if user clicks follow button, start following this profile
  'click #follow': function(e) {
    e.preventDefault();
    var that = this.publicUser;
    //only execute this if user is signed in
    if( Meteor.user() ) {
      var publicUser = {
        id: that._id,
        name: that.profile ? that.profile.name : '',
        bio: that.profile ? that.profile.bio : '',
        photo: that.profile ? that.profile.photo : '',
        role: that.role
      };

      Followings.insert({
        user: publicUser
      });

    }
  },

  'click #unfollow': function(e) {
    e.preventDefault();
    var that = this;
    var following = Session.get('publicFollowId');

    //only execute this if user is signed in
    if( Meteor.user() ) {
      Followings.remove(following);
    }

  },

  'click #remove-user': function(e) {
    e.preventDefault();
    Meteor.call('removeFriend', Template.instance().profileId);
    Template.instance().connectionStatus.set('');
  },

  'click #add-user': function(e) {
    e.preventDefault();
    Meteor.call('addFriend', Template.instance().profileId);
    Template.instance().connectionStatus.set('pending');
  },

  'submit #chat-message': function(e) {
    e.preventDefault();
    var that = this;

    Chats.insert({
      receipientId: that._id,
      message: $('#chat-message-input').val()
    }, function(error){
      if(error){
        toastr.error(error.message, 'Error');
      } else {
        // if successfully save message clear input
        $('#chat-message-input').val('');
      }
    });
  }
});
