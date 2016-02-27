const templateHelpers = {
  distanceInTime: function (date) {
    return moment(date).fromNow();
  },

  postedOnFormatted: function(postedOn) {
    return moment(postedOn).format('MM/DD/YYYY hh:mm a');
  },

  dateFormatted: function(date) {
    return moment( new Date(date) ).format('MM/DD/YYYY');
  },

  isMyPost: function(userId) {
    return Meteor.userId() === userId ? true : false
  },

  postUserName: function(userId) {
    Meteor.subscribe('publicUser', userId);
    if(Meteor.users.findOne(userId)) {
      return Meteor.users.findOne(userId).profile.name;
    }
  },

  postUserPhoto: function(userId) {
    Meteor.subscribe('publicUser', userId);
    if(Meteor.users.findOne(userId)) {
      return Meteor.users.findOne(userId).profile.photo;
    }
  }

};


_(templateHelpers).each(function(value, key){
  Template.registerHelper(key, value);
});
