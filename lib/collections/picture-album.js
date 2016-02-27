Pictures = new Mongo.Collection("pictures");

Pictures.attachSchema(new SimpleSchema({  

  // user who uploaded the image
  userId: {
    type: String,
    autoValue: function(){
      return this.userId
    }
  },

  // user to whose wall picture was uplaoded to
  guestId: {
    type: String,
    optional: true
  },

  url: {
    type: String
  },
  
  createdAt: {
    type: Date,
    autoValue: function(){
      return new Date();
    }
  }


}));



Pictures.allow({
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
  }
  // fetch: ['userId']
});