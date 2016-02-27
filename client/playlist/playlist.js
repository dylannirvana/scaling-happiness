Template.Playlist.onCreated(function() {
  if (Meteor.userId()) {
    this.mainPls = new ReactiveVar(Playlists.findOne({
      ownerId: Meteor.userId(),
      name: 'main'
    }));
    Meteor.subscribe('playlist-items');
  };
})

Template.Playlist.onRendered(function() {
  var instance = Template.instance();
  $("#sidebar_left").droppable({
    drop: function(event, ui) {
      var trackId = Blaze.getData(ui.draggable[0])._id;
      PlaylistItems.insert({
        ownerId: Meteor.userId(),
        trackId: trackId,
        playlistId: instance.mainPls.get() && instance.mainPls.get()._id || Playlists.findOne({ownerId: Meteor.userId(), name: 'main'})._id
      }, function(err, res) {
        console.log(err || res);
      })
    }
  });
})

Template.Playlist.helpers({
  playlist: function(){
    return Playlists.find({ownerId: Meteor.userId(), name: 'main'});
  },
  // tracks: function() {
  //   return PlaylistItems.find({
  //     ownerId: Meteor.userId()
  //   });
  // },
  isNoTracks: function() {
    return !PlaylistItems.find().count();
  },
  tracks: function(){
    return Tracks.find({ownerId: Meteor.userId()});
  }
})