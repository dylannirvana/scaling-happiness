Projects = new Mongo.Collection("projects");

Projects.attachSchema(new SimpleSchema({  

  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        //return {$setOnInsert: return this.userId};
      } else {
        this.unset();
      }
    }
  },

  title: {
    type: String
  },

  description: {
    type: String,
    optional: true
  },

  coverImage: {
    type: String,
    optional: true
  },

  goalAmount: {
    type: String,
    optional: true
  },

  currentAmount: {
    type: String,
    optional: true,
    defaultValue: '0'
  },

  contributors: {
    type: [String],
    optional: true
  },

  "contributors.$.userId": {
    type: String
  },

  "contributors.$.amount": {
    type: String
  },

  "contributors.$.comment": {
    type: String,
    optional: true
  },
  
  createdAt: {
    type: Date,
    autoValue: function(){
      return new Date();
    }
  }


}));



Projects.allow({
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