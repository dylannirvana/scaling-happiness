Invitations = new Mongo.Collection('invitations');

var invitationsSchema = new SimpleSchema({

  domain: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  }

});