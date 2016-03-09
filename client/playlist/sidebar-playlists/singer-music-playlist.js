Template.SingerMusicPlaylist.helpers({
  playlist: function(){
    return Playlists.find({
      ownerId: Meteor.userId(),
      name: 'singers'
    });
  },
  isNoTracks: function() {
    return !SingerPlaylistItems.find().count();
  },
  tracks: function() {
    return SingerPlaylistItems.find({
      ownerId: Meteor.userId()
    });
  },
});


Template.myMusicPlaylist.events({

});


Template.SingerMusicPlaylist.onRendered(function() {
  var instance = Template.instance();
  // console.log(instance);
  $(".playlist#singer-playlist").droppable({
    drop: function(event, ui) {
      //var trackId = Blaze.getData(ui.draggable[0])._id;
      var track = Blaze.getData(ui.draggable[0]);
      //console.log(Blaze.getData(ui.draggable[0]));
      SingerPlaylistItems.insert({
        ownerId: Meteor.userId(),
        trackId: track._id,
        trackTitle: track.title,
        trackArtist: track.author,
        playlistId: instance.mainPls.get() && instance.mainPls.get()._id || Playlists.findOne({
          ownerId: Meteor.userId(),
          name: 'singers'
        })._id
      }, function(err, res) {
        console.log(err || res);
      })
    }
  });
});


Template.SingerMusicPlaylist.onCreated(function() {
  // Meteor.subscribe('playlists');
  Meteor.subscribe('singers-playlist-items');
  if (Meteor.userId()) {
    var mainPlaylist = Playlists.findOne({
      ownerId: Meteor.userId(),
      name: 'singers'
    });

    if(!mainPlaylist) {
      Playlists.insert({
        ownerId: Meteor.userId(),
        name: 'singers'
      })
    }


    this.mainPls = new ReactiveVar(mainPlaylist);

  };
});
