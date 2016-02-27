Template.profilePublic.rendered = function() {
  $('.body').addClass('profile-page');
};

Template.profilePublic.helpers({

  'posts': function() {
    return Posts.find({}, {sort: {postedOn: -1}});
  }

});

Template.profilePublic.events({

  'click #create-new-post': function() {
    var postContent = $('.new-post-editor').find('.froala-view').html();
    var currentRoute = Router.current().route.getName();
    var userWallId;
    if(currentRoute === 'profilePublic') {
      userWallId = this.publicUser._id;
    } else {
      userWallId = Meteor.userId();
    }

    if(postContent !== '') {
      Posts.insert({
        ownerId: Meteor.userId(),
        userWallId: userWallId, //todo, add user id if it was posted on someone else's wall
        content: postContent,
        postedOn: new Date()
      }, function(err, res) {
        if(!err){
          $('.new-post-editor').find('.froala-view').html('');
        }
      });
    }

  }

});
