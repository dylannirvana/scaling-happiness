Connections = new Mongo.Collection("connections");

Connections.attachSchema(new SimpleSchema({

  addedUserId: {
    type: String,
    optional: true
  },

  // the user who requested this friendship
  userId: {
    type: String,
    autoValue: function(){
      // this field will be autovalued unless set by trusted code
      if( !this.isSet || !this.isFromTrustedCode  ) return this.userId;
    },
    optional: true
  },

  userIds: {
    type: [String],
    minCount: 2,
    maxCount: 2,
    // TODO: Need to fix this to prevent duplicate requests, just in case.
    //       The UI rmeoves the button so this shouldn't happen on accident.
    // custom: function () {
    //   Meteor.call('ensureUniqueFriendship', this.value);
    // }
  },

  requestingUserId: {
    type: String,
    autoValue: function(){
      // this field will be autovalued unless set by trusted code
      if( !this.isSet || !this.isFromTrustedCode  ) return this.userId;
    }
  },

  status: {
    type: String,
    allowedValues: ['pending', 'approved', 'rejected']
  },

  createdAt: {
    type: Date,
    autoValue: function(){
      return new Date();
    }
  }

}));



Connections.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.userId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  },
  fetch: ['userId']
});
