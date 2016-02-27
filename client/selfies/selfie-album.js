Template.selfies.helpers({
  'selfiesGroupedByDate': function() {
    var selfies = Selfies.find().fetch().reverse();
    var group = _.groupBy(selfies, function(selfie){
      return selfie.createdAt
    });
    var result = [];
    for (var key in group) result.push({
        date:key,
        selfies:group[key]});
    return result;
  },

  'isPublic': function() {
    var url = Router.current().originalUrl;
    var isProfilePublic = url.indexOf('/profile/public/') > -1;
    //console.log(isProfilePublic);
    return isProfilePublic;
  }
});


Template.selfies.events({
  'click .fa-trash': function() {
    Selfies.remove(this._id);
  },

  'click .open-public-selfie': function(e, t) {
    e.preventDefault();
    var selfieId = $(e.currentTarget).data('id');
    var userid = t.data.publicUser._id;
    Router.go('publicSelfieDetails', {
      _id: userid,
      selfieid: selfieId
    });
  }
});
