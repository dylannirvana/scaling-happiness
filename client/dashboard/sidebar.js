Template.sidebar.onCreated(function() {
  this.isPlaying = new ReactiveVar(false);
  this.currentTime = new ReactiveVar(1);
  this.duration = new ReactiveVar(1);
  this.interval = new ReactiveVar();
  Meteor.subscribe('all-playlist-items');
  //Meteor.subscribe('singers-playlist-items');
  //Meteor.subscribe('song-playlist-items');

})

Template.sidebar.events({
  'click li#playlist a.accordion-toggle': function(e, t) {
    $(e.currentTarget).parent().find('ul.nav').toggleClass('playlist-show');    
  },
  'mouseover li#playlist': function(e, t) {
    $(e.currentTarget).parent().find('ul.nav').addClass('playlist-show');
  },
  'mouseleave li#playlist': function(e, t) {
    $(e.currentTarget).parent().find('ul.nav').removeClass('playlist-show');
  },

  'click .playlist-type': function(e, t) {
    $(e.currentTarget).next('.player').toggleClass('show');
  },

  // 'play .audio': function(e, template) {
  //   var instance = Template.instance();
  //   var interval = setInterval(function() {
  //     var audio = template.find('.audio');
  //     instance.currentTime.set(audio.currentTime);
  //   }, 25); // this is faster then timeupdate but more costly for CPU
  //   instance.interval.set(interval);
  // },

  'click #play-my-playlist': function(e, t) {
    var instance = Template.instance();

    // stop all other audio before playing new one    
    try {
      $('audio').pause();
    } catch (e) {}

    $('#my-playlist').find('audio')[0].play();
    instance.isPlaying.set(true);
  },

  'click #pause-my-playlist': function(e, t) {
    var instance = Template.instance();
    instance.isPlaying.set(false);
    $('#my-playlist').find('audio')[0].pause();
  },

  'click #play-singer-playlist': function(e, t) {
    var instance = Template.instance();

    // stop all other audio before playing new one    
    try {
      $('audio').pause();
    } catch (e) {}

    $('#singer-playlist').find('audio')[0].play();
    instance.isPlaying.set(true);
  },

  'click #pause-singer-playlist': function(e, t) {
    var instance = Template.instance();
    instance.isPlaying.set(false);
    $('#singer-playlist').find('audio')[0].pause();
  },


  'click #play-song-playlist': function(e, t) {
    var instance = Template.instance();

    // stop all other audio before playing new one    
    try {
      $('audio').pause();
    } catch (e) {}

    $('#song-playlist').find('audio')[0].play();
    instance.isPlaying.set(true);
  },

  'click #pause-song-playlist': function(e, t) {
    var instance = Template.instance();
    instance.isPlaying.set(false);
    $('#song-playlist').find('audio')[0].pause();
  }

});