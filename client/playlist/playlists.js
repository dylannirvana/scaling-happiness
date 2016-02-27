Template.playlistsAlbum.helpers({
  tracks: function(){
    var userId = Router.current().params._id || Meteor.userId();
    return Tracks.find({ownerId: userId});
  },
  playlist: function(){
    var userId = Router.current().params._id || Meteor.userId();
    return Playlists.find({ownerId: userId, name: 'main'});
  },
  // tracks: function() {
  //   return PlaylistItems.find({
  //     ownerId: Meteor.userId()
  //   });
  // },
  isNoTracks: function() {
    return !MyPlaylistItems.find().count();
  }
});


// Template.playlistsAlbum.onCreated(function() {
//   if (Meteor.userId()) {
//     this.mainPls = new ReactiveVar(Playlists.findOne({
//       ownerId: Meteor.userId(),
//       name: 'main'
//     }));
//     Meteor.subscribe('my-playlist-items');
//   };
// });

// Template.playlistsAlbum.onRendered(function() {
//   var instance = Template.instance();
//   $(".playlist").droppable({
//     drop: function(event, ui) {
//       var trackId = Blaze.getData(ui.draggable[0])._id;
//       MyPlaylistItems.insert({
//         ownerId: Meteor.userId(),
//         trackId: trackId,
//         playlistId: instance.mainPls.get() && instance.mainPls.get()._id || Playlists.findOne({ownerId: Meteor.userId(), name: 'main'})._id
//       }, function(err, res) {
//         console.log(err || res);
//       })
//     }
//   });
// });