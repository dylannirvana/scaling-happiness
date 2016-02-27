ChatNotifications = new Mongo.Collection("chatNotifications");

ChatNotifications.attachSchema(new SimpleSchema({  

  fromUserId: {
    type: String
  },

  toUserId: {
    type: String
  },  
  
  createdAt: {
    type: Date,
    autoValue: function(){
      return new Date();
    }
  }


}));



ChatNotifications.allow({
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