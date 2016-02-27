Template.profile.rendered = function() {
  $('.body').addClass('profile-page');
}

Template.profile.helpers({
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
      profileData.role = Meteor.user().roles ? Meteor.user().roles[0] : "";
    }

    return profileData;
  },

  'followings': function() {
    //console.log(Followings.find().fetch());
    return Followings.find();
  },


  'posts': function() {
    //return Posts.find().fetch().reverse();
    return Posts.find({}, {sort: {postedOn: -1}});
    //Meteor.subscribe('userposts', Meteor.userId());
    // var allFollowings = Followings.find().fetch();

    // var allFollowedUsersIds = _.map(allFollowings, function(following){
    //     return following.user.id;
    // });


    // if(allFollowings.length > 0) {
    //   Meteor.subscribe('userAndFollowedPosts', allFollowedUsersIds);
    //   return Posts.find().fetch().reverse();
    // } else {
    //   Meteor.subscribe('userposts', Meteor.userId());
    //   return Posts.find().fetch().reverse();
    // }

  },

});


Template.profile.events({
  'click #create-new-post': function() {
    var postContent = $('.new-post-editor').find('.froala-view').html();
    var url = Router.current().originalUrl;
    var isProfilePublic = url.indexOf('/profile/public/') > -1;
    var userWallId;
    //console.log('is public? '+isProfilePublic);
    if(isProfilePublic) {
      // console.log('profile public');
      // console.log(this._id);
      userWallId = this._id;
    } else {
      userWallId = Meteor.userId();
    }


    if(postContent != '') {
      // console.log('userWallId '+userWallId);
      Posts.insert({
        ownerId: Meteor.userId(),
        userWallId: userWallId, //todo, add user id if it was posted on someone else's wall
        content: postContent,
        postedOn: new Date()
      }, function(err, res) {
        console.log(err || res);
        if(!err){
          $('.new-post-editor').find('.froala-view').html('');
        }
      })
    }

  }

});
