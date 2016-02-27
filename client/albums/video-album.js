Template.videoAlbum.helpers({
  'isPublic': function() {
    var url = Router.current().originalUrl;
    var isProfilePublic = url.indexOf('/profile/public/') > -1;
    console.log(isProfilePublic);
    return isProfilePublic;
  },

  'userid': function(parentContext) {
    console.log(parentContext);
    return parentContext.publicUser._id;
  }
});

Template.videoAlbum.events({

  'click .open-public-video': function(e, t) {
    e.preventDefault();
    var videoid = $(e.currentTarget).data('id');
    var userid = t.data.publicUser._id;
    Router.go('publicVideoDetails', {
      _id: userid,
      videoid: videoid
    });
  }

});
