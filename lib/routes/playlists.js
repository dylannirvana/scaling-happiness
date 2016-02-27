/* Playlists routes */

// album playlist
Router.route('playlist.album', {
  path: '/playlists/album',
  template: 'playlistsAlbum',
  waitOn: function() {
    return [
      Meteor.subscribe('user-music', Meteor.userId()),
      Meteor.subscribe('user-covers', Meteor.userId())
    ]
  }
});

// video playlist
Router.route('playlist.video', {
  path: '/playlists/video',
  template: 'playlistsVideo'
});

// album playlist
Router.route('playlist.picture', {
  path: '/playlists/picture',
  template: 'playlistsPicture'
});