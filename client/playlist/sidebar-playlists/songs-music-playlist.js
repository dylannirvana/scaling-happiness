Template.SongMusicPlaylist.helpers({
  playlist: function(){
    return Playlists.find({ownerId: Meteor.userId(), name: 'songs'});
  },
  isNoTracks: function() {
    return !SongPlaylistItems.find().count();
  },
  tracks: function() {
    return SongPlaylistItems.find({
      ownerId: Meteor.userId()
    });
  },
});


Template.SongMusicPlaylist.events({
   
});


Template.SongMusicPlaylist.onRendered(function() {
  var instance = Template.instance();
  //console.log(instance);
  $(".playlist#song-playlist").droppable({
    drop: function(event, ui) {
      var trackId = Blaze.getData(ui.draggable[0])._id;
      console.log(Blaze.getData(ui.draggable[0]));
      SongPlaylistItems.insert({
        ownerId: Meteor.userId(),
        trackId: trackId,
        playlistId: instance.mainPls.get() && instance.mainPls.get()._id || Playlists.findOne({ownerId: Meteor.userId(), name: 'songs'})._id
      }, function(err, res) {
        console.log(err || res);
      })
    }
  });
}); 



Template.SongMusicPlaylist.onCreated(function() {
  
  
  if (Meteor.userId()) {
    var mainPlaylist = Playlists.findOne({
      ownerId: Meteor.userId(),
      name: 'songs'
    });

    if(!mainPlaylist) {
      Playlists.insert({
        ownerId: Meteor.userId(),
        name: 'songs'
      })
    }


    this.mainPls = new ReactiveVar(mainPlaylist);
    //Meteor.subscribe('song-playlist-items');
  };
});