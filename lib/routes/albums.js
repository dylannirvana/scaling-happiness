Router.route('pictureAlbum', {
  path: '/pictures/all',
  template: 'pictureAlbum',
  waitOn: function() {
    var that = this;
    return Meteor.subscribe('pictures');
  },
  data: function() {
    var that = this; 
    var templateData = {
      pictures: Pictures.find().fetch()
    };
    console.log(templateData);
    return templateData;
  }
});


Router.route('pictureDetails', {
  path: '/pictures/:_id',
  template: 'pictureDetails',
  waitOn: function() {
    var that = this;    
    return Meteor.subscribe('pictures');
  },
  data: function() {
    var that = this; 
    var templateData = {
      picture: Pictures.findOne(that.params._id)
    };
    return templateData;
  }
});




Router.route('videoAlbum', {
  path: '/videos/all',
  template: 'videoAlbum',
  waitOn: function() {
    var that = this;
    return Meteor.subscribe('videos');
  },
  data: function() {
    var that = this; 
    var templateData = {
      videos: Videos.find().fetch()
    };
    //console.log(templateData);
    return templateData;
  }
});


Router.route('videoDetails', {
  path: '/videos/:_id',
  template: 'videoDetails',
  waitOn: function() {
    var that = this;
    return Meteor.subscribe('videos');
  },
  data: function() {
    var that = this; 
    var templateData = {
      video: Videos.findOne()
    };
    return templateData;
  }
});