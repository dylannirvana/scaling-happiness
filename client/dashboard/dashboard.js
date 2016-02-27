Template.dashboardLayout.events({
  
  'click .log-out': function() {
    Meteor.logout(function(){
      Router.go('login');
    });
  },

  'click #main': function() {
    //console.log('cllll');
    $('.chat-popup:visible').hide();
  }

});


Template.dashboardLayout.helpers({

  

});