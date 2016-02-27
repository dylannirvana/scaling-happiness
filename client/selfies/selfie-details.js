Template.selfieDetails.events({
  'click .fa-trash': function() {
    Selfies.remove(this._id);
  },

  'click .back-to-album': function() {
    history.go(-1);
  }
});
