Router.route('mymusic', {
  path: '/music/me',
  template: 'Music',
  waitOn: function() {
    return [
      Meteor.subscribe('user-music', Meteor.userId()),
      Meteor.subscribe('user-covers', Meteor.userId()),
      // IRLibLoader.load('/lib/toast-notification.js'),
      // IRLibLoader.load('/lib/easing.js'),
      // IRLibLoader.load('/lib/mask.js'),
      // IRLibLoader.load('/lib/stripe.js'),
      // IRLibLoader.load('/lib/utilities.js'),
      // IRLibLoader.load('/lib/login-plugins.js'),
      // IRLibLoader.load('/lib/theme.js')
    ]
  }
});


Router.route('musicNew', {
  path: '/music/new',
  template: 'MusicUpload'
});


Router.route('musicPublic', {
  path: '/music/:_id',
  template: 'Music'
});