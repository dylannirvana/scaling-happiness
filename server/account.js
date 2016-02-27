Meteor.users.allow({
  remove: function () { 
    return true 
  },
  update: function (userId, docs, fields, modifier) {
    return true;
  }
});

  /*

    takes the users email address
    and runs a query against the invitations collection
    to see if the user is on the list to create
    an account

  */
  function isInvited(emailAddress) {

    var invitations = Invitations.find({

      email: emailAddress

    });

    return invitations.count() > 0;

  }
