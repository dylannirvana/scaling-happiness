Template.projectsAll.helpers({
  'userName': function(userId) {
    return Meteor.user(userId).profile.name;
  }
})