Template.registerHelper("isMusician", function () {

    if(Meteor.user() && Meteor.user().profile.accountType === 'musician') {
      return true;
    }

});


Template.registerHelper("isNotMusician", function () {

    if(Meteor.user() && Meteor.user().profile.accountType !== 'musician') {
      return true;
    }

});


Template.registerHelper("isFan", function () {

    if(Meteor.user() && Meteor.user().profile.accountType === 'fan') {
      return true;
    }
    
});

Template.registerHelper("isMusicianPaid", function () {

    if(Meteor.user() && Meteor.user().profile.paid == true) {
      return true;
    }

});


Template.registerHelper("isMember", function () {

    if(Meteor.user() && Meteor.user().profile.accountType === 'member') {
      return true;
    }

});



Template.registerHelper("isPublic", function () {

    var url = Router.current().originalUrl;
    var isProfilePublic = url.indexOf('/profile/public/') > -1;
    return isProfilePublic;

});

Template.registerHelper("isAdmin", function () {

    if(Meteor.user() && Meteor.user().profile.accountType === 'admin') {
      return true;
    }

});

// checks if the current user views their own profile
Template.registerHelper("isMe", function () {
    if(Meteor.user() && Meteor.userId() === this._id) {
      return true;
    }
});

// checks if the current user doesn't view their own profile
Template.registerHelper("isNotMe", function () {
    if(Meteor.user() && Meteor.userId() !== this._id) {
      return true;
    }
});
