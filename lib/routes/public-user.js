Router.route('profilePublic', {
  path: '/profile/public/:_id',
  
  waitOn: function() {    
    return [
      Meteor.subscribe('publicUser', this.params._id), 
      Meteor.subscribe('followings'), 
      Meteor.subscribe('userposts', this.params._id),
      Meteor.subscribe('chats', this.params._id),
      Meteor.subscribe('connections')
    ]
  },

  data: function() {
    var that = this;
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id)
    }
    return templateData;
  }
});


Router.route('profileChat', {
  path: '/profile/chat/:_id',
  template: 'chat',
  waitOn: function() {
    return [
      Meteor.subscribe('publicUser', this.params._id),
      Meteor.subscribe('chats', this.params._id)
    ]
  },
  data: function() {
    var that = this;
    var templateData = {
      user: Meteor.users.findOne(that.params._id),
      receipientId: that.params._id
    }
    return templateData;
  }
});


Router.route('publicBio', {
  path: '/profile/public/:_id/bio',
  template: 'publicBio',
  waitOn: function() {    
    return [
      Meteor.subscribe('publicUser', this.params._id)
    ]
  },
  data: function() {
    var that = this;
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id)
    }
    return templateData;
  }  
});

Router.route('publicSelfies', {
  path: '/profile/public/:_id/selfies',
  template: 'selfies',
  waitOn: function() {    
    return [
      Meteor.subscribe('selfies',this.params._id),
      Meteor.subscribe('publicUser', this.params._id)
    ];
  },
  data: function() {
    var that = this;
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id)
    }
    return templateData;
  }
});


Router.route('publicSelfieDetails', {
  path: '/profile/public/:_id/selfies/:selfieid',
  template: 'selfieDetails',
  waitOn: function() {
    return [
      Meteor.subscribe('selfies', this.params._id),
      Meteor.subscribe('publicUser', this.params._id)
    ] 
  },
  data: function() {
    var that = this;
    var templateData = {
      selfie: Selfies.findOne(that.params.selfieid),
      publicUser: Meteor.users.findOne(that.params._id)
    }
    console.log(templateData);
    return templateData;
  }
});


Router.route('playlistPublic.album', {
  path: '/profile/public/:_id/playlist',
  template: 'playlistsAlbum',
  waitOn: function() {
    var that = this;
    console.log(that.params._id);
    return [
      Meteor.subscribe('publicUser', that.params._id),
      Meteor.subscribe('user-music', that.params._id),
      Meteor.subscribe('user-covers', that.params._id)
    ]
  },
  data: function() {
    var that = this;
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id)
    }
    return templateData;
  }
});



// album playlist
Router.route('publicPicures', {
  path: '/profile/public/:_id/pictures/all',
  template: 'pictureAlbum',
  waitOn: function() {    
    return [
      Meteor.subscribe('publicUser', this.params._id),
      Meteor.subscribe('pictures', this.params._id)
    ]
  },
  data: function() {
    var that = this;
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id),
      pictures: Pictures.find().fetch()
    }
    console.log(templateData);
    return templateData;
  }
});


Router.route('pictureDetailsPublic', {
  path: '/profile/public/:_id/pictures/:pictureId',
  template: 'pictureDetails',
  waitOn: function() {
    var that = this;    
    return [
      Meteor.subscribe('publicUser', that.params._id),
      Meteor.subscribe('pictures', that.params._id)
    ];
  },
  data: function() {
    var that = this; 
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id),
      picture: Pictures.findOne(that.params.pictureId)
    };
    //console.log(templateData);
    return templateData;
  }
});



Router.route('publicVideos', {
  path: '/profile/public/:_id/videos/all',
  template: 'videoAlbum',
  waitOn: function() {
    var that = this;
    return [
      Meteor.subscribe('publicUser', this.params._id),
      Meteor.subscribe('videos', this.params._id)
    ]
  },
  data: function() {
    var that = this; 
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id),
      videos: Videos.find().fetch()
    };
    //console.log(templateData);
    return templateData;
  }
});


Router.route('publicVideoDetails', {
  path: '/profile/public/:_id/videos/:videoid',
  template: 'videoDetails',
  waitOn: function() {
    var that = this;
    return [
      Meteor.subscribe('publicUser', that.params._id),
      Meteor.subscribe('videos', that.params._id)
    ] 
  },
  data: function() {
    var that = this; 
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id),
      video: Videos.findOne(that.params.videoid)
    };
    return templateData;
  }
});







Router.route('publicEvents', {
  path: '/profile/public/:_id/events',
  template: 'profileEvents',
  waitOn: function() {
    var that = this;
    var calendar = Meteor.subscribe('calendar', function () {
      Session.set('superCalendarReady', true);
    });
    return [
      Meteor.subscribe('publicUser', that.params._id),
      calendar
    ] 
    //return calendar;
  },
  data: function() {
    var that = this; 
    var templateData = {
      publicUser: Meteor.users.findOne(that.params._id)      
    };
    return templateData;
  }
  ///
});
