Template.pictureAlbum.helpers({
  'isPublic': function() {
    var url = Router.current().originalUrl;
    var isProfilePublic = url.indexOf('/profile/public/') > -1;
    //console.log(isProfilePublic);
    return isProfilePublic;
  },

  'userid': function(parentContext) {
    return parentContext.publicUser._id;
  },

  picturesGroupedByDate: function () {
    var pictures = Pictures.find().fetch();
    var group = _(pictures).groupBy(function (p) {
      return moment(p.createdAt).format('MM/DD/YYYY');
    });

    var result = [];
    for (var date in group){
      result.push({
        date:date,
        pictures:group[date]
      });
    }
    // newest first
    return _(result).sort(function(current, next){
      return new Date(current.date) < new Date(next.date);
    })
  }
});

Template.pictureAlbum.events({

  'click .open-public-picture': function(e, t) {
    e.preventDefault();
    var pictureId = $(e.currentTarget).data('id');
    var userid = t.data.publicUser._id;
    Router.go('pictureDetailsPublic', {
      _id: userid,
      pictureId: pictureId
    });
  }

});
