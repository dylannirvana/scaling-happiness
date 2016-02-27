Template.header.onCreated(function() {
  this.is_mouse_inside = new ReactiveVar(false);
})

Template.header.rendered = function() {
  // $('#header-playlist').dropdownHover({
  //   instantlyCloseOthers: true
  // });
}

Template.header.helpers({
  profileData: function() {
    var profileData = {};
    if (Meteor.user()) {
      if (Meteor.user().profile.photo !== '') {
        profileData.photo = Meteor.user().profile.photo;
      } else {
        profileData.photo = '/images/default_profile.png';
      }
      profileData.username = Meteor.user().username || "";
      profileData.firstName = Meteor.user().profile.firstName || "";
      profileData.lastName = Meteor.user().profile.lastName || "";
      profileData.name = Meteor.user().profile.name || "";
      profileData.email = Meteor.user().emails[0].address || "";
    }

    return profileData;
  }
});

Template.header.events({
  "click #toggle_sidemenu_l": function(event, template) {
    // We check to see if the the user has closed the entire
    // leftside menu. If true we reopen it, this will result
    // in the menu resetting itself back to a minified state.
    // A second click will fully expand the menu.
    if ($('body').hasClass('sb-l-c') && options.collapse === "sb-l-m") {
      $('body').removeClass('sb-l-c');
    }

    // Toggle sidebar state(open/close)
    $('body').toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');

    setTimeout(function() {
      $(window).trigger('resize');
    }, 300)
  },

  "keyup .search-input input": function(e){
    var instance = Template.instance();
    instance.is_mouse_inside = true;
    if($(e.currentTarget).val() !== ''){
      $('.search-results').show();
    } else {
      $('.search-results').hide();      
    }
  },

  'click div': function() {
    $('.search-results').hide();    
  }

});
