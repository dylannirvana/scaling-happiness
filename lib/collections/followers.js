Followings = new Mongo.Collection("followings");

Followings.attachSchema(new SimpleSchema({  

  user: {
    type: Object,
    optional: true
  },

  "user.name": {
    type: String,
    optional: true
  },

  "user.id": {
    type: String,
    optional: true
  },

  "user.role": {
    type: String,
    optional: true
  },

  "user.photo": {
    type: String,
    optional: true
  },

  userId: {
    type: String,
    autoValue: function(){
      return this.userId
    }
  },
  
  createdAt: {
    type: Date,
    autoValue: function(){
      return new Date();
    }
  }


}));



Followings.allow({
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