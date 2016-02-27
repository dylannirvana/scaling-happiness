Template.myMusicPlaylist.helpers({
  playlist: function(){
    return Playlists.find({ownerId: Meteor.userId(), name: 'main'});
  },
  isNoTracks: function() {
    return !MyPlaylistItems.find().count();
  },
  tracks: function() {
    return MyPlaylistItems.find({
      ownerId: Meteor.userId()
    });
  },
});


Template.myMusicPlaylist.events({

});


Template.myMusicPlaylist.onRendered(function() {
  var instance = Template.instance();

  $(".playlist#my-playlist").droppable({
    drop: function(event, ui) {
      var trackId = Blaze.getData(ui.draggable[0])._id;

      console.log(instance.mainPls.get());
      console.log(instance);

      MyPlaylistItems.insert({
        ownerId: Meteor.userId(),
        trackId: trackId,
        playlistId: instance.mainPls.get() && instance.mainPls.get()._id || Playlists.findOne({ownerId: Meteor.userId(), name: 'main'})._id
      }, function(err, res) {
        console.log(err || res);
      })
    }
  });
});


Template.myMusicPlaylist.onCreated(function() {
  //Meteor.subscribe('playlists');

  if (Meteor.userId()) {
    var mainPlaylist = Playlists.findOne({
      ownerId: Meteor.userId(),
      name: 'main'
    });

    if(!mainPlaylist) {
      Playlists.insert({
        ownerId: Meteor.userId(),
        name: 'main'
      })
    }


    this.mainPls = new ReactiveVar(Playlists.findOne({
      ownerId: Meteor.userId(),
      name: 'main'
    }));
    Meteor.subscribe('my-playlist-items');
  };
});
