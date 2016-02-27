Template.trackItem.onCreated(function() {
  this.isPlaying = new ReactiveVar(false);
  this.currentTime = new ReactiveVar(1);
  this.duration = new ReactiveVar(1);
  this.interval = new ReactiveVar();
})

Template.trackItem.onRendered(function() {
  this.$('.track-item').draggable({
    cursorAt: {
      top: 25,
      left: 190
    },
    helper: 'clone',
    refreshPositions: true,
    drag: function() {
      //console.log(Meteor.user());
      if(Meteor.user() && Meteor.user().profile.accountType === 'fan') {
        //console.log(Meteor.user());
        Router.go('profileBilling');
      } else {
        $('.inner-content-area').addClass('dragging');
        $('.sidebar-playlist').addClass('jqhover');
      }

    },
    stop: function() {
      $('.inner-content-area').removeClass('dragging');
      $('.sidebar-playlist').removeClass('jqhover');
    }
  });
})

Template.trackItem.helpers({
  coverImg: function() {
    return Covers.findOne(Template.instance().data.coverId)
  },
  isPlaying: function() {
    var instance = Template.instance();
    return instance.isPlaying.get();
  },
  cursorAttributes: function() {
    var instance = Template.instance();
    var currentTime = instance.currentTime.get() || 1;
    var duration = instance.duration.get() || 1;
    return "width: " + (currentTime * 100 / duration) + "%; " + "height: 100%;";
  }
})

Template.trackItem.events({
  'durationchange .audio': function(e, template) {
    var instance = Template.instance();
    var audio = template.find('.audio');
    instance.duration.set(audio.duration)
  },
  'play .audio': function(e, template) {
    var instance = Template.instance();
    var interval = setInterval(function() {
      var audio = template.find('.audio');
      instance ? instance.currentTime.set(audio.currentTime) : '';
    }, 25); // this is faster then timeupdate but more costly for CPU
    instance.interval.set(interval);
  },
  'ended .audio': function() {
    var instance = Template.instance();
    instance.isPlaying.set(false);
    return clearInterval(instance.interval.get());
  },
  'timeupdate .audio': function(e, template) {},
  'click .play': function(e, template) {
    try {
      $('audio').pause();
    } catch (e) {}
    var instance = Template.instance();
    instance.isPlaying.set(true);
    console.log(template.find('audio').play);
    template.find('audio').play();
  },
  'click .pause': function(e, template) {
    var instance = Template.instance();
    instance.isPlaying.set(false);
    template.find('audio').pause();
  },
  'click .line': function(e, template) {
    var instance = Template.instance();
    var x = e.offsetX;
    console.log('durattion', instance.duration.get());
    var width = e.currentTarget.offsetWidth;
    var newTime = (x / width) * instance.duration.get();
    console.log('newTime', newTime);
    template.find('.audio').currentTime = newTime;
  }
})
